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

  static async register(credentials) {}

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
