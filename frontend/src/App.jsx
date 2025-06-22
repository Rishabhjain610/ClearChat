import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import useCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";

const App = () => {
  useCurrentUser();
  const userData = useSelector((state) => state.user);

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
// This code defines the main application component for a React application.