import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { ServerContext1 } from "../context/ServerContext";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = React.useContext(ServerContext1);
  const dispatch = useDispatch();
  const {userData}=useSelector((state) => state.user);
  console.log(userData)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, form, {
        withCredentials: true,
      });
      dispatch(setUserData(result.data.user));

      if (result.data.token) {
        toast.success("Signup successful");
        navigate("/");
      } else {
        toast.error("Signup failed");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-8 bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-blue-600 text-2xl sm:text-3xl font-bold text-center mb-8">
            Sign Up
          </h2>

          <div className="mb-4 flex items-center border border-blue-200 rounded-lg px-3 py-2">
            <User className="text-blue-500 mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-base sm:text-lg"
            />
          </div>
          <div className="mb-4 flex items-center border border-blue-200 rounded-lg px-3 py-2">
            <Mail className="text-blue-500 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-base sm:text-lg"
            />
          </div>
          <div className="mb-6 flex items-center border border-blue-200 rounded-lg px-3 py-2 relative">
            <Lock className="text-blue-500 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-base sm:text-lg pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-base sm:text-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <div className="mt-6 text-center text-sm sm:text-base">
            <span className="text-gray-600">Already have an account? </span>
            <button
              type="button"
              className="text-blue-600 hover:underline font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
