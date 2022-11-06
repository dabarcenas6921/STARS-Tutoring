import React from "react";
import "./Home.css";
import banner from "../../assets/studying.jpg";
import GlobalNavbar from "../../GlobalNavbar";
import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";
import { Container, Image, Row, Text } from "@nextui-org/react";

const Home = () => {
  return (
    <div className="home-container">
      <div className="title-section">
        <Image src={banner} alt="" />
      </div>
      <Container>
        <Row justify="center" align="center">
          <Text size={60} weight="bold">
            Welcome to
          </Text>

          <Text
            size={60}
            weight="bold"
            css={{
              textGradient: "90deg, rgba(8,30,63,1) 0%, rgba(182,134,44,1) 65%",
              padding: "10px",
            }}
          >
            STARS
          </Text>

          <Text size={60} weight="bold">
            Tutoring!
          </Text>
        </Row>
      </Container>
      <div className="categories-container">
        <Categories />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
