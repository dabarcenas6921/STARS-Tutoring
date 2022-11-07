import React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import {
  Avatar,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { HiOutlineClock } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Appointments({ user }) {
  const [course, setCourse] = useState(new Set(["--"]));
  const [allCourses, setAllCourses] = useState([]);
  const [allTutors, setAllTutors] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/courses/getCourses")
        .then(function (response) {
          setAllCourses(response.data);
        });
    } catch (e) {
      console.log("Error is: " + e);
    }
  }, []);

  const selectedValue = useMemo(
    () => Array.from(course).join(", ").replaceAll("_", " "),
    [course]
  );

  useEffect(() => {
    try {
      axios
        .post("http://localhost:3001/courses/getTutors/", {
          course: selectedValue,
        })
        .then(function (response) {
          setAllTutors(response.data);
        });
    } catch (e) {
      console.log("Error is: " + e);
    }
  }, [selectedValue]);

  return (
    <div style={{ width: "100%" }}>
      <Container
        display="flex"
        justify="center"
        alignContent="center"
        css={{
          "padding-top": "2%",
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
                  selectedKeys={course}
                  onSelectionChange={setCourse}
                >
                  {allCourses.map((aCourse) => (
                    <Dropdown.Item key={aCourse.course}>
                      {aCourse.course}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <Spacer y={1.0}></Spacer>
            <Row justify="center" align="center">
              <Text b>Set an Tutor and Appointment Time</Text>
            </Row>
            <AppointmentCard
              user={user}
              course={course}
              allTutors={allTutors}
            />
            <Spacer y={1.0}></Spacer>
            <Row justify="center" align="center"></Row>
          </Card>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}

function AppointmentCard({ user, course, allTutors }) {
  const [visible, setVisible] = useState(false);
  const [schedule, setSchedule] = useState("--");

  const selectedValue = useMemo(() => schedule, [schedule]);

  function createAppointment(tutor_id) {
    const timings = schedule.split(" - ");
    const startTime = new Date(timings[0]);
    const endTime = new Date(timings[2]);

    setVisible(false);

    try {
      axios
        .post(`http://localhost:3001/appointments/create/`, {
          student_id: user.id,
          tutor_id: tutor_id,
          app_start_time: startTime,
          app_end_time: endTime,
          course: course,
        })
        .then(function (response) {
          console.log(`Created appointment for ${response.data.course}!`);
        });
    } catch (e) {
      console.log("Error:", e);
    }
  }

  const displayTutors = allTutors.map((tutor, index) => (
    <div>
      <Spacer y={1.0}></Spacer>
      <Row justify="center" align="center">
        <Card key={index} css={{ w: "80%", h: "100%" }}>
          <Card.Header>
            <Avatar
              css={{ ml: "$8" }}
              size="xl"
              squared
              text={tutor.first_name.charAt(0) + tutor.last_name.charAt(0)}
            />
            <Col css={{ pl: "$6" }}>
              <Text size={15} b transform="uppercase">
                {course}
              </Text>
              <Text h4>
                Tutoring Appointment with{" "}
                {tutor.first_name + " " + tutor.last_name}
              </Text>
              <Row>
                <HiOutlineClock style={{size:"100px","margin-top":"11px"}} />
                <Dropdown>
                  <Dropdown.Button light css={{ tt: "capitalize" }}>
                    {selectedValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection schedules"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={schedule}
                    onSelectionChange={setSchedule}
                  >
                    {tutor.tutor_schedules.map((schedule) => (
                      <Dropdown.Item css={{ fontSize:"11px"}} key={`${schedule[0]} - ${schedule[1]}`}>
                        {`${schedule[0]} - ${schedule[1]}`}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
              <Row justify="flex-end">
                <Button
                  size="sm"
                  light
                  color="success"
                  onPress={() => setVisible(true)}
                >
                  Confirm Appointment
                </Button>
                <Modal
                  closeButton
                  open={visible}
                  onClose={() => setVisible(false)}
                >
                  <Modal.Header>
                    <Text h3>
                      Are you sure you want to schedule this appointment?
                    </Text>
                  </Modal.Header>
                  <Modal.Body>
                    <Row justify="center">
                      <Button
                        auto
                        color="success"
                        onPress={() =>
                          createAppointment(
                            tutor.id
                          )
                        }
                      >
                        Confirm
                      </Button>
                    </Row>
                  </Modal.Body>
                </Modal>
              </Row>
            </Col>
          </Card.Header>
        </Card>
      </Row>
    </div>
  ));

  return displayTutors;
}

export default Appointments;
