import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  Text,
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GlobalNavbar({ user, setUser }) {
  const navigate = useNavigate();
  const [key, setKey] = useState();

  useEffect(() => {
    if (key == "logout") {
      setUser({});
      navigate("/");
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function CheckUser() {
    // If there is no user currently logged in
    if (Object.keys(user).length == 0)
      return (
        <Navbar.Content>
          <Navbar.Link color="inherit" href="/login">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="/register">
              Register
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      );
    else
      return (
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat as={Link} href="/appointments">
              Schedule Meeting
            </Button>
          </Navbar.Item>
          <Dropdown>
            <Dropdown.Trigger>
              <Avatar
                text={
                  user.first_name.charAt(0).toUpperCase() +
                  user.last_name.charAt(0).toUpperCase()
                }
                aria-label="Dropdown Initials"
                pointer={true}
              ></Avatar>
            </Dropdown.Trigger>
            <Dropdown.Menu
              color="secondary"
              aria-label="User Actions"
              onAction={setKey}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {user.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="logout" color="error" withDivider>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      );
  }

  return (
    <Navbar variant="floating">
      <Navbar.Brand>
        <Text b color="inherit" hideIn={"xs"}>
          FIU STARS Tutoring
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn={"xs"}>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/schedules">Tutoring Schedule</Navbar.Link>
        <Navbar.Link href="/contact">Contact Us</Navbar.Link>
      </Navbar.Content>
      <CheckUser></CheckUser>
    </Navbar>
  );
}

export default GlobalNavbar;
