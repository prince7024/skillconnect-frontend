import React, { useContext, useState } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner"; 

export default function ServiceCard({ service, onBooked }) {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // Open modal for booking
  const book = () => {
    if (!user) {
      toast.error("Please login to book 🔑");
      return;
    }
    if (user.role !== "user") {
      toast.warning("Only users can book services ⚠️");
      return;
    }
    setShowModal(true);
  };

  // Confirm booking
  const confirmBooking = async () => {
    if (!address.trim()) {
      toast.error("Address is required 🏠");
      return;
    }
    try {
      setBookingLoading(true);
      await API.post("/bookings", { serviceId: service._id, address });

      toast.success("Booking created! Provider will respond soon ");

      setShowModal(false);
      setAddress("");
      if (onBooked) onBooked();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed ❌");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-5 rounded-2xl shadow-lg flex flex-col justify-between text-white"
    >
      <div>
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <span className="text-sm text-blue-400 font-medium">
          {service.category}
        </span>
        <p className="mt-2 text-gray-300">{service.description}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="space-y-1">
          <p className="font-bold text-lg">₹{service.price}</p>
          <p className="text-sm text-gray-400">
            By: {service.provider?.name || "Provider"}
          </p>
          {service.address && (
            <p className="text-sm text-gray-400">
              {service.address.city}, {service.address.state},{" "}
              {service.address.pincode}
            </p>
          )}
          <p className="text-sm text-gray-400">
            Rating:{" "}
            {service.avgRating == null
              ? "No rating"
              : Number(service.avgRating).toFixed(1)}
          </p>
        </div>
        {user?.role === "user" && (
          <button
            onClick={book}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Book
          </button>
        )}
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-gray-800 p-6 rounded-2xl w-full max-w-md text-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Enter your address</h3>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              placeholder="Your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
