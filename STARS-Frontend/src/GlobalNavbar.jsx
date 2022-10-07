import React from "react";
import { Button, Navbar, Text, Link } from "@nextui-org/react";
import { AiOutlineStar } from "react-icons/ai";

function GlobalNavbar() {
  return (
    <Navbar variant="static">
      <Navbar.Brand>
        <Text b color="inherit" hideIn={"xs"}>
          FIU STARS Tutoring
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn={"xs"}>
        <Navbar.Link isActive href="/">
          Home
        </Navbar.Link>
        <Navbar.Link href="/schedules">Tutoring Schedule</Navbar.Link>
        <Navbar.Link href="/contact">Contact Us</Navbar.Link>
      </Navbar.Content>
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
    </Navbar>
  );
}

export default GlobalNavbar;
