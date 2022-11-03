const db = require("../db");

class Course {
  static async getTutors(course) {
    //Function that returns the array of tutors that are teaching a course.
    if (!course) {
      throw "No course provided!";
    }
    console.log("course:", course.course);

    const query = `SELECT tutors FROM courses WHERE course = $1`;
    const result = await db.query(query, [course.course]);
    const tutors = result.rows;

    return tutors;
  }
}

module.exports = Course;
