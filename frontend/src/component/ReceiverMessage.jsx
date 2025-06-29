import React from 'react';
import profile1 from '../assets/profile1.jpeg';

const ReceiverMessage = () => {
  // Random data for demonstration
  const message = "Hello! This is a sample message from the receiver.";
  const time = "2:35 PM";
  const image = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&q=80"; // Dummy image

  return (
    <div className="flex justify-start mb-2">
      
      <div className="flex flex-col items-start max-w-[70%]">
        <div className="bg-white text-slate-800 px-4 py-2 rounded-2xl rounded-bl-none border border-slate-200 shadow relative">
          {/* Image inside the chat bubble */}
          <img
            src={image}
            alt="Received"
            className="w-40 h-40 object-cover rounded-xl mb-2"
          />
          <span className="block">{message}</span>
          <span className="text-xs opacity-70 mt-1 block text-right">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default ReceiverMessage;