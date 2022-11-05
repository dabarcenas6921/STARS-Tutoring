import React from "react";
import courseIcon1_w from "../../assets/course-category-icon-1-w.png";
import courseIcon1 from "../../assets/course-category-icon-1.png";
import courseIcon2_w from "../../assets/course-category-icon-2-w.png";
import courseIcon2 from "../../assets/course-category-icon-2.png";
import courseIcon3_w from "../../assets/course-category-icon-3-w.png";
import courseIcon3 from "../../assets/course-category-icon-3.png";
import courseIcon4_w from "../../assets/course-category-icon-4-w.png";
import courseIcon4 from "../../assets/course-category-icon-4.png";
import courseIcon5_w from "../../assets/course-category-icon-5-w.png";
import courseIcon5 from "../../assets/course-category-icon-5.png";
import courseIcon6_w from "../../assets/course-category-icon-6-w.png";
import courseIcon6 from "../../assets/course-category-icon-6.png";
import "./Categories.css";

const Categories = () => {
  return (
    <>
      <section className="category" id="categories">
        <p className="section-subtitle">Subject Categories</p>

        <h2 className="section-title">Some of the Courses We Offer</h2>

        <ul className="course-item-group">
          <li className="course-category-item">
            <div className="wrapper">
              <img
                src={courseIcon1}
                alt="category icon"
                className="category-icon default"
              />

              <img
                src={courseIcon1_w}
                alt="category icon white"
                className="category-icon hover"
              />
            </div>

            <div className="course-category-content">
              <h3 className="category-title">
                <a href="#">Pre-Calculus</a>
              </h3>

              <p className="category-subtitle">Practice Calculus Foundations</p>
            </div>
          </li>

          <li className="course-category-item">
            <div className="wrapper">
              <img
                src={courseIcon3}
                alt="category icon"
                className="category-icon default"
              />

              <img
                src={courseIcon3_w}
                alt="category icon white"
                className="category-icon hover"
              />
            </div>

            <div className="course-category-content">
              <h3 className="category-title">
                <a href="#">Trigonometry</a>
              </h3>

              <p className="category-subtitle">
                Study Relationships between sides and angles
              </p>
            </div>
          </li>

          <li className="course-category-item">
            <div className="wrapper">
              <img
                src={courseIcon2}
                alt="category icon"
                className="category-icon default"
              />

              <img
                src={courseIcon2_w}
                alt="category icon white"
                className="category-icon hover"
              />
            </div>

            <div className="course-category-content">
              <h3 className="category-title">
                <a href="#">Calculus</a>
              </h3>

              <p className="category-subtitle">
                Study derivatives and integrals of functions
              </p>
            </div>
          </li>

          <li className="course-category-item">
            <div className="wrapper">
              <img
                src={courseIcon6}
                alt="category icon"
                className="category-icon default"
              />

              <img
                src={courseIcon6_w}
                alt="category icon white"
                className="category-icon hover"
              />
            </div>

            <div className="course-category-content">
              <h3 className="category-title">
                <a href="#">Statistics</a>
              </h3>

              <p className="category-subtitle">Practice the analysis of data</p>
            </div>
          </li>

          <li className="course-category-item">
            <div className="wrapper">
              <img
                src={courseIcon5}
                alt="category icon"
                className="category-icon default"
              />

              <img
                src={courseIcon5_w}
                alt="category icon white"
                className="category-icon hover"
              />
            </div>

            <div className="course-category-content">
              <h3 className="category-title">
                <a href="#">Algebra</a>
              </h3>

              <p className="category-subtitle">
                Improve your college algebra skills
              </p>
            </div>
          </li>

          <li className="course-category-item">
            <div className="wrapper">
              <img
                src={courseIcon4}
                alt="category icon"
                className="category-icon default"
              />

              <img
                src={courseIcon4_w}
                alt="category icon white"
                className="category-icon hover"
              />
            </div>

            <div className="course-category-content">
              <h3 className="category-title">
                <a href="#">Business Calculus</a>
              </h3>

              <p className="category-subtitle">
                Calculus in the world of business and economics
              </p>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Categories;
