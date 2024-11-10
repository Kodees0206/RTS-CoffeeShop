// src/components/Logout.tsx
import React, { useState } from "react";
import { logout } from "./AuthService";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    setMessage(result);
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>{message}</p>
    </div>
  );
};

export default Logout;
