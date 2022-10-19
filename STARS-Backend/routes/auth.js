const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("authentication route");
});

router.post("/register", async (req, res, next) => {
  try {
    const user_info = req.body; //gets the user info from the incoming POST request
    console.log("Here is the body:", user_info);
    const user = await User.register(user_info);
    //Returns the created user in a json
    return res.status(201).json({ user });
  } catch (error) {
    console.log("error:", error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user_info = req.body; //gets the login info from the incoming POST request
    console.log("Here is the login info:", user_info);
    const user = await User.login(user_info);
    //Returns the logged in user in a json
    return res.status(201).json({ user });
  } catch (error) {
    console.log("error:", error);
  }
});

module.exports = router;
