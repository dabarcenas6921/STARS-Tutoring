const express = require("express");
const Schedule = require("../models/schedule");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("schedules route");
});

router.get("/getTutorSchedule/:tutor_id", async (req, res) => {
  try {
    const tutor_id = req.params.tutor_id;
    const schedules = await Schedule.getTutorSchedule(tutor_id);
    return res.status(201).json(schedules[0]);
  } catch (e) {
    console.log("error:", e);
  }
});

module.exports = router;
