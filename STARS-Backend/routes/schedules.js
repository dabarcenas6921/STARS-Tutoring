const express = require("express");
const Schedule = require("../models/schedule");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("schedules route");
});

router.post("/getTutorSchedule", async (req, res) => {
  try {
    const tutor_id = req.body;
    const schedules = await Schedule.getTutorSchedule(tutor_id);
    return res.status(201).send(schedules[0]);
  } catch (e) {
    console.log("error:", e);
  }
});

module.exports = router;
