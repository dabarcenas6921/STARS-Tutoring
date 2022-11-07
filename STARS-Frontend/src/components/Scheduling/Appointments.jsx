import React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Appointments() {
  const [selected, setSelected] = useState(new Set(["--"]));
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/courses/getCourses")
        .then(function (response) {
          setCourses(response.data);
        });
    } catch (e) {
      console.log("Error is: " + e);
    }
  }, []);

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

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
              <h1>Schedule Meeting</h1>
            </Row>
            <Row justify="center" align="center">
              <Text>Choose a Course:</Text>
              <Dropdown>
                <Dropdown.Button light css={{ tt: "capitalize" }}>
                  {selectedValue}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  {courses.map((course) => (
                    <Dropdown.Item key={course.course}>
                      {course.course}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <Spacer y={1.0}></Spacer>
            <Row>
              <Text b css={{"padding-left": "5%"}}>Set an Tutor and Appointment Time</Text>
              </Row>
            <Spacer y={1.0}></Spacer>
            <Row justify="center" align="center">
              <Button size="lg" onPress={() => register()}>
                Confirm Session
              </Button>
            </Row>
          </Card>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}

export default Appointments;
