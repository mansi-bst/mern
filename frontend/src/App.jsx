import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./assets/pages/Signup";
 import Login from "./assets/pages/Login";
import Home from "./assets/pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateNote from "./assets/components/CreateNote";
import Notes from "./assets/components/Notes";
import Contact from "./assets/components/Contact";
import About from "./assets/pages/About";
import Features from "./assets/pages/Features";
import EditNote from "./assets/components/EditNote";
import ReminderProvider from "./assets/components/ReminderProvider";



const App = () => {
  return (
    <>
    <ReminderProvider>
    <Routes>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/create-note" element={<CreateNote/>}/>
      <Route path="/notes" element={<Notes/>}/> 
      <Route path="/edit-note/:id" element={<EditNote />} />
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/features" element={<Features/>}/>
    </Routes>
    </ReminderProvider>
    <ToastContainer/>
    </>
  );
};

export default App;
