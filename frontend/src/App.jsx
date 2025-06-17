import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<h1 className="text-center text-2xl">Welcome to the App</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
    </>
  );
};

export default App;
