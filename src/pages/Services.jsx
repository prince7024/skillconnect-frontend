import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import ServiceCard from "../components/ServiceCard";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);


  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await API.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const res = await API.get(`/services/search?q=${encodeURIComponent(query)}`);
      setServices(res.data);
    } catch (err) {
      console.error("Error searching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          {user && (
            <span className="text-sm text-gray-200 bg-gray-800 px-3 py-1 rounded-full shadow-sm">
              Logged in as <span className="font-semibold">{user.name}</span>
            </span>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-800 rounded-2xl h-56 shadow-md"
              />
            ))}
          </div>
        ) : services.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {services.map((s) => (
              <ServiceCard key={s._id} service={s} onBooked={fetchAll} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center text-center py-24 bg-gray-900 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SearchX className="w-14 h-14 text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-white">
              No services found
            </h3>
            <p className="text-gray-400 mt-2 max-w-md">
              Try adjusting your search query.
            </p>
            <button
              onClick={fetchAll}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Reset Search
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
