import React,{useEffect, useRef} from 'react';
import profile1 from '../assets/profile1.jpeg';

const SenderMessage = ({image,message,time}) => {
  // Random data for demonstration
  const scroll = useRef(null);
  useEffect(()=>{
    scroll.current?.scrollIntoView({ behavior: 'smooth' });//text send karte he usko upar scroll karne ke liye
  },[message,image])
  return (
    <div className="flex justify-end mb-2" ref={scroll}>
      <div className="flex flex-col items-end max-w-[70%]">
        <div className="bg-blue-400 text-white px-4 py-2 rounded-2xl rounded-br-none shadow relative">
          {/* Image inside the chat bubble */}
          {image && <img
            src={image||profile1}
            alt="Sent"
            className="w-40 h-40 object-cover rounded-xl mb-2"
          />}
          {/* Message and time */}
          {message &&   <span className="block" >{message}</span>}
        
          <span className="text-xs opacity-70 mt-1 block text-right">{time}</span>
        </div>
      </div>
      
    </div>
  );
};

export default SenderMessage;