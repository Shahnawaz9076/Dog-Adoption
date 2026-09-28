import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../css/AdoptionRequests.css";
import api from "../axiosConfig";

const AdoptionRequests = () => {

  const [requests, setRequests] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [searchParams] = useSearchParams();


  // =========================
  // LOGGED-IN USER
  // =========================

  let user = null;

  try {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      user = JSON.parse(storedUser);
    }

  } catch (error) {

    console.error(
      "Invalid user data:",
      error
    );

  }


  // =========================
  // GET ROLE
  // =========================

  const role =
    localStorage.getItem("role");

  const isAdmin =
    role === "ADMIN";


  // =========================
  // FETCH REQUESTS
  // =========================

  const fetchRequests = async () => {

    try {

      let response;


      // =========================
      // ADMIN
      // =========================

      if (isAdmin) {

        console.log(
          "ADMIN: Fetching all adoption requests"
        );

        response = await api.get(
          "/api/adoptions/getAll"
        );

      }


      // =========================
      // USER
      // =========================

      else if (user?.email) {

        console.log(
          "USER: Fetching own adoption requests"
        );

        console.log(
          "User Email:",
          user.email
        );

        response = await api.get(
          `/api/adoptions/my/${encodeURIComponent(
            user.email
          )}`
        );

      }


      // =========================
      // NO USER
      // =========================

      else {

        console.log(
          "No logged-in user found."
        );

        setRequests([]);

        return;

      }


      console.log(
        "Adoption Requests:",
        response.data
      );


      setRequests(
        response.data || []
      );

    } catch (error) {

      console.error(
        "Error fetching adoption requests:",
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

      setRequests([]);

    }

  };


  // =========================
  // LOAD REQUESTS
  // =========================

  useEffect(() => {

    fetchRequests();

  }, []);


  // =========================
  // READ STATUS FROM URL
  // =========================

  useEffect(() => {

    const statusFromUrl =
      searchParams.get("status");


    if (
      statusFromUrl === "Pending" ||
      statusFromUrl === "Approved" ||
      statusFromUrl === "Rejected"
    ) {

      setStatusFilter(
        statusFromUrl
      );

    } else {

      setStatusFilter("All");

    }

  }, [searchParams]);


  // =========================
  // UPDATE STATUS
  // ADMIN ONLY
  // =========================

  const updateStatus = async (
    id,
    status
  ) => {

    if (!isAdmin) {

      alert(
        "Only admin can update adoption status."
      );

      return;

    }


    try {

      const response =
        await api.put(
          `/api/adoptions/update-status/${id}`,
          null,
          {
            params: {
              status: status
            }
          }
        );


      console.log(
        "Updated Request:",
        response.data
      );


      alert(
        `Request ${status} successfully!`
      );


      fetchRequests();

    } catch (error) {

      console.error(
        "Error updating status:",
        error
      );


      if (error.response) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Server Response:",
          error.response.data
        );

      }


      alert(
        "Unable to update status."
      );

    }

  };


  // =========================
  // SEARCH + STATUS FILTER
  // =========================

  const filteredRequests =
    requests.filter((request) => {

      const searchText =
        search.toLowerCase().trim();


      const matchesSearch =

        request.name
          ?.toLowerCase()
          .includes(searchText)

        ||

        request.email
          ?.toLowerCase()
          .includes(searchText)

        ||

        request.dogName
          ?.toLowerCase()
          .includes(searchText)

        ||

        request.city
          ?.toLowerCase()
          .includes(searchText);


      const matchesStatus =

        statusFilter === "All"

        ||

        request.status ===
        statusFilter;


      return (
        matchesSearch &&
        matchesStatus
      );

    });


  // =========================
  // PAGE TITLE
  // =========================

  const pageTitle =
    isAdmin
      ? "Adoption Requests 🐾"
      : "My Adoption Requests 🐾";


  const pageSubtitle =
    isAdmin
      ? "Manage and review all adoption applications."
      : "Track the status of your adoption applications.";


  // =========================
  // UI
  // =========================

  return (

    <div className="requests-page">

      <div className="requests-container">


        {/* =========================
            HEADER
        ========================= */}

        <h1>
          {pageTitle}
        </h1>


        <p className="requests-subtitle">
          {pageSubtitle}
        </p>


        {/* =========================
            FILTERS
        ========================= */}

        <div className="request-filters">


          {/* SEARCH */}

          <input
            type="text"
            placeholder={
              isAdmin
                ? "🔍 Search applicant, dog, email or city..."
                : "🔍 Search your dog, email or city..."
            }
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />


          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Requests
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>


        {/* =========================
            REQUEST COUNT
        ========================= */}

        <p>

          Showing{" "}

          <strong>
            {filteredRequests.length}
          </strong>{" "}

          request(s)

        </p>


        {/* =========================
            NO REQUESTS
        ========================= */}

        {filteredRequests.length === 0 ? (

          <div className="no-requests">

            <h2>
              No adoption requests found.
            </h2>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        ) : (


          /* =========================
             TABLE
          ========================= */

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Dog</th>

                  <th>Applicant</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>City</th>

                  <th>Status</th>

                  {isAdmin && (
                    <th>Action</th>
                  )}

                </tr>

              </thead>


              <tbody>

                {filteredRequests.map(
                  (request) => (

                    <tr
                      key={request.id}
                    >


                      {/* ID */}

                      <td>
                        {request.id}
                      </td>


                      {/* DOG */}

                      <td>

                        <strong>
                          {request.dogName}
                        </strong>

                      </td>


                      {/* APPLICANT */}

                      <td>
                        {request.name}
                      </td>


                      {/* EMAIL */}

                      <td>
                        {request.email}
                      </td>


                      {/* PHONE */}

                      <td>
                        {request.phone}
                      </td>


                      {/* CITY */}

                      <td>
                        {request.city}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            `status ${
                              request.status
                                ?.toLowerCase()
                            }`
                          }
                        >

                          {request.status}

                        </span>

                      </td>


                      {/* =========================
                          ADMIN ACTION
                      ========================= */}

                      {isAdmin && (

                        <td>

                          {request.status ===
                          "Pending" ? (

                            <div className="action-buttons">


                              {/* APPROVE */}

                              <button
                                className="approve-btn"
                                onClick={() =>
                                  updateStatus(
                                    request.id,
                                    "Approved"
                                  )
                                }
                              >

                                ✅ Approve

                              </button>


                              {/* REJECT */}

                              <button
                                className="reject-btn"
                                onClick={() =>
                                  updateStatus(
                                    request.id,
                                    "Rejected"
                                  )
                                }
                              >

                                ❌ Reject

                              </button>


                            </div>

                          ) : (

                            <span>
                              —
                            </span>

                          )}

                        </td>

                      )}

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

};

export default AdoptionRequests;


