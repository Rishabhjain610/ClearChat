import React, { useState, useRef,useContext } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import profile1 from "../assets/profile1.jpeg";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { ServerContext1 } from "../context/ServerContext";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  // Always call hooks at the top
  const [name, setName] = useState(userData?.name || "");
  const [frontendImage, setFrontendImage] = useState(
    userData?.image || profile1
  );
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const image = useRef(null);
  const dispatch = useDispatch();
  // Handler for camera icon click
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const { serverUrl } = useContext(ServerContext1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.put(`${serverUrl}/api/user/profile`, formData,{
        withCredentials:true
      });
      dispatch(setUserData(result.data.user));
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      console.log("Error updating profile:", error);
    }
  };
  // Guard: don't render form until userData is loaded
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-600">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2 py-8 relative">
      <button
        type="button"
        className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-blue-100 transition-colors flex items-center justify-center z-10"
        onClick={() => navigate("/")}
        aria-label="Back to Home"
      >
        <ArrowLeft className="text-blue-400" size={28} />
      </button>

      <div className="relative mb-6 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-blue-200 flex items-center justify-center border-4 border-blue-200 shadow">
          <img
            src={frontendImage}
            alt="Profile"
            className="h-24 w-auto rounded-full flex justify-center items-center"
          />
        </div>
        <button
          type="button"
          className="absolute bottom-2 right-2 bg-blue-400 p-2 rounded-full cursor-pointer hover:bg-blue-500 transition-colors flex items-center justify-center"
          title="Change profile picture"
          onClick={() => image.current.click()}
        >
          <Camera className="text-white" size={18} />
        </button>
      </div>

      <form
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          accept="image/*"
          hidden
          ref={image}
          onChange={handleImage}
        />
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border border-blue-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Username
          </label>
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
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
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
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-colors text-lg mt-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading?"saving...":"Save profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
