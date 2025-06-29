import React from 'react';
import profile1 from '../assets/profile1.jpeg';

const SenderMessage = () => {
  // Random data for demonstration
  const message = "Hey! This is a sample message from the sender.";
  const time = "2:34 PM";
  const image = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400&q=80"; // Dummy image

  return (
    <div className="flex justify-end mb-2">
      <div className="flex flex-col items-end max-w-[70%]">
        <div className="bg-blue-400 text-white px-4 py-2 rounded-2xl rounded-br-none shadow relative">
          {/* Image inside the chat bubble */}
          <img
            src={image}
            alt="Sent"
            className="w-40 h-40 object-cover rounded-xl mb-2"
          />
          <span className="block">{message}</span>
          <span className="text-xs opacity-70 mt-1 block text-right">{time}</span>
        </div>
      </div>
      
    </div>
  );
};

export default SenderMessage;