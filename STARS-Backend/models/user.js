const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

//Creates the User models for the backend

class User {
  static async makePublicUser(user) {
    //Function that creates a user object with the incoming user data
    return {
      id: user.id,
      password: user.password,
      email: user.email,
      account_type: user.account_type,
      created_at: user.created_at,
      first_name: user.first_name,
      last_name: user.last_name,
      panther_id: user.panther_id,
    };
  }

  static async login(credentials) {
    //Check if the user has an email and a password when they login.
    //otherwise, reject them
    const requiredFields = ["email", "password"];

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw `Missing ${field} in the parameter!`;
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }

    throw `Invalid email/password!`;
  }

  static async register(credentials) {
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "password",
      "panther_id",
    ];
    //Checking that all the fields are filled when posting to the database.
    requiredFields.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(credentials, field)) {
        throw `Missing ${field} for registration!`;
      }
    });

    //Check if there is an existing user already with this email.

    const existingUser = await User.fetchUserByEmail(credentials.email);

    if (existingUser) {
      throw `User is already registered with this email!`;
    }

    const lowercasedEmail = credentials.email.toLowerCase();
    const lowercasedFirstName = credentials.first_name.toLowerCase();
    const lowercasedLastName = credentials.last_name.toLowerCase();

    //hashing the password for the db
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    //posting user info into the database
    const result = await db.query(
      `
      INSERT INTO users (password, account_type, first_name, last_name, email, panther_id)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING first_name, last_name, email, password, panther_id, account_type,created_at,id;
      `,
      [
        hashedPassword,
        "student",
        lowercasedFirstName,
        lowercasedLastName,
        lowercasedEmail,
        credentials.panther_id,
      ]
    );

    const user = result.rows[0];

    return User.makePublicUser(user);
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw "No email provided!";
    }

    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
