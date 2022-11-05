const db = require("../db");

class Appointment {
  static async createAppointment(appointment) {
    if (!appointment) {
      throw `Appointment info not found!`;
    }

    // Check if appointment body has the following fields
    const requiredFields = [
      "student_id",
      "tutor_id",
      "app_start_time",
      "app_end_time",
    ];

    requiredFields.forEach((field) => {
      if (!appointment.hasOwnProperty(field)) {
        throw `Appointment missing ${field}!`;
      }
    });

    // Creating the appointment..

    const result = await db.query(
      `
        INSERT INTO appointments (student_id, tutor_id, app_start_time, app_end_time)
        VALUES
        ($1, $2, $3, $4)
        RETURNING student_id, tutor_id, app_start_time, app_end_time, created_at, appointment_id;
        `,
      [
        appointment.student_id,
        appointment.tutor_id,
        appointment.app_start_time,
        appointment.app_end_time,
      ]
    );

    const new_appointment = result.rows[0];

    return new_appointment;
  }

  static async getAppointmentByStudentId(student_id) {}
}

module.exports = Appointment;
