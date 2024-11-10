import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AboutComponent: React.FC = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="text-info text-bold">About Us</h2>
          <p className="text-white">
            Welcome to Coffee House! We are a family-owned coffee shop that
            serves the finest brewed coffee made from freshly roasted beans. Our
            mission is to provide you with a cozy space to enjoy a cup of coffee
            and relax, catch up with friends, or get some work done.
          </p>
          <p className="text-white">
            Whether you’re in the mood for a classic espresso, a rich latte, or
            something new, we’ve got something for everyone. Come visit us and
            experience coffee like never before!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutComponent;
