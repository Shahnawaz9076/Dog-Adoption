import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageDogs = () => {

  const navigate = useNavigate();

  const [dogs, setDogs] = useState([]);

  // Search state
  const [search, setSearch] = useState("");

  // Filter state
  const [statusFilter, setStatusFilter] = useState("All");


  // Fetch Dogs
  useEffect(() => {

    const fetchDogs = async () => {

      try {

        const response = await axios.get(
          "http://localhost:8080/api/dogs/getAll"
        );

        setDogs(response.data);

      } catch (error) {

        console.error("Error fetching dogs:", error);

      }

    };

    fetchDogs();

  }, []);


  // Delete Dog
  const deleteDog = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this dog?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/dogs/delete/${id}`
      );

      alert("Dog deleted successfully! 🐶");

      setDogs(
        dogs.filter((dog) => dog.id !== id)
      );

    } catch (error) {

      console.error("Error deleting dog:", error);

      alert("Unable to delete dog.");

    }

  };


  // Search + Filter
  const filteredDogs = dogs.filter((dog) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      dog.name.toLowerCase().includes(searchText) ||
      dog.breed.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      dog.status === statusFilter;

    return matchesSearch && matchesStatus;

  });


  return (

    <div>

      <h1>Manage Dogs 🐶</h1>


      {/* Search and Filter */}

      <div>

        <input
          type="text"
          placeholder="🔍 Search by name or breed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >

          <option value="All">
            All
          </option>

          <option value="Available">
            Available
          </option>

          <option value="Adopted">
            Adopted
          </option>

        </select>

      </div>


      {/* Dogs */}

      {filteredDogs.length === 0 ? (

        <p>
          No dogs found 🐶
        </p>

      ) : (

        filteredDogs.map((dog) => (

          <div key={dog.id}>

            <h2>
              {dog.name}
            </h2>

            <p>
              Breed: {dog.breed}
            </p>

            <p>
              Age: {dog.age} Years
            </p>

            <p>
              Gender: {dog.gender}
            </p>

            <p>
              Status: {dog.status}
            </p>


            {/* Edit */}

            <button
              onClick={() =>
                navigate(`/edit-dog/${dog.id}`)
              }
            >
              ✏️ Edit
            </button>


            {/* Delete */}

            <button
              onClick={() =>
                deleteDog(dog.id)
              }
            >
              🗑️ Delete
            </button>


            <hr />

          </div>

        ))

      )}

    </div>

  );

};

export default ManageDogs;