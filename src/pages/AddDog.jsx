import React, { useState } from "react";
import axios from "axios";

const AddDog = () => {

  const [dog, setDog] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    weight: "",
    vaccinated: false,
    description: "",
    status: "Available"
  });


  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setDog({
      ...dog,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    try {
  
      const response = await axios.post(
        "http://localhost:8080/api/dogs/create",
        dog
      );
  
      console.log(response.data);
  
      alert("Dog added successfully! 🐶");
  
    } catch (error) {
  
      console.error("Error adding dog:", error);
  
      alert("Failed to add dog");
  
    }
  
  };


  return (
    <div>

      <h1>Add New Dog 🐶</h1>

      <form onSubmit={handleSubmit}>

        {/* Name */}

        <label>Name</label>

        <input
          type="text"
          name="name"
          value={dog.name}
          onChange={handleChange}
          placeholder="Enter dog name"
        />

        <br /><br />


        {/* Breed */}

        <label>Breed</label>

        <input
          type="text"
          name="breed"
          value={dog.breed}
          onChange={handleChange}
          placeholder="Enter breed"
        />

        <br /><br />


        {/* Age */}

        <label>Age</label>

        <input
          type="number"
          name="age"
          value={dog.age}
          onChange={handleChange}
          placeholder="Enter age"
        />

        <br /><br />


        {/* Gender */}

        <label>Gender</label>

        <select
          name="gender"
          value={dog.gender}
          onChange={handleChange}
        >

          <option value="">Select Gender</option>

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
          placeholder="Enter color"
        />

        <br /><br />


        {/* Weight */}

        <label>Weight (kg)</label>

        <input
          type="number"
          name="weight"
          value={dog.weight}
          onChange={handleChange}
          placeholder="Enter weight"
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
          placeholder="Enter description"
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
          Add Dog 🐶
        </button>

      </form>

    </div>
  );
};

export default AddDog;