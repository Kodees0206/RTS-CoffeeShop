import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const ContactComponent: React.FC = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="text-info">Contact Us</h2>
          <p className="text-white">
            Have questions or need more information? We’d love to hear from you!
            Reach out to us using the following contact details:
          </p>

          <ListGroup>
            <ListGroup.Item>
              <strong>Address:</strong> 123 Coffee St, Chennimalai, Erode - 638051
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> contact@coffeehouse.com
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone:</strong> +91 (123) 456-7890
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Follow us on:</strong>
              <br />
              <a
                href="https://www.facebook.com/CoffeeHouse"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>{" "}
              |
              <a
                href="https://www.instagram.com/CoffeeHouse"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Instagram
              </a>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactComponent;
