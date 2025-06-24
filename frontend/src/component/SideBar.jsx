import React, { useState } from "react";
import { useSelector } from "react-redux";
const SideBar = () => {
  const userData = useSelector((state) => state.user.userData);
  const [search, setSearch] = useState(false);

  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-100 border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="w-full h-[80px] bg-blue-400 flex items-center justify-between px-6 shadow-sm">
        <h2 className="text-white text-3xl font-bold tracking-wide">
          ClearChat
        </h2>
        <div className="text-white flex gap-2 items-center">
          <img
            src={userData?.image}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <h1>{userData?.name}</h1>
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
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>
      </div>

      {/* Chat List (no map, hardcoded) */}
      <div className="flex-1 overflow-y-auto">
        {/* Chat 1 */}
        <div className="flex items-center gap-4 px-4 py-3 hover:bg-blue-100 cursor-pointer border-b border-slate-100 transition">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Alice Johnson"
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800">
                Alice Johnson
              </span>
              <span className="text-xs text-slate-400">2:30 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm truncate max-w-[140px]">
                See you at 5pm!
              </span>
              <span className="ml-2 bg-blue-400 text-white text-xs rounded-full px-2 py-0.5">
                2
              </span>
            </div>
          </div>
        </div>
        {/* Chat 2 */}
        <div className="flex items-center gap-4 px-4 py-3 hover:bg-blue-100 cursor-pointer border-b border-slate-100 transition">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Bob Smith"
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800">Bob Smith</span>
              <span className="text-xs text-slate-400">1:15 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm truncate max-w-[140px]">
                Thanks for the update.
              </span>
            </div>
          </div>
        </div>
        {/* Chat 3 */}
        <div className="flex items-center gap-4 px-4 py-3 hover:bg-blue-100 cursor-pointer border-b border-slate-100 transition">
          <img
            src="https://randomuser.me/api/portraits/men/65.jpg"
            alt="Charlie Lee"
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800">Charlie Lee</span>
              <span className="text-xs text-slate-400">Yesterday</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm truncate max-w-[140px]">
                Let's catch up soon.
              </span>
              <span className="ml-2 bg-blue-400 text-white text-xs rounded-full px-2 py-0.5">
                1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4 bg-white border-t border-slate-200">
        <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition">
          + New Chat
        </button>
      </div>
    </div>
  );
};

export default SideBar;
