import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./home.css"; // Assuming you have a Home.css file for styling

const coffeeQuotes = [
  "Coffee is a language in itself.",
  "Life begins after coffee.",
  "I like coffee because it gives me the illusion that I might be awake.",
  "Good ideas start with brainstorming. Great ideas start with coffee.",
  "Coffee is a hug in a mug.",
  "Without coffee, there would be no work.",
  "Coffee, because adulting is hard.",
  "Coffee: the most important meal of the day.",
  "Coffee is a beverage that puts one to sleep when not drunk.",
  "I drink coffee for your protection.",
  "Behind every successful person is a substantial amount of coffee.",
  "Coffee is the best thing to douse the sunrise with.",
  "Coffee is the foundation of my food pyramid.",
  "Coffee smells like freshly ground heaven.",
  "Decaf? No thanks. I’d rather be awake for the apocalypse.",
  "A cup of coffee shared with a friend is happiness tasted and time well spent.",
  "Coffee: because it’s too early for wine.",
  "Espresso yourself.",
  "My blood type is coffee.",
  "Coffee is a survival mechanism.",
  "Coffee is like a warm hug for your brain.",
  "Coffee, the favorite drink of the civilized world.",
  "I never laugh until I’ve had my coffee.",
  "I like my coffee like I like my mornings: dark and strong.",
  "Coffee is the answer. I don’t remember the question.",
  "Love is in the air, and it smells like coffee.",
  "Life is too short for bad coffee.",
  "Coffee is the ultimate antidepressant.",
  "The best part of waking up is coffee in your cup.",
  "All you need is love and a cup of coffee.",
  "When the coffee is ready, everything is ready.",
];

const Home = () => {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    // Get the current day and use it to select a quote
    const dayOfMonth = new Date().getDate();
    setQuote(coffeeQuotes[dayOfMonth - 1]);
  }, []);

  return (
    <div className="home-container">
      <header className="navbar">{/* Add your Navbar here */}</header>

      <main className="main-content">
        <section className="quote-section">
          <Card className="quote-card">
            <Card.Body>
              <h5 className="daily-quote">{quote}</h5>
            </Card.Body>
          </Card>
        </section>

        <section className="order-section">
          <Button href="menu" variant="primary" className="order-button">
            Order Here
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Home;
