import React from "react";
import GlobalNavbar from "./GlobalNavbar.jsx";
import { Container } from "@nextui-org/react";

function App() {
  return (
    <Container css={{ maxWidth: "100%" }}>
      <GlobalNavbar />
    </Container>
  );
}

export default App;
