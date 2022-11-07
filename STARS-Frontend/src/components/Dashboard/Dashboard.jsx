import React from "react";
import { useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import {
  Container,
  Text,
  Card,
  Avatar,
  Button,
  Col,
  Row,
  Grid,
  Modal,
} from "@nextui-org/react";
import { HiOutlineClock } from "react-icons/hi";
import { useEffect } from "react";

const Dashboard = ({ user }) => {
  const [appointmentData, setAppointmentData] = useState([]);

  function getAppointments() {
    if (user.account_type == "tutor") {
      try {
        axios
          .get(
            `http://localhost:3001/appointments/getAppointmentsByTutorId/${user.id}`
          )
          .then(function (response) {
            setAppointmentData(response.data.appointments);
          });
      } catch (e) {
        console.log("Error is: " + e);
      }
    } else {
      try {
        axios
          .get(
            `http://localhost:3001/appointments/getAppointmentsByStudentId/${user.id}`
          )
          .then(function (response) {
            setAppointmentData(response.data.appointments);
          });
      } catch (e) {
        console.log("Error is: " + e);
      }
    }
  }

  useEffect(() => {
    // Get user appointments from the database when dashboard loads
    getAppointments();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Container responsive lg css={{ mt: 10, mb: 50 }}>
        <Text h1>Dashboard</Text>
        <Text h3>Upcoming tutoring appointments</Text>
        {appointmentData.length > 0 ? (
          <Grid.Container gap={2} justify="flex-start">
            {appointmentData.map((appointment, idx) => (
              <Grid key={idx} xs={12} sm={6}>
                <AppointmentCard
                  appointment={appointment}
                  getAppointments={getAppointments}
                />
              </Grid>
            ))}
          </Grid.Container>
        ) : (
          <Text>No appointments to be found!</Text>
        )}
      </Container>
    </div>
  );
};

function AppointmentCard({ appointment, getAppointments }) {
  const startTime = new Date(appointment.app_start_time);
  const endTime = new Date(appointment.app_end_time);

  const [visible, setVisible] = useState(false);

  function cancelAppointment() {
    setVisible(false);
    try {
      axios
        .delete(
          `http://localhost:3001/appointments/deleteAppointment/${appointment.appointment_id}`
        )
        .then(function (response) {
          console.log(`Deleted appointment ${appointment.appointment_id}`);
          getAppointments();
        });
    } catch (e) {
      console.log("Error:", e);
    }
  }

  return (
    <Card css={{ h: "100%" }}>
      <Card.Header>
        <Avatar
          css={{ ml: "$8" }}
          size="xl"
          squared
          text={
            appointment.first_name.charAt(0) + appointment.last_name.charAt(0)
          }
        />
        <Col css={{ pl: "$6" }}>
          <Text size={15} b transform="uppercase">
            {appointment.course}
          </Text>
          <Text h4>
            Tutoring Appointment with{" "}
            {appointment.first_name + " " + appointment.last_name}
          </Text>
          <Row>
            <HiOutlineClock />
            <Text h5 css={{ ml: "$2", position: "relative", bottom: "$2" }}>
              {`${startTime.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })} - ${endTime.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}`}
            </Text>
          </Row>
          <Row justify="flex-end">
            <Button
              size="sm"
              light
              color="error"
              onPress={() => setVisible(true)}
            >
              Cancel Appointment
            </Button>
            <Modal closeButton open={visible} onClose={() => setVisible(false)}>
              <Modal.Header>
                <Text h3>
                  Are you sure you want to cancel your appointment?
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Row justify="center">
                  <Button
                    auto
                    color="error"
                    onPress={() => cancelAppointment()}
                  >
                    Cancel Appointment
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
          </Row>
        </Col>
      </Card.Header>
    </Card>
  );
}

export default Dashboard;
