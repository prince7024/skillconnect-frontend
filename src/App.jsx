import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import CreateService from "./pages/CreateService";
import UserDashboard from "./pages/UserDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import EditService from "./pages/EditService";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "sonner";

export default function App() {

   const { user } = useContext(AuthContext);

  return (
    <div>
      <Toaster position="top-right" /> 
      <Navbar />
      <div className="container mx-auto p-4 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route
            path="/dashboard"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === "provider" ? (
                <ProviderDashboard />
              ) : (
                <UserDashboard />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-service/:id" element={<EditService />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
