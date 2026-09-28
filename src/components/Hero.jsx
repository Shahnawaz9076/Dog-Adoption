import React from "react";
import { Link } from "react-router-dom";
import "../css/Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-small">
          🐾 Find Your New Best Friend
        </p>

        <h1>
          Give A Dog A
          <span> Loving Home.</span>
        </h1>

        <p className="hero-description">
          Every dog deserves a loving family.
          Discover adorable dogs waiting for their forever home.
        </p>

        <div className="hero-buttons">

          <Link to="/dogs" className="primary-btn">
            Find a Dog 🐶
          </Link>

          <Link to="/about" className="secondary-btn">
            Learn More
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <div className="dog-placeholder">
          🐶
        </div>

      </div>

    </section>
  );
};

export default Hero;