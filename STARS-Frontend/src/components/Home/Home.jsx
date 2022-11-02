import React from "react";
import "./Home.css";
import banner from "../../assets/tutoring.jpg";
import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <div className="title-section">
        <div className="title-container">
          <h1 className="home-title">Welcome to STARS Tutoring</h1>
        </div>
        <img src={banner} alt="" />
      </div>
      <div className="categories-container">
        <Categories />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
