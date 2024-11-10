import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const OrderComponent: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Fetch all orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/orders/getAllOrders"
        );
        setOrders(response.data); // Set orders from the backend response
      } catch (error: any) {
        setError("Failed to load orders. Please try again later.");
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) => {
    return order.id.toString().includes(searchTerm); // Check if order ID contains the search term
  });

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true); // Show modal with order details
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <h2 className="my-4 text-warning" >Your Orders</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Search bar */}
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="my-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Col md={4} key={order.id} className="mb-4">
              <Card
                style={{ cursor: "pointer" }}
                onClick={() => handleOrderClick(order)}
              >
                <Card.Body>
                  <Card.Title>Order ID: {order.id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Date: {order.orderDate}
                  </Card.Subtitle>
                  <Card.Text>Total Amount: ₹{order.totalAmount}</Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-danger">No orders found</p>
        )}
      </Row>

      {/* Modal to show detailed order information */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <h4>Order ID: {selectedOrder.id}</h4>
              <p>Order Date: {selectedOrder.orderDate}</p>
              <h5>Items:</h5>
              {selectedOrder.items.map((item: any) => (
                <div key={item.id}>
                  <p>
                    {item.title} x {item.quantity} = ₹{item.price}
                  </p>
                </div>
              ))}
              <p>Total Amount: ₹{selectedOrder.totalAmount}</p>
              <p>Tax: ₹{selectedOrder.tax}</p>
              <p>Final Amount: ₹{selectedOrder.finalAmount}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderComponent;
