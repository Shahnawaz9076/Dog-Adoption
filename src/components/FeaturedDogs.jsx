import React from "react";
import "../css/FeaturedDogs.css";

const FeaturedDogs = () => {

  const dogs = [
    {
      id: 1,
      name: "Bruno",
      breed: "Golden Retriever",
      age: "2 Years",
      gender: "Male",
      emoji: "🐕"
    },
    {
      id: 2,
      name: "Bella",
      breed: "Labrador",
      age: "1.5 Years",
      gender: "Female",
      emoji: "🐶"
    },
    {
      id: 3,
      name: "Max",
      breed: "Siberian Husky",
      age: "3 Years",
      gender: "Male",
      emoji: "🐕‍🦺"
    }
  ];

  return (
    <section className="featured-section">

      <div className="section-heading">

        <p>MEET YOUR NEW BEST FRIEND</p>

        <h2>Featured Dogs</h2>

        <span>
          These lovely dogs are looking for their forever homes.
        </span>

      </div>

      <div className="dog-grid">

        {dogs.map((dog) => (

          <div className="dog-card" key={dog.id}>

            <div className="dog-image">
              {dog.emoji}
            </div>

            <div className="dog-info">

              <h3>{dog.name}</h3>

              <p className="breed">
                {dog.breed}
              </p>

              <div className="dog-details">

                <span>🎂 {dog.age}</span>

                <span>
                  {dog.gender === "Male" ? "♂ Male" : "♀ Female"}
                </span>

              </div>

              <button className="view-btn">
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default FeaturedDogs;