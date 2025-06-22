
import React from "react";
import { Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import profile1 from "../assets/profile1.jpeg"; // Assuming you have a profile image
import { useSelector } from "react-redux";
const Profile = () => {
  const navigate = useNavigate();

  // Handler for camera icon click
  const handleCameraClick = () => {
    console.log("Camera icon clicked");
  };
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen flex  flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2 py-8 relative">
     
      <button
        type="button"
        className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-blue-100 transition-colors flex items-center justify-center z-10"
        onClick={() => navigate("/")}
        aria-label="Back to Home"
      >
        <ArrowLeft className="text-blue-600" size={28} />
      </button>

      
      <div className="relative mb-6 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-blue-200 flex items-center justify-center border-4 border-blue-200 shadow">
          <img src={profile1} alt="" className="h-24 w-auto rounded-full"/>
        </div>
        <button
          type="button"
          className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors flex items-center justify-center"
          title="Change profile picture"
          onClick={handleCameraClick}
        >
          <Camera className="text-white" size={18} />
        </button>
      </div>

      <form
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-6"
      >
        
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border border-blue-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
            
          />
        </div>

        
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border border-blue-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={userData?.username || ""}
            readOnly
          />
        </div>

        
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-blue-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
            readOnly
            value={userData?.email || ""}
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-lg mt-2 disabled:opacity-60"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;