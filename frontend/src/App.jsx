import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./assets/pages/Signup";
 import Login from "./assets/pages/Login";
import Home from "./assets/pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
  );
};

export default App;
