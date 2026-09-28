import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">

          <h2>🐾 PawFinder</h2>

          <p>
            Helping dogs find loving families and
            their forever homes.
          </p>

        </div>


        {/* Quick Links */}
        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/dogs">Dogs</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

        </div>


        {/* Contact */}
        <div className="footer-contact">

          <h3>Contact Us</h3>

          <p>📍 Lucknow, India</p>

          <p>📧 pawfinder@example.com</p>

          <p>📞 +91 98765 43210</p>

        </div>


        {/* Social */}
        <div className="footer-social">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#" aria-label="Instagram">
              📷
            </a>

            <a href="#" aria-label="Facebook">
              📘
            </a>

            <a href="#" aria-label="Twitter">
              🐦
            </a>

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © 2026 PawFinder. All Rights Reserved.
        </p>

        <p>
          Made with ❤️ for dogs.
        </p>

      </div>

    </footer>
  );
};

export default Footer;