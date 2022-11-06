import React from "react";
import { useState } from "react";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalNavbar from "./GlobalNavbar.jsx";

function App() {
  const [user, setUser] = useState({});

  return (
    <div>
      <GlobalNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
