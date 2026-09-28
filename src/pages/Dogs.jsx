
import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import "../css/Dogs.css";
import { useNavigate } from "react-router-dom";

const Dogs = () => {

  const [dogs, setDogs] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    const fetchDogs = async () => {

      try {

        const response = await api.get(
          "/api/dogs/getAll"
        );

        setDogs(response.data);

      } catch (error) {

        console.error(
          "Error fetching dogs:",
          error
        );

      }

    };

    fetchDogs();

  }, []);


  return (

    <div className="dogs-page">


      <div className="dogs-header">

        <h1>
          Find Your Perfect Companion 🐶
        </h1>

        <p>
          Meet our lovely dogs waiting for their forever home.
        </p>

      </div>


      <div className="dogs-grid">

        {dogs.map((dog) => (

          <div
            className="dog-card"
            key={dog.id}
          >


            <div className="dog-image">

              <img
                src={dog.image}
                alt={dog.name}
              />

            </div>


            <div className="dog-info">

              <h2>
                {dog.name}
              </h2>


              <p className="breed">
                {dog.breed}
              </p>


              <div className="dog-details">

                <span>
                  🐾 {dog.age} Years
                </span>


                <span>

                  {dog.gender === "Male"
                    ? "♂"
                    : "♀"}

                  {" "}

                  {dog.gender}

                </span>

              </div>


              <p className="description">
                {dog.description}
              </p>


              <div className="dog-bottom">


                <span className="status">
                  {dog.status}
                </span>


                <button
                  onClick={() => {

                    console.log(
                      "CLICKED"
                    );

                    console.log(
                      "Dog ID:",
                      dog.id
                    );

                    navigate(
                      `/dogs/${dog.id}`
                    );

                  }}
                >
                  View Details →
                </button>


              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Dogs;
