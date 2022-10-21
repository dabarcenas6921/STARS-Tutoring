const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
require("colors");

//initializes the db with the connection string
const db = new Client({ connectionString: getDatabaseUri() });

db.connect((err) => {
  if (err) {
    console.log("Connection error:".red, err);
  } else {
    console.log("Sucessfully connected to STAR postgres db!".blue);
  }
});

module.exports = db;
