const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth.js");
const courseRoute = require("./routes/courses");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//ROUTES
app.use("/auth", authRoute);
app.use("/courses", courseRoute);

//Check if the server is running.
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

module.exports = app;
