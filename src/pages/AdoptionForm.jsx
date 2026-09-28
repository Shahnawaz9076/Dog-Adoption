
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../axiosConfig";
import "../css/AdoptionForm.css";

const AdoptionForm = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // DOG DETAILS
  // =========================

  const dog = location.state?.dog;


  // =========================
  // LOGGED-IN USER
  // =========================

  let user = null;

  try {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      user = JSON.parse(storedUser);
    }

  } catch (error) {

    console.error(
      "Invalid user data in localStorage:",
      error
    );

  }


  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({

    name: user?.name || "",

    // Email initially logged-in user's email,
    // but user can change it
    email: user?.email || "",

    phone: "",

    city: "",

    message: ""

  });


  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({

      ...previousData,

      [name]: value

    }));

  };


  // =========================
  // SUBMIT ADOPTION REQUEST
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // =========================
      // CHECK LOGIN
      // =========================

      if (!user || !user.email) {

        alert("Please login first.");

        navigate("/login");

        return;

      }


      // =========================
      // CHECK DOG
      // =========================

      if (!dog || !dog.id) {

        alert("Dog information is missing.");

        navigate("/dogs");

        return;

      }


      // =========================
      // CHECK FORM
      // =========================

      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim() ||
        !formData.city.trim() ||
        !formData.message.trim()
      ) {

        alert("Please fill all fields.");

        return;

      }


      // =========================
      // ADOPTION DATA
      // =========================

      const adoptionData = {

        // Dog details
        dogId: dog.id,

        dogName: dog.name,


        // Applicant details
        name: formData.name.trim(),

        email: formData.email.trim(),

        phone: formData.phone.trim(),

        city: formData.city.trim(),

        message: formData.message.trim(),


        // IMPORTANT:
        // This is always the logged-in account email
        userEmail: user.email

      };


      console.log(
        "=============================="
      );

      console.log(
        "ADOPTION REQUEST"
      );

      console.log(
        "=============================="
      );

      console.log(
        "Logged-in User:",
        user
      );

      console.log(
        "Logged-in Account Email:",
        user.email
      );

      console.log(
        "Applicant Email:",
        formData.email
      );

      console.log(
        "Adoption Data:",
        adoptionData
      );


      // =========================
      // API CALL
      // =========================

      const response = await api.post(

        "/api/adoptions/create",

        adoptionData

      );


      console.log(
        "Adoption Response:",
        response.data
      );


      // =========================
      // SUCCESS
      // =========================

      alert(
        "Adoption request submitted successfully! ❤️"
      );

      navigate("/dogs");


    } catch (error) {

      console.error(
        "=============================="
      );

      console.error(
        "ADOPTION ERROR"
      );

      console.error(
        "=============================="
      );

      console.error(error);


      if (error.response) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );

        alert(
          `Unable to submit adoption request. Status: ${error.response.status}`
        );

      } else {

        console.error(
          "Network Error:",
          error.message
        );

        alert(
          "Unable to connect to server."
        );

      }

    }

  };


  // =========================
  // DOG NOT FOUND
  // =========================

  if (!dog) {

    return (

      <div className="form-error">

        <h2>
          Dog information not found.
        </h2>

        <button
          type="button"
          onClick={() => navigate("/dogs")}
        >
          Back to Dogs
        </button>

      </div>

    );

  }


  // =========================
  // ADOPTION FORM
  // =========================

  return (

    <div className="adoption-page">

      <div className="adoption-card">


        {/* =========================
            BACK BUTTON
        ========================= */}

        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>


        {/* =========================
            TITLE
        ========================= */}

        <h1>
          Adopt {dog.name} ❤️
        </h1>


        <p className="adoption-subtitle">
          Fill out the form below to start your adoption journey.
        </p>


        <form onSubmit={handleSubmit}>


          {/* =========================
              FULL NAME
          ========================= */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              EMAIL
          ========================= */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <small>
              You can use a different email if required.
            </small>

          </div>


          {/* =========================
              PHONE
          ========================= */}

          <div className="form-group">

            <label>
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              CITY
          ========================= */}

          <div className="form-group">

            <label>
              City
            </label>

            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              MESSAGE
          ========================= */}

          <div className="form-group">

            <label>
              Why do you want to adopt {dog.name}?
            </label>

            <textarea
              name="message"
              placeholder="Tell us something about yourself..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />

          </div>


          {/* =========================
              SUBMIT BUTTON
          ========================= */}

          <button
            type="submit"
            className="submit-adoption"
          >
            Submit Adoption Request ❤️
          </button>


        </form>

      </div>

    </div>

  );

};

export default AdoptionForm;
