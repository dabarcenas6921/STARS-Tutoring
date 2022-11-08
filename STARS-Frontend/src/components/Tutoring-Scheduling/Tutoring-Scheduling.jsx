import { Container, Image, Text } from "@nextui-org/react";
import React from "react";
import page1 from "../../assets/STARS-Tutor-Page-1-1536x743.png";
import page2 from "../../assets/STARS-Tutor-Page-2-1536x1089.png";

export default function TutoringScheduling() {
  return (
    <Container responsive lg css={{ mt: 10, mb: 50 }}>
      <Text h1>STAR Tutors- Fall 2022 Schedule</Text>
      <Image showSkeleton src={page1} />
      <Text h1>Courses covered by each tutor</Text>
      <Image showSkeleton src={page2} />
    </Container>
  );
}
