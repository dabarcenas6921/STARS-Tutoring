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
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Container responsive lg css={{ mt: 10, mb: 50 }}>
        <Text h1>Dashboard</Text>
        <Text h3>Upcoming tutoring appointments</Text>
        {appointmentData ? (
          <Grid.Container gap={2}>
            {appointmentData.map((appointment, idx) => (
              <Grid key={idx} xs={12} sm={6} lg={4}>
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
  return (
    <Card css={{ w: "100%", width: "100%" }}>
      <Card.Header>
        <Avatar
          css={{ ml: "$8" }}
          size="xl"
          squared
          src="https://i0.wp.com/www.cis.fiu.edu/wp-content/uploads/2016/07/Kianoosh-1-1.jpg?fit=300%2C300&ssl=1"
        />
        <Col css={{ pl: "$6" }}>
          <Text size={15} b transform="uppercase">
            COP4338
          </Text>
          <Text h4>Tutoring Appointment with John</Text>
          <Row>
            <HiOutlineClock />
            <Text h5 css={{ ml: "$2", position: "relative", bottom: "$2" }}>
              Mondays 12:00PM - 1:00PM
            </Text>
          </Row>
          <Row justify="flex-end">
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
