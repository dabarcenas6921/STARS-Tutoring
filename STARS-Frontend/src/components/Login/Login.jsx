import React from "react";
import { useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Button, Card, Container, Input, Row, Spacer } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function sign_in() {
    if (!email || !password)
      return console.log("Missing email and/or password field.");

    try {
      axios
        .post("http://localhost:3001/auth/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response.data.user);
          navigate("/dashboard");
        });
    } catch (e) {
      console.log("Error is: " + e);
    }
  }
  return (
    <div style={{ width: "100%" }}>
      <Container
        display="flex"
        justify="center"
        alignContent="center"
        css={{
          "padding-top": "5%",
          "padding-bottom": "5%",
        }}
      >
        <Container css={{ width: "50%" }}>
          <Card css={{ "padding-top": "3%", "padding-bottom": "5%" }}>
            <Row justify="center" align="center">
              <h1>Login</h1>
            </Row>
            <Row justify="center" align="center">
              <Input
                label="Email:"
                type="email"
                placeholder="example@me.com"
                underlined
                width="65%"
                required={true}
                onChange={(event) => setEmail(event.target.value)}
              ></Input>
            </Row>
            <Spacer y={1.0}></Spacer>
            <Row justify="center" align="center">
              <Input.Password
                label="Password:"
                placeholder="Password"
                underlined
                width="65%"
                required={true}
                onChange={(event) => setPassword(event.target.value)}
              ></Input.Password>
            </Row>
            <Spacer y={1.5}></Spacer>
            <Row justify="center" align="center">
              <Button size="lg" onPress={() => sign_in()}>
                Sign In
              </Button>
            </Row>
          </Card>
        </Container>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
