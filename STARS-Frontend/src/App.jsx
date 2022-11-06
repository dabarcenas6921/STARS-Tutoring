import React from "react";
import { useEffect, useState } from "react";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Appointments from "./components/Scheduling/Appointments.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalNavbar from "./GlobalNavbar.jsx";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);
    if (userData) {
      setUser(userData);
    }
    else {
      setUser({})
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
      <GlobalNavbar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/appointments" element={<Appointments />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
