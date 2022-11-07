const db = require("../db");

class Course {
  static async getTutors(course) {
    //Function that returns the array of tutors that are teaching a course.
    if (!course) {
      throw "No course provided!";
    }

    const query = `SELECT tutors FROM courses WHERE course = $1`;
    const result = await db.query(query, [course]);
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
