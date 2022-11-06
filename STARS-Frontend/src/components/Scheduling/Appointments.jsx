import React from "react";
import { useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Row,
  Spacer,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Appointments() {
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
              <h1>Register</h1>
            </Row>
            <Row justify="center" align="center">
              <Col align="center">
                <Input
                  label="First Name:"
                  placeholder="Name"
                  underlined
                  width="80%"
                  required={true}
                  onChange={(event) => setFirstName(event.target.value)}
                ></Input>
              </Col>
              <Col align="center">
                <Input
                  label="Last Name:"
                  placeholder="Name"
                  underlined
                  width="80%"
                  required={true}
                  onChange={(event) => setLastName(event.target.value)}
                ></Input>
              </Col>
            </Row>
            <Spacer y={1.0}></Spacer>
            <Row justify="center" align="center">
              <Input
                label="PantherID:"
                placeholder="pantherID"
                underlined
                width="90%"
                required={true}
                onChange={(event) => setPantherID(event.target.value)}
              ></Input>
            </Row>
            <Spacer y={1.0}></Spacer>
            <Row justify="center" align="center">
              <Input
                label="Email:"
                placeholder="example@me.com"
                type="email"
                underlined
                width="90%"
                required={true}
                onChange={(event) => setEmail(event.target.value)}
              ></Input>
            </Row>
            <Spacer y={1.5}></Spacer>
            <Row justify="center" align="center">
              <Col align="center">
                <Input.Password
                  label="Password:"
                  placeholder="Password"
                  underlined
                  width="80%"
                  required={true}
                  onChange={(event) => setPassword1(event.target.value)}
                ></Input.Password>
              </Col>
              <Col align="center">
                <Input.Password
                  label="Confirm Password:"
                  placeholder="Password"
                  underlined
                  width="80%"
                  required={true}
                  onChange={(event) => setPassword2(event.target.value)}
                ></Input.Password>
              </Col>
            </Row>
            <Spacer y={1.0}></Spacer>
            <Row justify="center" align="center">
              <Button size="lg" onPress={() => register()}>
                Create Account
              </Button>
            </Row>
          </Card>
        </Container>
      </Container>
      <Footer />
    </div>
  )
}

export default Appointments

