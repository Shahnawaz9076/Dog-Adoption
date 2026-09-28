
import React, { useEffect, useState } from "react";
import "../css/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [dogs, setDogs] = useState([]);
  const [adoptions, setAdoptions] = useState([]);


  // =========================
  // FETCH DOGS
  // =========================

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


  // =========================
  // FETCH ADOPTION REQUESTS
  // =========================

  useEffect(() => {

    const fetchAdoptions = async () => {

      try {

        const response = await api.get(
          "/api/adoptions/getAll"
        );

        console.log(
          "Adoption Requests:",
          response.data
        );

        setAdoptions(response.data);

      } catch (error) {

        console.error(
          "Error fetching adoption requests:",
          error
        );

      }

    };

    fetchAdoptions();

  }, []);


  // =========================
  // DOG STATISTICS
  // =========================

  const availableDogs = dogs.filter(
    (dog) => dog.status === "Available"
  ).length;


  const adoptedDogs = dogs.filter(
    (dog) => dog.status === "Adopted"
  ).length;


  // =========================
  // ADOPTION STATISTICS
  // =========================

  const totalRequests = adoptions.length;


  const pendingRequests = adoptions.filter(
    (adoption) => adoption.status === "Pending"
  ).length;


  const approvedRequests = adoptions.filter(
    (adoption) => adoption.status === "Approved"
  ).length;


  const rejectedRequests = adoptions.filter(
    (adoption) => adoption.status === "Rejected"
  ).length;


  // =========================
  // NAVIGATION
  // =========================

  const openRequests = (status) => {

    if (status === "All") {

      navigate("/adoption-requests");

    } else {

      navigate(
        `/adoption-requests?status=${status}`
      );

    }

  };


  return (

    <div className="admin-dashboard">


      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">

        <h1 className="dashboard-title">
          Admin Dashboard 🐶
        </h1>

        <p className="dashboard-subtitle">
          Welcome to the Dog Adoption Admin Panel
        </p>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="stats-grid">


        {/* Total Dogs */}

        <div className="stat-card">

          <div className="stat-icon">
            🐶
          </div>

          <div>

            <h2>
              Total Dogs
            </h2>

            <h1>
              {dogs.length}
            </h1>

          </div>

        </div>


        {/* Available Dogs */}

        <div className="stat-card">

          <div className="stat-icon">
            🟢
          </div>

          <div>

            <h2>
              Available Dogs
            </h2>

            <h1>
              {availableDogs}
            </h1>

          </div>

        </div>


        {/* Adopted Dogs */}

        <div className="stat-card">

          <div className="stat-icon">
            ❤️
          </div>

          <div>

            <h2>
              Adopted Dogs
            </h2>

            <h1>
              {adoptedDogs}
            </h1>

          </div>

        </div>


        {/* =========================
            TOTAL REQUESTS
        ========================= */}

        <div
          className="stat-card clickable-card"
          onClick={() =>
            openRequests("All")
          }
        >

          <div className="stat-icon">
            📋
          </div>

          <div>

            <h2>
              Adoption Requests
            </h2>

            <h1>
              {totalRequests}
            </h1>

          </div>

        </div>


        {/* =========================
            PENDING REQUESTS
        ========================= */}

        <div
          className="stat-card clickable-card"
          onClick={() =>
            openRequests("Pending")
          }
        >

          <div className="stat-icon">
            🟡
          </div>

          <div>

            <h2>
              Pending Requests
            </h2>

            <h1>
              {pendingRequests}
            </h1>

          </div>

        </div>


        {/* =========================
            APPROVED REQUESTS
        ========================= */}

        <div
          className="stat-card clickable-card"
          onClick={() =>
            openRequests("Approved")
          }
        >

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <h2>
              Approved Requests
            </h2>

            <h1>
              {approvedRequests}
            </h1>

          </div>

        </div>


        {/* =========================
            REJECTED REQUESTS
        ========================= */}

        <div
          className="stat-card clickable-card"
          onClick={() =>
            openRequests("Rejected")
          }
        >

          <div className="stat-icon">
            ❌
          </div>

          <div>

            <h2>
              Rejected Requests
            </h2>

            <h1>
              {rejectedRequests}
            </h1>

          </div>

        </div>

      </div>


      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div className="quick-actions">

        <h2>
          Quick Actions
        </h2>


        <div className="action-buttons">


          {/* Add Dog */}

          <button
            onClick={() =>
              navigate("/add-dog")
            }
          >
            🐶 Add Dog
          </button>


          {/* Manage Dogs */}

          <button
            onClick={() =>
              navigate("/manage-dogs")
            }
          >
            🐾 Manage Dogs
          </button>


          {/* Adoption Requests */}

          <button
            onClick={() =>
              navigate("/adoption-requests")
            }
          >
            📋 Adoption Requests
          </button>


        </div>

      </div>


    </div>

  );

};

export default AdminDashboard;
