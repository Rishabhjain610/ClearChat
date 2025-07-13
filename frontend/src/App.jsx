
import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import useCurrentUser from "./customHooks/useCurrentUser";
import { useSelector, useDispatch } from "react-redux";
import getOtherUsers from "./customHooks/getOtherUser";
import { ServerContext1 } from "./context/ServerContext";
import { setSocket, setOnlineUsers } from "./redux/userSlice";
import { io } from "socket.io-client";

const App = () => {
  const { serverUrl } = useContext(ServerContext1); // Get backend server URL from context
  useCurrentUser(); // Custom hook to fetch and set current user in Redux
  getOtherUsers(); // Custom hook to fetch and set other users in Redux

  // Get user-related state from Redux
  const { userData, loading, socket, onlineUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
  // This effect runs whenever userData changes (including on mount)
  // It sets up a new socket connection for the current user
  if (userData) {
    const socketio = io(`${serverUrl}`, {
      query: {
        userId: userData?._id
      }
    });

    dispatch(setSocket(socketio));

    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    // Clean up the socket connection when userData changes or component unmounts
    return () => { socketio.close(); };
  }
  else{
    if(socket){
      socket.close();
      dispatch(setSocket(null)); // Clear socket if userData is not available
    }
  }
}, [userData]);
  
  if (loading) {
    // Show a loading spinner while user data is being fetched
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer /> {/* For showing toast notifications */}
      <Routes>
        {/* If user is logged in, show Home, else redirect to Login */}
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />
        {/* If user is not logged in, show Login, else redirect to Home */}
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        {/* If user is not logged in, show Signup, else redirect to Home */}
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/" />}
        />
        {/* If user is logged in, show Profile, else redirect to Login */}
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};
export default App;