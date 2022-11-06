import React from "react";
import logoFooter from "../../assets/logo-footer.png";
import "./Footer.css";
import { Button, Card, Container, Input, Row, Spacer } from "@nextui-org/react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-grid">
          <div className="grid-item">
            <div className="footer-logo">
              <img src={logoFooter} alt="educator logo white" />
            </div>

            <p className="footer-text">
              Duis a tempor magna. Maecenas ligula felis, imperdiet quis arcu
              eget, blandit ultricies risus. Vivamus fringilla urna vel risus
              congue accumsan.
            </p>

            <div className="social-link">
              <a href="#">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="#">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a href="#">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
              <a href="#">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </div>
          </div>

          <ul className="grid-item">
            <h4 className="item-heading">Our Link</h4>

            <li className="list-item">
              <a href="#home">Home</a>
            </li>

            <li className="list-item">
              <a href="#about">About Us</a>
            </li>

            <li className="list-item">
              <a href="#course">Courses</a>
            </li>

            <li className="list-item">
              <a href="#blog">Blog</a>
            </li>

            <li className="list-item">
              <a href="#contact">Contact Us</a>
            </li>
          </ul>

          <div className="grid-item">
            <h4 className="item-heading">Subscribe Now</h4>
              <Input labelLeft="Email" width="75%" size="xl" type="email"></Input>
          </div>
        </div>

        <p className="copyright">
          Copyright © 2022 <a href="/">FIU STARS TUTORING</a>. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
