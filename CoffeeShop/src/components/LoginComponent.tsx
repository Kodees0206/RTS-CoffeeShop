import React, { useState } from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Make sure firebase config is correct

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to /home after successful login
    } catch (error: any) {
      setError(error.message); // Handle error (show message or log it)
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="login-card"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundImage: 'url("/path/to/your/image.jpg")',
          backgroundSize: "cover",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center text-dark">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="text-secondary">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="text-secondary">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>

        <p className="mt-3 text-center text-white">
          New user?{" "}
          <a href="/signup" className="text-white">
            Sign up here
          </a>
        </p>
      </Card>
    </Container>
  );
};

export default LoginComponent;
