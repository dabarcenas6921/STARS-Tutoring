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
      "course",
    ];

    requiredFields.forEach((field) => {
      if (!appointment.hasOwnProperty(field)) {
        throw `Appointment missing ${field}!`;
      }
    });

    // Creating the appointment..

    const result = await db.query(
      `
        INSERT INTO appointments (student_id, tutor_id, app_start_time, app_end_time, course)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING student_id, tutor_id, app_start_time, app_end_time, created_at, appointment_id, course;
        `,
      [
        appointment.student_id,
        appointment.tutor_id,
        appointment.app_start_time,
        appointment.app_end_time,
        appointment.course,
      ]
    );

    const new_appointment = result.rows[0];

    return new_appointment;
  }

  static async getAppointmentByStudentId(student_id) {
    if (!student_id) {
      throw `Student id not provided!`;
    }

    const query = `
    SELECT appointment_id, student_id, tutor_id, app_start_time, app_end_time, first_name, last_name, course
    FROM appointments, users
    WHERE appointments.student_id = $1 AND appointments.tutor_id = users.id`;
    const result = await db.query(query, [student_id]);
    const appointments = result.rows;

    return appointments;
  }

  static async getAppointmentByTutorId(tutor_id) {
    if (!tutor_id) {
      throw `Tutor id not provided!`;
    }

    const query = `
    SELECT appointment_id, student_id, tutor_id, app_start_time, app_end_time, first_name, last_name, course
    FROM appointments, users
    WHERE appointments.tutor_id= $1 AND appointments.student_id = users.id`;
    const result = await db.query(query, [tutor_id]);
    const appointments = result.rows;

    return appointments;
  }

  static async deleteAppointment(appointment_id) {
    if (!appointment_id) {
      throw `No appointment id provided!`;
    }

    const result = db.query(
      `
    DELETE FROM appointments
    WHERE appointment_id = $1;
    `,
      [appointment_id]
    );
  }
}

module.exports = Appointment;
