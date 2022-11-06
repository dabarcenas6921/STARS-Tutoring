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
} from "@nextui-org/react";
import { HiOutlineClock } from "react-icons/hi";
import { useEffect } from "react";

const Dashboard = ({ user }) => {
  const [appointmentData, setAppointmentData] = useState();

  useEffect(() => {
    // Get user appointments from the database when dashboard loads
    if (user.account_type == "tutor") {
      try {
        axios
          .get(
            `http://localhost:3001/appointments/getAppointmentsByTutorId/${user.id}`
          )
          .then(function (response) {
            console.log("appointment data:", response.data.appointments);
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
            console.log("appointment data:", response.data.appointments);
            setAppointmentData(response.data.appointments);
          });
      } catch (e) {
        console.log("Error is: " + e);
      }
    }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Container responsive lg css={{ mt: 10, mb: 50 }}>
        <Text h1>Dashboard</Text>
        <Text h3>Upcoming tutoring appointments</Text>
        {appointmentData ? (
          <Grid.Container gap={2} justify="flex-start">
            {appointmentData.map((appointment, idx) => (
              <Grid key={idx} xs={12} sm={6}>
                <AppointmentCard appointment={appointment} />
              </Grid>
            ))}
          </Grid.Container>
        ) : (
          <Text>No appointments to be found!</Text>
        )}
      </Container>
      <Footer />
    </div>
  );
};

function AppointmentCard({ appointment }) {
  const startTime = new Date(appointment.app_start_time);
  const endTime = new Date(appointment.app_end_time);

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
          <Row>
            <Button size="sm" light>
              Cancel Appointment
            </Button>
            <Button css={{ ml: "$5" }} size="sm">
              View Details
            </Button>
          </Row>
        </Col>
      </Card.Header>
    </Card>
  );
}

export default Dashboard;
