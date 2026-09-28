
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axiosConfig";
import "../css/DogDetails.css";

const DogDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================
  // FETCH DOG
  // =========================

  useEffect(() => {

    const fetchDog = async () => {

      try {

        setLoading(true);
        setError("");

        console.log("Fetching Dog ID:", id);

        const response = await api.get(
          `/api/dogs/get/${id}`
        );

        console.log("Dog Response:", response.data);

        setDog(response.data);

      } catch (error) {

        console.error(
          "Error fetching dog:",
          error
        );

        if (error.response) {

          console.error(
            "Status:",
            error.response.status
          );

          console.error(
            "Response:",
            error.response.data
          );

        }

        setError(
          "Unable to load dog details."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchDog();

  }, [id]);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="dog-details-page">

        <h2>Loading...</h2>

      </div>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error || !dog) {

    return (

      <div className="dog-details-page">

        <h2>
          {error || "Dog not found."}
        </h2>

        <button
          className="back-button"
          onClick={() => navigate("/dogs")}
        >
          ← Back to Dogs
        </button>

      </div>

    );

  }


  // =========================
  // DOG DETAILS
  // =========================

  return (

    <div className="dog-details-page">


      {/* =========================
          BACK BUTTON
      ========================= */}

      <button
        className="back-button"
        onClick={() => navigate("/dogs")}
      >
        ← Back to Dogs
      </button>


      <div className="dog-details-card">


        {/* =========================
            DOG IMAGE
        ========================= */}

        <div className="dog-details-image">

          <img
            src={dog.image}
            alt={dog.name}
          />

        </div>


        {/* =========================
            DOG INFORMATION
        ========================= */}

        <div className="dog-details-info">


          <h1>
            {dog.name}
          </h1>


          <p className="details-breed">
            {dog.breed}
          </p>


          {/* =========================
              DETAILS GRID
          ========================= */}

          <div className="details-grid">


            {/* AGE */}

            <div className="detail-box">

              <strong>
                🐾 Age
              </strong>

              <span>
                {dog.age} Years
              </span>

            </div>


            {/* GENDER */}

            <div className="detail-box">

              <strong>
                ⚥ Gender
              </strong>

              <span>
                {dog.gender}
              </span>

            </div>


            {/* COLOR */}

            <div className="detail-box">

              <strong>
                🎨 Color
              </strong>

              <span>
                {dog.color}
              </span>

            </div>


            {/* WEIGHT */}

            <div className="detail-box">

              <strong>
                ⚖ Weight
              </strong>

              <span>
                {dog.weight} kg
              </span>

            </div>


            {/* VACCINATED */}

            <div className="detail-box">

              <strong>
                💉 Vaccinated
              </strong>

              <span>
                {dog.vaccinated
                  ? "Yes"
                  : "No"}
              </span>

            </div>

          </div>


          {/* =========================
              DESCRIPTION
          ========================= */}

          <p className="details-description">

            {dog.description}

          </p>


          {/* =========================
              STATUS
          ========================= */}

          <span className="details-status">

            {dog.status === "Available"
              ? "🟢 Available"
              : "🏠 Adopted"}

          </span>


          {/* =========================
              ADOPT BUTTON
          ========================= */}

          {dog.status === "Available" ? (

            <button
              className="adopt-button"
              onClick={() => {

                navigate("/adopt", {
                  state: {
                    dog: dog
                  }
                });

              }}
            >
              ❤️ Adopt {dog.name}
            </button>

          ) : (

            <button
              className="adopt-button"
              disabled
            >
              🏠 Already Adopted
            </button>

          )}


        </div>

      </div>

    </div>

  );

};


export default DogDetails;


