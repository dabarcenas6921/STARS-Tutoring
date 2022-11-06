const express = require("express");
const Appointment = require("../models/appointment");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("appointment route");
});

router.post("/create", async (req, res) => {
  try {
    const appointment_body = req.body;
    const appointment = await Appointment.createAppointment(appointment_body);
    return res.status(201).json({ appointment });
  } catch (e) {
    console.log("error:", e);
  }
});

router.get("/getAppointmentsByStudentId/:studentID", async (req, res) => {
  try {
    const student_id = req.params.studentID;
    const appointments = await Appointment.getAppointmentByStudentId(
      student_id
    );
    return res.status(201).json({ appointments });
  } catch (e) {
    console.log("Error:", e);
  }
});

router.get("/getAppointmentsByTutorId/:tutorID", async (req, res) => {
  try {
    const tutor_id = req.params.tutorID;
    const appointments = await Appointment.getAppointmentByTutorId(tutor_id);
    return res.status(201).json({ appointments });
  } catch (e) {
    console.log("Error:", e);
  }
});

module.exports = router;
