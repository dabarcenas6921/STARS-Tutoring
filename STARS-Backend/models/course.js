const db = require("../db");

class Course {
  static async getTutors(course) {
    //Function that returns the array of tutors that are teaching a course.
    if (!course) {
      throw "No course provided!";
    }

    const query = `
    SELECT id, first_name, last_name, tutor_schedules
    FROM courses, schedules, users
    WHERE courses.course = $1 AND users.id = ANY(courses.tutors) AND users.id = schedules.tutor_id`;
    const result = await db.query(query, [course.course]);
    const tutors = result.rows;

    return tutors;
  }

  static async getCourses() {
    //Function that returns the array of all available courses;
    const query = `SELECT course FROM courses`;
    const result = await db.query(query);
    const courses = result.rows;

    return courses;
  }
}

module.exports = Course;
