import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import axios from "axios";
import profile1 from "../assets/profile1.jpeg";
import { useNavigate } from "react-router-dom";
import { ServerContext1 } from "../context/ServerContext";
import { useDispatch } from "react-redux";
import {
  setOtherUsers,
  setUserData,
  setSelectedUser,
  setSearchData,
} from "../redux/userSlice";
const SideBar = () => {
  const userData = useSelector((state) => state.user.userData);
  const otherUsers = useSelector((state) => state.user.otherUsers);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  const searchData = useSelector((state) => state.user.searchData);
  const [search, setSearch] = useState(false);
 
  const [input, setInput] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const { serverUrl } = useContext(ServerContext1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log("error in logout:", error);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/user/searchUser?query=${input}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setSearchData(response.data.users));
      
    } catch (error) {
      console.log("error in search:", error);
    }
  };
  useEffect(() => {
    if (input.length > 0) {
      setOnSearch(true);
      handleSearch();
    } else {
      setOnSearch(false);
    }
  }, [input]);
  return (
    <div
      className={`lg:w-[30%] w-full h-full bg-slate-100 border-r border-slate-200 ${
        selectedUser ? "hidden lg:flex" : "flex"
      } flex-col lg:flex`}
    >
      {/* Header */}
      <div className="w-full h-[80px] bg-blue-400 flex items-center justify-between px-6 shadow-sm">
        <h2 className="text-white text-3xl font-bold tracking-wide">
          ClearChat
        </h2>
        <div
          className="text-white flex gap-2 items-center"
          onClick={() => navigate("/profile")}
        >
          <img
            src={userData?.image || profile1}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <h1>{userData?.name || "User"}</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className="px-4 py-3 bg-white border-b border-slate-200"
        onClick={() => {
          setSearch(true);
        }}
      >
        <form action="">
          <input
            type="text"
            placeholder="Search chats..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>
      </div>

      {/* Chat List (no map, hardcoded) */}
      <div className="flex-1 overflow-y-auto">
        {/* Chat 1 */}
        {onSearch ? (
          <>
            {searchData?.map((user) => {
              return (
                <div
                  key={user._id}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-blue-100 cursor-pointer border-b border-slate-100 transition"
                  onClick={() => {
                  dispatch(setSelectedUser(user));
                }}
                >
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-800">
                        {user.name || user.username}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm truncate max-w-[140px]">
                        {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {otherUsers?.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 px-4 py-3 hover:bg-blue-100 cursor-pointer border-b border-slate-100 transition"
                onClick={() => {
                  dispatch(setSelectedUser(user));
                }}
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">
                      {user.name || user.username}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm truncate max-w-[140px]">
                      {(onlineUsers || []).includes(user._id)
                        ? "Online"
                        : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* New Chat Button */}
      <button
        className="absolute left-4 bottom-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
