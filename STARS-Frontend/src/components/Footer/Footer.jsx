import React from "react";
import logoFooter from "../../assets/logo-footer.png";
import "./Footer.css";
import { Input } from "@nextui-org/react";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";

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
            Florida International University is a top public university that drives
            real talent and innovation in Miami and globally. Today, FIU has two
            campuses and multiple centers. FIU serves a diverse student body 
            of more than 56,000 and 290,000 Panther alumni. U.S. News and
            World Report places dozens of FIU programs among the best in the
            nation, including international business at No. 2.
            </p>

            <div className="social-link">
              <a href="https://www.facebook.com/floridainternational">
                <IoLogoFacebook />
              </a>
              <a href="https://www.instagram.com/fiuinstagram/">
                <IoLogoInstagram />
              </a>
              <a href="https://twitter.com/fiu">
                <IoLogoTwitter />
              </a>
              <a href="https://www.youtube.com/user/FloridaInternational">
                <IoLogoYoutube />
              </a>
            </div>
          </div>

          <ul className="grid-item">
            <h4 className="item-heading">Our Links</h4>

            <li className="list-item">
              <a href="https://www.fiu.edu/about/index.html">About Us</a>
            </li>

            <li className="list-item">
              <a href="https://www.fiu.edu/admissions/index.html">Admissions</a>
            </li>

            <li className="list-item">
              <a href="https://my.fiu.edu/">MyFIU</a>
            </li>

            <li className="list-item">
              <a href="https://news.fiu.edu/">FIU News</a>
            </li>

            <li className="list-item">
              <a href="https://www.fiu.edu/about/contact-us/index.html">Contact Us</a>
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
