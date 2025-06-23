
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import useCurrentUser from "./customHooks/useCurrentUser";
import { useSelector } from "react-redux";

const App = () => {
  useCurrentUser();
  const { userData, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;