const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth.js");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//ROUTES
app.use("/auth", authRoute);

// health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

module.exports = app;
