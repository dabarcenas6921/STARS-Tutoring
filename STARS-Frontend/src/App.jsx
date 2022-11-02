import React from "react";
import GlobalNavbar from "./GlobalNavbar.jsx";
import { Container } from "@nextui-org/react";
import Home from "./components/Home/Home.jsx";
import "./App.css";

function App() {
  return (
    <Container css={{ width: "100%" }}>
      <GlobalNavbar />
      <Home />
    </Container>
  );
}

export default App;
