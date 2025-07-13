import {
  Camera,
  ArrowLeft,
  Smile,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import React, { useRef, useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import profile1 from "../assets/profile1.jpeg";
import { setSelectedUser } from "../redux/userSlice";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { ServerContext1 } from "../context/ServerContext";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

const MessageArea = () => {
  const messagesEndRef = useRef(null);
  const { selectedUser, socket } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImages, setFrontendImages] = useState(null);
  const [backendImages, setBackendImages] = useState(null);
  const image = useRef(null);
  const { serverUrl } = useContext(ServerContext1);
  const messages = useSelector((state) => state.message.messages);
  const userData = useSelector((state) => state.user.userData);
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length === 0 && backendImages == null) return; // Prevent sending empty messages

    try {
      const formData = new FormData();
      formData.append("message", input);
      if (backendImages) {
        formData.append("image", backendImages);
      }
      const result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, result.data.newMessage]));
     
      setInput("");
      setFrontendImages("");
      setBackendImages("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser]);
  const EmojiClick = (emojiData) => {
    setInput(input + emojiData.emoji);
    setShowPicker(false);
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontendImages(URL.createObjectURL(file));
      setBackendImages(file);
    } else {
      setFrontendImages(null);
      setBackendImages(null);
    }
  };
  // Responsive: Only show on small screens if a user is selected, always show on lg+
  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (data) => {
      dispatch(setMessages([...messages, data.newMessage])); //adding data.newmessage in messagesarray
    });
    return () => {
      socket.off("newMessage");
    };
  }, [messages, setMessages]);
  if (!selectedUser) {
    return (
      <div className="w-full h-full bg-slate-100 items-center justify-center hidden lg:flex lg:w-[70%] flex-col">
        <h1 className="text-5xl text-slate-500 font-semibold">
          Welcome to ClearChat
        </h1>
        <p className="text-slate-400 text-2xl mt-2">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full bg-slate-100 flex-col ${
        selectedUser ? "flex" : "hidden"
      } lg:flex lg:w-[70%] items-center justify-center overflow-hidden`}
    >
      <div className="h-[70px] relative bg-blue-400 flex items-center px-6 shadow text-white w-full">
        <div className="flex items-center gap-3 ml-12 lg:ml-0">
          <button
            type="button"
            className="absolute top-1/2 left-3 lg:left-auto lg:right-3  -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-blue-100 transition-colors flex items-center justify-center z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 "
            onClick={() => dispatch(setSelectedUser(null))}
            aria-label="Back to chat list"
          >
            <ArrowLeft className="text-blue-400" size={28} />
          </button>
          <img
            src={selectedUser?.image || profile1}
            alt="Chat User"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <div className="font-semibold text-lg">
              {selectedUser?.name || "Unknown User"}
            </div>
            {onlineUsers.includes(selectedUser?._id) ? (
              <div className="text-xs text-blue-100">Online</div>
            ) : (
              <div className="text-xs text-red-100">Offline</div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 space-y-2 bg-slate-100 w-full">
        {messages &&
          messages.map((message) =>
            message.sender == userData._id ? (
              <SenderMessage
                key={message._id || message.id}
                image={message.image}
                message={message.message}
                time={message.time}
              />
            ) : (
              <ReceiverMessage
                key={message._id || message.id}
                image={message.image}
                message={message.message}
                time={message.time}
              />
            )
          )}
      </div>

      {frontendImages && (
        <div className="w-full flex relative overflow-hidden left-6">
          <img
            src={frontendImages}
            className="w-24 h-auto sm:w-[100px] rounded-lg shadow-md mb-2 mr-2 sm:mr-0"
            alt="Preview"
          />
        </div>
      )}

      {/* Input Area */}
      <form
        className="relative h-[70px] bg-white border-t border-slate-200 flex items-center px-2 sm:px-4 gap-2 sm:gap-3 w-full"
        onSubmit={handleSendMessage}
      >
        {showPicker && (
          <div className="absolute bottom-20 left-0 z-20">
            <EmojiPicker width={250} height={300} onEmojiClick={EmojiClick} />
          </div>
        )}
        <button
          type="button"
          className="flex items-center justify-center text-blue-400 hover:bg-blue-100 rounded-full p-2 transition"
          tabIndex={-1}
          onClick={() => setShowPicker(!showPicker)}
        >
          <Smile size={26} />
        </button>
        {/* Image Icon */}
        <button
          type="button"
          className="flex items-center justify-center text-blue-400 hover:bg-blue-100 rounded-full p-2 transition"
          tabIndex={-1}
        >
          <input
            type="file"
            accept="image/*"
            ref={image}
            hidden
            onChange={handleImage}
          />
          <ImageIcon size={26} onClick={() => image.current.click()} />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-2 sm:px-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input.length > 0 || image.current?.files.length > 0 && (
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 sm:px-6 py-2 rounded-full transition flex items-center justify-center gap-2"
          >
            <Send size={22} className="inline" />
            <span className="hidden sm:inline">Send</span>
          </button>
        )}
      </form>
    </div>
  );
};

export default MessageArea;
