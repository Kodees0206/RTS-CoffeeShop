// src/components/SignupComponent.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import "./AuthStyles.css";

const SignupComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page after signup
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="auth-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card style={{ width: "24rem" }} className="p-4 auth-card">
          <h2 className="text-center mb-4">Sign Up</h2>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSignup} variant="primary" className="w-100">
            Sign Up
          </Button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Card>
      </Container>
    </div>
  );
};

export default SignupComponent;
