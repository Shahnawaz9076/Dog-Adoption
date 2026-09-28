
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);


  // =========================
  // CHECK LOGGED-IN USER
  // =========================

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      try {

        setUser(JSON.parse(storedUser));

      } catch (error) {

        console.error(
          "Invalid user data:",
          error
        );

        localStorage.removeItem("user");

      }

    }

  }, []);


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

    alert("Logged out successfully!");

    navigate("/login");

  };


  return (

    <nav className="navbar">


      {/* =========================
          LOGO
      ========================= */}

      <div className="logo">

        🐾 PawFinder

      </div>


      {/* =========================
          NAV LINKS
      ========================= */}

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/dogs">
          Dogs
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>


        {/* ADMIN LINK */}

        {user?.role === "ADMIN" && (

          <Link to="/admin">
            Admin Dashboard
          </Link>

        )}

      </div>


      {/* =========================
          AUTH BUTTONS
      ========================= */}

      <div className="nav-buttons">


        {!user ? (

          <>

            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
            >
              Register
            </Link>

          </>

        ) : (

          <>

            {/* USER NAME */}

            <span className="user-info">

              👤 {user.name || user.email}

            </span>


            {/* LOGOUT */}

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        )}

      </div>

    </nav>

  );

};

export default Navbar;
