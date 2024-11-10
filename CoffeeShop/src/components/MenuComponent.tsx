// MenuComponent.tsx
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useCart } from "./CartContext";
import axios from "axios";

// Define the structure for each menu item
export interface MenuItem {
  id: number;
  title: string;
  url: string;
  description: string;
  price: number;
  quantity?: number; // optional field for quantity in the cart
}

const MenuComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<MenuItem[]>(
        "http://localhost:3001/list"
      );
      console.log("Fetched Menu Data:", response.data); // Log the fetched data
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item); // Add item to cart

    // Show an alert when an item is added
    window.alert(`${item.title} has been added to your cart!`);
  };

  return (
    <Container>
      <br />
      <Row>
        {menuItems.map((item) => (
          <Col key={item.id} md={4} sm={6} xs={12} className="mb-4">
            <Card style={{ width: "18rem", height: "500px" }}>
              <Card.Img
                variant="top"
                src={item.url}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover", // Ensure image doesn't get distorted
                }}
              />
              <Card.Body style={{ overflow: "hidden" }}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text style={{ height: "80px", overflow: "hidden" }}>
                  {item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ₹{item.price.toFixed(2)}
                </Card.Text>
                <Button variant="dark" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MenuComponent;
