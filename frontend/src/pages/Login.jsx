import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ServerContext1 } from "../context/ServerContext";
import { setSelectedUser, setUserData } from "../redux/userSlice";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const changepassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  

  const { serverUrl } = useContext(ServerContext1);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, form, {
        withCredentials: true,
      });
      console.log(result);
      dispatch(setUserData(result.data.user));
      dispatch(setSelectedUser(null));
      if (result.data.token) {
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Login failed");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-8 bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-blue-400 text-2xl sm:text-3xl font-bold text-center mb-8">
            Login
          </h2>
          <div className="mb-4 flex items-center border border-blue-200 rounded-lg px-3 py-2">
            <User className="text-blue-500 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-base sm:text-lg"
            />
          </div>
          <div className="mb-6 flex items-center border border-blue-200 rounded-lg px-3 py-2 relative">
            <Lock className="text-blue-400 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent text-base sm:text-lg"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
              onClick={changepassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-base sm:text-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="mt-6 text-center text-sm sm:text-base">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              type="button"
              className="text-blue-600 hover:underline font-semibold"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
