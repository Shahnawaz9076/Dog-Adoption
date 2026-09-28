import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDog = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [dog, setDog] = useState(null);


  // Get existing dog
  useEffect(() => {

    const fetchDog = async () => {

      try {

        const response = await axios.get(
          `http://localhost:8080/api/dogs/get/${id}`
        );

        setDog(response.data);

      } catch (error) {

        console.error("Error fetching dog:", error);

      }

    };

    fetchDog();

  }, [id]);


  // Handle input changes
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setDog({
      ...dog,
      [name]: type === "checkbox" ? checked : value
    });

  };


  // Update dog
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.put(
        `http://localhost:8080/api/dogs/update/${id}`,
        dog
      );

      console.log(response.data);

      alert("Dog updated successfully! 🐶");

      navigate("/manage-dogs");

    } catch (error) {

      console.error("Error updating dog:", error);

      alert("Failed to update dog");

    }

  };


  if (!dog) {

    return <h2>Loading...</h2>;

  }


  return (

    <div>

      <h1>Edit Dog 🐶</h1>


      <form onSubmit={handleSubmit}>

        {/* Name */}

        <label>Name</label>

        <input
          type="text"
          name="name"
          value={dog.name}
          onChange={handleChange}
        />

        <br /><br />


        {/* Breed */}

        <label>Breed</label>

        <input
          type="text"
          name="breed"
          value={dog.breed}
          onChange={handleChange}
        />

        <br /><br />


        {/* Age */}

        <label>Age</label>

        <input
          type="number"
          name="age"
          value={dog.age}
          onChange={handleChange}
        />

        <br /><br />


        {/* Gender */}

        <label>Gender</label>

        <select
          name="gender"
          value={dog.gender}
          onChange={handleChange}
        >

          <option value="Male">Male</option>

          <option value="Female">Female</option>

        </select>

        <br /><br />


        {/* Color */}

        <label>Color</label>

        <input
          type="text"
          name="color"
          value={dog.color}
          onChange={handleChange}
        />

        <br /><br />


        {/* Weight */}

        <label>Weight (kg)</label>

        <input
          type="number"
          name="weight"
          value={dog.weight}
          onChange={handleChange}
        />

        <br /><br />


        {/* Vaccinated */}

        <label>

          <input
            type="checkbox"
            name="vaccinated"
            checked={dog.vaccinated}
            onChange={handleChange}
          />

          Vaccinated

        </label>

        <br /><br />


        {/* Description */}

        <label>Description</label>

        <br />

        <textarea
          name="description"
          value={dog.description}
          onChange={handleChange}
          rows="5"
        />

        <br /><br />


        {/* Status */}

        <label>Status</label>

        <select
          name="status"
          value={dog.status}
          onChange={handleChange}
        >

          <option value="Available">
            Available
          </option>

          <option value="Adopted">
            Adopted
          </option>

        </select>

        <br /><br />


        <button type="submit">
          💾 Update Dog
        </button>


        <button
          type="button"
          onClick={() => navigate("/manage-dogs")}
        >
          Cancel
        </button>

      </form>

    </div>

  );

};

export default EditDog;