const express = require("express");
const Course = require("../models/course");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("courses route");
});

router.post("/getTutors", async (req, res) => {
  try {
    const course = req.body;
    const tutors = await Course.getTutors(course);
    return res.status(201).send(tutors[0]);
  } catch (e) {
    console.log("error:", e);
  }
});

router.get("/getCourses", async (req, res) => {
  try {
    const courses = await Course.getCourses();
    return res.status(201).json({ courses });
  } catch (e) {
    console.log("Error:", e);
  }
});

module.exports = router;
