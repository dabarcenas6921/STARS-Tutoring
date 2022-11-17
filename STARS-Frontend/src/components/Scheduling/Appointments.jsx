import React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import {
  Button,
  Card,
  Container,
  Dropdown,
  Modal,
  Row,
  Spacer,
  Table,
  Text,
} from "@nextui-org/react";
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
              <Text color="primary" b>
                Select a Tutor and Appointment Time
              </Text>
            </Row>
            <AppointmentTable
              user={user}
              course={course.currentKey}
              allTutors={allTutors}
            />
            <Row justify="center" align="center"></Row>
          </Card>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}

function AppointmentTable({ user, course, allTutors }) {
  const [chosenTutor, setChosenTutor] = useState(new Set());

  useEffect(() => {
    console.log(chosenTutor);
  }, [chosenTutor]);

  return (
    <div>
      {allTutors.map((aTutor) => (
        <div>
          <Spacer y={1.0}></Spacer>
          <Container css={{ width: "80%" }}>
            <Card
              variant="bordered"
              borderWeight="light"
              css={{ "padding-top": "3%", "padding-bottom": "5%" }}
            >
              <Row justify="center" align="center">
                <h4>{aTutor.first_name + " " + aTutor.last_name}</h4>
              </Row>
              <Row justify="center" align="center">
                <Table
                  aria-label="Tutor Selection Table"
                  fixed
                  striped
                  lined
                  selectionMode="single"
                  selectedKeys={chosenTutor}
                  onSelectionChange={setChosenTutor}
                  css={{
                    height: "auto",
                    minWidth: "100%",
                  }}
                >
                  <Table.Header>
                    <Table.Column align="center">Start Time</Table.Column>
                    <Table.Column align="center">End Time</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {aTutor.tutor_schedules.map((schedule) => {
                      const dateStart = new Date(schedule[0]);
                      const dateEnd = new Date(schedule[1]);

                      return (
                        <Table.Row
                          key={`${aTutor.id} - ${schedule[0]} - ${schedule[1]}`}
                        >
                          <Table.Cell>{`${dateStart.toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}`}</Table.Cell>
                          <Table.Cell>{`${dateEnd.toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}`}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </Row>
            </Card>
          </Container>
          <Spacer y={1.0}></Spacer>
        </div>
      ))}
      <Row justify="center" align="center">
        <ConfirmButton user={user} sessionSet={chosenTutor} course={course} />
      </Row>
    </div>
  );
}

function ConfirmButton({ user, sessionSet, course }) {
  const session = sessionSet.currentKey;
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  function createAppointment() {
    const timings = Array.from(session);

    const tutorID = parseInt(timings.slice(0, 1));
    const startTime = timings.slice(4, 23).toString().replaceAll(",", "");
    const endTime = timings
      .slice(26, timings.length)
      .toString()
      .replaceAll(",", "");

    setVisible(false);

    try {
      axios
        .post(`http://localhost:3001/appointments/create/`, {
          student_id: user.id,
          tutor_id: tutorID,
          app_start_time: startTime,
          app_end_time: endTime,
          course: course,
        })
        .then(function (response) {
          console.log(
            `Created appointment for ${response.data.appointment.course} from ${response.data.appointment.app_start_time} to ${response.data.appointment.app_end_time}!`
          );
          navigate("/dashboard");
        });
    } catch (e) {
      console.log("Error:", e);
    }
  }

  if (sessionSet.size != 0) {
    return (
      <Row justify="center">
        <Button auto size="lg" onPress={() => setVisible(true)}>
          Confirm Meeting
        </Button>
        <Modal closeButton open={visible} onClose={() => setVisible(false)}>
          <Modal.Header>
            <Text h3>Are you sure you want to schedule this appointment?</Text>
          </Modal.Header>
          <Modal.Body>
            <Row justify="center">
              <Button auto color="success" onPress={() => createAppointment()}>
                Confirm
              </Button>
            </Row>
          </Modal.Body>
        </Modal>
      </Row>
    );
  }
}

export default Appointments;
