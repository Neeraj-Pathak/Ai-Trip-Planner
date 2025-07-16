import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css"; // Custom CSS from your template

function Hero() {
  return (
    <header id="hero" className="intro" style={{ backgroundImage: `url('/hero.jpg')` }}>
      <div className="overlay">
        <div className="intro-text">
          <h1>
            AI-Powered <span>Trip Planner</span>
          </h1>
          <p>
            Discover, customize, and book your perfect travel itinerary in seconds.
          </p>
          <Link to="/create-trip" className="btn-custom">
            Start Planning
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Hero;
