//SCHEDULE MODEL

const db = require("../db");

class Schedule {
  static async getTutorSchedule(tutor_id) {
    if (!tutor_id) {
      throw "Tutor_id is missing.";
    }

    const query = `SELECT tutor_schedules FROM schedules WHERE tutor_id = $1`;
    const result = await db.query(query, [tutor_id.tutor_id]);
    const schedules = result.rows;

    return schedules;
  }
}

module.exports = Schedule;
