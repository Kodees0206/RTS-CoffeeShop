import React from "react";
import {
  Container,
  ListGroup,
  Button,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartComponent: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [orderDate, setOrderDate] = React.useState<string>("");

  // Calculate total price of items
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity!,
      0
    );
  };

  // Calculate tax (5%)
  const getTax = () => {
    return getTotalPrice() * 0.05;
  };

  // Calculate final amount including tax
  const getFinalAmount = () => {
    return getTotalPrice() + getTax();
  };

  // Place order function
  const handleCheckout = async () => {
    const currentDate = new Date();
    setOrderDate(currentDate.toLocaleString()); // Format date and time

    const orderDetails = {
      items: cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        orderDate: currentDate.toISOString(), // ISO formatted date
      })),
      totalAmount: getTotalPrice(),
      tax: getTax(),
      finalAmount: getFinalAmount(),
      orderDate: currentDate.toISOString(), // Include formatted date and time
    };

    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      // Send POST request to backend API to save order
      const response = await axios.post(
        "http://localhost:8080/api/orders/placeOrder", // Adjust API endpoint if necessary
        orderDetails
      );

      if (response.status === 201) {
        // Order placed successfully
        clearCart();
        navigate("/order"); // Navigate to order page
        console.log("Order placed successfully:", response.data);
      }
    } catch (error: any) {
      setError("Error placing order. Please try again.");
      console.error("Error placing order:", error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      {/* <h2 className="text-center text-warning">Your Cart</h2> */}
      {error && <Alert variant="danger">{error}</Alert>}
      {cartItems.length > 0 ? (
        <>
          <Row className="justify-content-center">
            {cartItems.map((item) => (
              <Col key={item.id} md={8} lg={6} className="mb-4">
                <Card
                  className="product-card"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Custom shadow for the card
                    padding: "10px",
                    backgroundColor: "#f9f9f9", // Light background color for card
                  }}
                >
                  <Card.Body style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.url}
                      alt={item.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        marginRight: "15px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h5>{item.title}</h5>
                      <p>₹{item.price.toFixed(2)} each</p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          variant="outline-secondary"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity! - 1)
                          }
                          style={{ marginRight: "10px" }}
                        >
                          -
                        </Button>
                        <span style={{ margin: "0 10px" }}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline-secondary"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity! + 1)
                          }
                          style={{ marginLeft: "10px" }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                      style={{ marginLeft: "15px" }}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div
            className="text-primary"
            style={{
              position: "fixed",
              bottom: "350px", // Distance from the bottom of the page
              right: "20px", // Distance from the left of the page
              backgroundColor: "#f8f9fa", // Optional background color to make it stand out
              padding: "15px", // Optional padding
              borderRadius: "10px", // Optional rounded corners for better appearance
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for better visibility
              fontSize: "1.25rem", // Adjust the font size
            }}
          >
            <h4>Total Price: ₹{getTotalPrice().toFixed(2)}</h4>
            <h5>Tax (5%): ₹{getTax().toFixed(2)}</h5>
            <h5>Amount to Pay: ₹{getFinalAmount().toFixed(2)}</h5>
            <h6>Order Date: {orderDate}</h6> {/* Display date and time */}
            <Button variant="primary" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button
              variant="success"
              onClick={handleCheckout}
              style={{ marginLeft: "20px" }}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </>
      ) : (
        <p className=" text-lg-center text-primary">Your cart is empty</p>
      )}
    </Container>
  );
};

export default CartComponent;
