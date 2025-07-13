import React,{useEffect, useRef} from 'react';
import profile1 from '../assets/profile1.jpeg';

const ReceiverMessage = ({image,message,time}) => {
  // Random data for demonstration
  const scroll = useRef(null);
  useEffect(()=>{
     scroll.current?.scrollIntoView({ behavior: 'smooth' });//text send karte he usko upar scroll karne ke liye

  },[message,image])
   return (
    <div className="flex justify-start mb-2" ref={scroll}>
      
      <div className="flex flex-col items-start max-w-[70%]">
        <div className="bg-white text-slate-800 px-4 py-2 rounded-2xl rounded-bl-none border border-slate-200 shadow relative">
          {/* Image inside the chat bubble */}
         {image && (<img
            src={image||profile1  }
            alt="Sent"
            className="w-40 h-40 object-cover rounded-xl mb-2"
          />)}
          {/* Message and time */}
          {message &&   <span className="block" >{message}</span>}
          {time && <span className="text-xs opacity-70 mt-1 block text-right">{time}</span>}
        </div>
      </div>
    </div>
  );
};

export default ReceiverMessage;