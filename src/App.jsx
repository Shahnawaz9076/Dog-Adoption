import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

// =========================
// PAGES
// =========================

import Home from "./pages/Home";
import Dogs from "./pages/Dogs";
import DogDetails from "./pages/DogDetails";
import AdoptionForm from "./pages/AdoptionForm";
import AdoptionRequests from "./pages/AdoptionRequests";
import AddDog from "./pages/AddDog";
import ManageDogs from "./pages/ManageDogs";
import EditDog from "./pages/EditDog";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

// =========================
// COMPONENTS
// =========================

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";


// =========================
// LAYOUT
// =========================

const Layout = () => {

  const location = useLocation();

  // Login aur Register page par Navbar nahi dikhana
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {/* =========================
          GLOBAL NAVBAR
      ========================= */}

      {!hideNavbar && <Navbar />}


      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================
            USER + ADMIN ROUTES
        ========================= */}

        {/* DOGS */}

        <Route
          path="/dogs"
          element={
            <ProtectedRoute
              allowedRoles={["USER", "ADMIN"]}
            >
              <Dogs />
            </ProtectedRoute>
          }
        />


        {/* DOG DETAILS */}

        <Route
          path="/dogs/:id"
          element={
            <ProtectedRoute
              allowedRoles={["USER", "ADMIN"]}
            >
              <DogDetails />
            </ProtectedRoute>
          }
        />


        {/* ADOPTION FORM */}

        <Route
          path="/adopt"
          element={
            <ProtectedRoute
              allowedRoles={["USER", "ADMIN"]}
            >
              <AdoptionForm />
            </ProtectedRoute>
          }
        />


        {/* =========================
            ADOPTION REQUESTS
            USER + ADMIN
        ========================= */}

        <Route
          path="/adoption-requests"
          element={
            <ProtectedRoute
              allowedRoles={["USER", "ADMIN"]}
            >
              <AdoptionRequests />
            </ProtectedRoute>
          }
        />


        {/* =========================
            ADMIN ONLY ROUTES
        ========================= */}

        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* ADD DOG */}

        <Route
          path="/add-dog"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <AddDog />
            </ProtectedRoute>
          }
        />


        {/* MANAGE DOGS */}

        <Route
          path="/manage-dogs"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <ManageDogs />
            </ProtectedRoute>
          }
        />


        {/* EDIT DOG */}

        <Route
          path="/edit-dog/:id"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <EditDog />
            </ProtectedRoute>
          }
        />

      </Routes>

    </>
  );
};


// =========================
// MAIN APP
// =========================

function App() {

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

}

export default App;