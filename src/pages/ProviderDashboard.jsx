import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { Briefcase, CheckCircle, Layers, Wallet, User } from "lucide-react";
import { motion } from "framer-motion";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";


export default function ProviderDashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await API.get("/bookings/provider");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const res = await API.get("/services/my");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchServices();
    }
  }, [user]);

  const accept = (id) => API.put(`/bookings/${id}/accept`).then(fetchBookings);
  const reject = (id) => API.put(`/bookings/${id}/reject`).then(fetchBookings);
  const completeBooking = (id) =>
    API.put(`/bookings/${id}/complete`).then(fetchBookings);

 
  const totalBookings = bookings.length;
  const completedServices = bookings.filter((b) => b.status === "completed").length;
  const activeBookings = bookings.filter(
    (b) => b.status === "pending" || b.status === "accepted"
  ).length;
  const earnings = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + (b.price || 0), 0);

  const statCards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
    },
    {
      title: "Completed Services",
      value: completedServices,
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    },
    {
      title: "Active Bookings",
      value: activeBookings,
      icon: <Layers className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Earnings",
      value: `₹${earnings}`,
      icon: <Wallet className="w-6 h-6 text-yellow-400" />,
    },
  ];


  const activeBookingsList = bookings.filter(
    (b) => b.status === "pending" || b.status === "accepted"
  );
  const pastBookingsList = bookings.filter(
    (b) =>
      b.status === "completed" ||
      b.status === "cancelled" ||
      b.status === "rejected"
  );

  return (
    <div className="bg-gray-900 min-h-screen p-6 space-y-10">
      {/* Profile Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center gap-6"
      >
       
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-2xl font-bold text-white">
            {user?.name || "Provider"}
          </h2>
          <p className="text-gray-300">{user?.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            Role: {user?.role || "Service Provider"}
          </p>
        </div>

       
        <ProfilePhotoUpload
          user={user}
          onUpdate={(newPhoto) =>
            localStorage.setItem(
              "user",
              JSON.stringify({ ...user, profilePhoto: newPhoto })
            )
          }
        />
      </motion.div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-extrabold text-white">Provider Dashboard</h2>
        <Link
          to="/create-service"
          className="px-5 py-2 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition"
        >
          + Create Service
        </Link>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-5 rounded-2xl shadow-lg flex items-center gap-4 transition"
          >
            <div className="bg-gray-700 p-3 rounded-full flex items-center justify-center">
              {card.icon}
            </div>
            <div>
              <p className="text-gray-400 text-sm">{card.title}</p>
              <p className="text-white font-bold text-xl">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* My Services */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-5">My Services</h3>
        {loadingServices ? (
          <p className="text-gray-400">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-400">No services created yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <motion.div
                key={s._id}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800 p-5 rounded-2xl shadow-lg flex flex-col justify-between transition"
              >
                <div>
                  <p className="font-semibold text-lg text-white">{s.title}</p>
                  <p className="text-sm text-blue-400 mt-1">
                    {s.category || "No category"}
                  </p>
                  <p className="text-gray-300 mt-2">
                    {s.description?.slice(0, 60)}...
                  </p>
                  <p className="text-white font-bold mt-3">₹{s.price}</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/edit-service/${s._id}`}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-center transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      if (window.confirm("Delete this service?")) {
                        await API.delete(`/services/${s._id}`);
                        fetchServices();
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Active Bookings */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-5">Active Bookings</h3>
        {loadingBookings ? (
          <p className="text-gray-400">Loading bookings...</p>
        ) : activeBookingsList.length === 0 ? (
          <p className="text-gray-400">No active bookings.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBookingsList.map((b) => {
              const statusColor = b.status === "pending" ? "yellow-500" : "green-500";
              return (
                <motion.div
                  key={b._id}
                  whileHover={{ scale: 1.03 }}
                  className={`bg-gray-800 p-5 rounded-2xl shadow-lg border-t-4 border-${statusColor} flex flex-col justify-between transition`}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{b.service?.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Status: <span className={`capitalize font-medium text-${statusColor}`}>{b.status}</span>
                    </p>
                    <p className="text-sm text-gray-300 mt-2">User: {b.user?.name || "N/A"}</p>
                    <p className="text-sm text-gray-300">Address: {b.address}</p>
                    {b.price && <p className="text-sm text-white font-bold mt-2">₹{b.price}</p>}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {b.status === "pending" && (
                      <>
                        <button
                          className="flex-1 px-4 py-2 bg-green-600 rounded-xl text-white hover:bg-green-700 transition"
                          onClick={() => accept(b._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="flex-1 px-4 py-2 bg-red-600 rounded-xl text-white hover:bg-red-700 transition"
                          onClick={() => reject(b._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {b.status === "accepted" && (
                      <button
                        className="flex-1 px-4 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition"
                        onClick={() => completeBooking(b._id)}
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>


      {/* Past Bookings */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-white mb-5">Past Bookings</h3>
        {loadingBookings ? (
          <p className="text-gray-400">Loading bookings...</p>
        ) : pastBookingsList.length === 0 ? (
          <p className="text-gray-400">No past bookings.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastBookingsList.map((b) => {
              let statusColor = "gray-500";
              if (b.status === "completed") statusColor = "green-500";
              else if (b.status === "cancelled" || b.status === "rejected") statusColor = "red-500";

              return (
                <motion.div
                  key={b._id}
                  whileHover={{ scale: 1.03 }}
                  className={`bg-gray-800 p-5 rounded-2xl shadow-lg border-t-4 border-${statusColor} flex flex-col justify-between transition`}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{b.service?.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Status: <span className={`capitalize font-medium text-${statusColor}`}>{b.status}</span>
                    </p>
                    <p className="text-sm text-gray-300 mt-2">User: {b.user?.name || "N/A"}</p>
                    <p className="text-sm text-gray-300">Address: {b.address}</p>
                    {b.price && <p className="text-sm text-white font-bold mt-2">₹{b.price}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>



    </div>
  );
}
