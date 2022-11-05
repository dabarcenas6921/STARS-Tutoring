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

module.exports = router;
