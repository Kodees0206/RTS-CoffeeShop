import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

const FooterComponent: React.FC = () => {
  return (
    <footer className="footer fixed-bottom bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Coffee House</h5>
            <p>123 Coffee St, Brewtown, CA 12345</p>
            <p>
              &copy; {new Date().getFullYear()} Coffee House. All Rights
              Reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-right">
            <h5>Follow Us</h5>
            <Nav>
              <Nav.Link
                href="https://www.facebook.com/CoffeeHouse"
                target="_blank"
                className="text-light"
              >
                Facebook
              </Nav.Link>
              <Nav.Link
                href="https://www.instagram.com/CoffeeHouse"
                target="_blank"
                className="text-light"
              >
                Instagram
              </Nav.Link>
              <Nav.Link
                href="https://www.twitter.com/CoffeeHouse"
                target="_blank"
                className="text-light"
              >
                Twitter
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
