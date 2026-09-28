import React, { useState } from "react";
import axios from "axios";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          name: name,
          email: email,
          password: password
        }
      );

      console.log(response.data);

      alert("Registration successful! 🎉");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.error("Registration error:", error);

      if (error.response) {

        alert(error.response.data);

      } else {

        alert("Something went wrong!");

      }

    }

  };


  return (

    <div>

      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>

        <div>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

        </div>


        <div>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

        </div>


        <div>

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

        </div>


        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );

};

export default Register;