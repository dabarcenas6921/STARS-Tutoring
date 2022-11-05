import React from "react";
import GlobalNavbar from "./GlobalNavbar.jsx";
import { Container } from "@nextui-org/react";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
