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
              <Text b>Select a Tutor and Appointment Time</Text>
            </Row>
            <AppointmentTable
              user={user}
              course={course.currentKey}
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

function AppointmentTable({ user, course, allTutors }) {
  const [schedule, setSchedule] = useState("Session Time");
  const [tutorID, setTutorID] = useState(new Set());

  const selectedValue = useMemo(() => schedule, [schedule]);
  useEffect(() => {
    const [first] = tutorID;
    console.log(first);
  }, [tutorID]);

  if (allTutors.length == 0) return;

  return (
    <div>
      <Row justify="center" align="center">
        <Table
          aria-label="Tutor Selection Table"
          fixed
          striped
          lined
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={tutorID}
          onSelectionChange={setTutorID}
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>Tutor Name</Table.Column>
            <Table.Column align="center">Schedule</Table.Column>
          </Table.Header>
          <Table.Body>
            {allTutors.map((aTutor) => (
              <Table.Row key={aTutor.id}>
                <Table.Cell>
                  {aTutor.first_name + " " + aTutor.last_name}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown placement="bottom-left">
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
                      {aTutor.tutor_schedules.map((schedule) => (
                        <Dropdown.Item
                          css={{ fontSize: "11px" }}
                          key={`${schedule[0]} - ${schedule[1]}`}
                        >
                          {`${schedule[0]} - ${schedule[1]}`}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Row>
      <Spacer y={1.0}></Spacer>
      <Row justify="center" align="center">
        <ConfirmButton
          user={user}
          tutorID={tutorID.currentKey}
          schedule={schedule}
          course={course}
        />
      </Row>
    </div>
  );
}

function ConfirmButton({ user, tutorID, schedule, course }) {
  const [visible, setVisible] = useState(false);

  function createAppointment() {
    const timings = Array.from(schedule).join(", ");

    console.log(timings);
    const startTime = new Date(timings.slice(0, 19));
    const endTime = new Date(timings.slice(22, timings.length));

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
          console.log(response.data);
          console.log(
            `Created appointment for ${response.data.appointment.course}!`
          );
        });
    } catch (e) {
      console.log("Error:", e);
    }
  }

  if (tutorID != null) {
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
