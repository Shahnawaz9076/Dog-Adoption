import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: email,
          password: password
        }
      );

      console.log("Login Response:", response.data);

      const user = response.data;

      // Save complete user information
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Save JWT token separately
      localStorage.setItem(
        "token",
        user.token
      );

      // Save role separately
      localStorage.setItem(
        "role",
        user.role
      );

      alert("Login successful! 🎉");

      // Redirect based on role
      if (user.role === "ADMIN") {

        navigate("/admin");

      } else {

        navigate("/dogs");

      }

    } catch (error) {

      console.error("Login error:", error);

      if (error.response) {

        alert(error.response.data);

      } else {

        alert("Something went wrong!");

      }

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e8f5e9, #ffffff)",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          boxSizing: "border-box"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#2e7d32",
            fontSize: "32px"
          }}
        >
          🐾 Login
        </h1>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >

          {/* Email */}
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >

            <label
              style={{
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333"
              }}
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px 14px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                width: "100%"
              }}
            />

          </div>

          {/* Password */}
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >

            <label
              style={{
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333"
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px 14px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                width: "100%"
              }}
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#4caf50",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "5px"
            }}
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

};

export default Login;