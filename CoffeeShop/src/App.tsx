import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import CartProvider from "./components/CartContext";
import HomeComponent from "./components/HomeComponent";
import MenuComponent from "./components/MenuComponent";
import CartComponent from "./components/CartComponent";
import OrderComponent from "./components/OrderComponent";
import LoginComponent from "./components/LoginComponent";
import SignupComponent from "./components/SignupComponent";
import { auth } from "./components/firebaseConfig"; // Import auth from firebase
import { signOut, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth methods
import AboutComponent from "./components/AboutComponent"; // 
import ContactComponent from "./components/ContactComponent";
import FooterComponent from "./components/FooterComponent";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <Router>
        <AppRoutes user={user} />
        <FooterComponent />
      </Router>
    </CartProvider>
  );
};

interface AppRoutesProps {
  user: any;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ user }) => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">Coffee House</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/menu">Menu</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
          <Nav.Link href="/order">Order</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>  

          {/* Show Logout button only if user is logged in */}
          {user ? (
            <Button
              variant="outline-light"
              onClick={handleLogout}
              className="ml-3"
            >
              Logout
            </Button>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar>

      <Container>
        <Routes>
          {/* If user is not authenticated, they cannot access these routes */}
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />

          {/* Protected Routes */}
          {user && (
            <>
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/menu" element={<MenuComponent />} />
              <Route path="/cart" element={<CartComponent />} />
              <Route path="/order" element={<OrderComponent />} />
              <Route path="/about" element={<AboutComponent />} />
              <Route path="/contact" element={<ContactComponent />} />
            </>
          )}
        </Routes>
      </Container>
    </>
  );
};

export default App;
