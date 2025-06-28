
import { Camera, ArrowLeft } from "lucide-react";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import profile1 from "../assets/profile1.jpeg";
import { setSelectedUser } from "../redux/userSlice";

const messages = [
  {
    id: 1,
    sender: "Alice",
    text: "Hey! How are you?",
    time: "2:31 PM",
    mine: false,
  },
  {
    id: 2,
    sender: "Me",
    text: "I'm good, thanks! How about you?",
    time: "2:32 PM",
    mine: true,
  },
  {
    id: 3,
    sender: "Alice",
    text: "Doing great! Ready for the meeting?",
    time: "2:33 PM",
    mine: false,
  },
  {
    id: 4,
    sender: "Me",
    text: "Absolutely! Let's do this.",
    time: "2:34 PM",
    mine: true,
  },
];

const MessageArea = () => {
  const messagesEndRef = useRef(null);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser]);

  // Responsive: Only show on small screens if a user is selected, always show on lg+


  if (!selectedUser) {
    return (
      <div className="w-full h-full bg-slate-100 items-center justify-center hidden lg:flex lg:w-[70%] flex-col">
        <h1 className="text-5xl text-slate-500 font-semibold">Welcome to ClearChat</h1>
        <p className="text-slate-400 text-2xl mt-2">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full bg-slate-100 flex-col ${
    selectedUser ? "flex" : "hidden"
  } lg:flex lg:w-[70%] items-center justify-center`}>
      {/* Header */}
      <div className="h-[70px] relative bg-blue-400 flex items-center px-6 shadow text-white w-full">
        {/* Back Arrow for small screens */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 left-3 bg-white rounded-full p-2 shadow-md hover:bg-blue-100 transition-colors flex items-center justify-center z-10 lg:hidden"
          onClick={() => dispatch(setSelectedUser(null))}
          aria-label="Back to Home"
        >
          <ArrowLeft className="text-blue-400" size={28} />
        </button>
        <div className="flex items-center gap-3 ml-12 lg:ml-0">
          <img
            src={selectedUser?.image || profile1}
            alt="Chat User"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <div className="font-semibold text-lg">{selectedUser?.name || "Unknown User"}</div>
            <div className="text-xs text-blue-100">Online</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 space-y-2 bg-slate-100 w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] px-4 py-2 rounded-2xl shadow
                ${msg.mine
                  ? "bg-blue-400 text-white rounded-br-none"
                  : "bg-white text-slate-800 rounded-bl-none border border-slate-200"
                }`}
            >
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs text-right mt-1 opacity-70">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="h-[70px] bg-white border-t border-slate-200 flex items-center px-2 sm:px-4 gap-3 w-full">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-full transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageArea;