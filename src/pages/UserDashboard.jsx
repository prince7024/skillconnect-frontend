import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import InlineReview from "../components/InlineReview";
import { motion } from "framer-motion";
import { ClipboardList, CheckCircle2, Clock, Mail } from "lucide-react";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await API.get("/bookings/user");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const cancel = (id) => API.put(`/bookings/${id}/cancel`).then(fetchBookings);

  const now = new Date();
  const ACTIVE_BOOKING_THRESHOLD_HOURS = 24;

  const activeBookings = bookings.filter((b) => {
    if (b.status === "pending" || b.status === "ongoing") return true;
    if (b.status === "completed" && !b.reviewed) {
      const completedAt = new Date(b.updatedAt || b.completedAt);
      return (now - completedAt) / (1000 * 60 * 60) <= ACTIVE_BOOKING_THRESHOLD_HOURS;
    }
    return false;
  });

  const pastBookings = bookings.filter((b) => {
    if (b.status === "cancelled") return true;
    if (b.status === "completed" && b.reviewed) return true;
    if (b.status === "completed" && !b.reviewed) {
      const completedAt = new Date(b.updatedAt || b.completedAt);
      return (now - completedAt) / (1000 * 60 * 60) > ACTIVE_BOOKING_THRESHOLD_HOURS;
    }
    return false;
  });

  const totalBookings = bookings.length;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen p-6 space-y-12">

      {/* User Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-6 border border-gray-700"
      >
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{user?.name || "User"}</h2>
          <p className="text-gray-400 flex items-center gap-2 mt-1 justify-center sm:justify-start">
            <Mail className="w-5 h-5 text-gray-400" /> {user?.email}
          </p>
          <p className="text-sm text-gray-400 mt-1">Role: User</p>
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

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "Total Bookings", value: totalBookings, icon: <ClipboardList className="w-6 h-6 text-blue-400" />, color: "blue" },
          { title: "Active Bookings", value: activeBookings.length, icon: <Clock className="w-6 h-6 text-green-400" />, color: "green" },
          { title: "Past Bookings", value: pastBookings.length, icon: <CheckCircle2 className="w-6 h-6 text-purple-400" />, color: "purple" }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-700 transition"
          >
            <div className={`bg-${stat.color}-600/20 p-3 rounded-full flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-white font-bold text-2xl">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Bookings */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Active Bookings</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : activeBookings.length === 0 ? (
          <p className="text-gray-400">No active bookings.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBookings.map((b) => {
              let statusColor = b.status === "pending" ? "white" : "green-500";
              if (b.status === "completed" && !b.reviewed) statusColor = "yellow-400";

              return (
                <motion.div
                  key={b._id}
                  whileHover={{ scale: 1.03 }}
                  className={`bg-gray-800/50 backdrop-blur-md p-5 rounded-2xl shadow-xl border-l-4 border-${statusColor} flex flex-col justify-between transition`}
                >
                  <div>
                    <p className="text-lg font-semibold text-white">{b.service?.title}</p>
                    <p className={`text-sm mt-1 font-medium text-${statusColor} capitalize`}>
                      Status: {b.status}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">Provider: {b.provider?.name || "N/A"}</p>
                    <p className="text-gray-300 text-sm mt-1">Address: {b.address}</p>
                    {b.price && <p className="text-white font-bold mt-2">₹{b.price}</p>}
                  </div>

                  {b.status === "pending" && (
                    <button
                      onClick={() => cancel(b._id)}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  )}

                  {b.status === "completed" && !b.reviewed && (
                    <InlineReview booking={b} onReviewed={fetchBookings} />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Past Bookings */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Past Bookings</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : pastBookings.length === 0 ? (
          <p className="text-gray-400">No past bookings.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastBookings.map((b) => {
              let statusColor = "gray-500";
              if (b.status === "completed") statusColor = "green-500";
              else if (b.status === "cancelled") statusColor = "white";

              return (
                <motion.div
                  key={b._id}
                  whileHover={{ scale: 1.03 }}
                  className={`bg-gray-800/50 backdrop-blur-md p-5 rounded-2xl shadow-xl border-l-4 border-${statusColor} flex flex-col justify-between transition`}
                >
                  <div>
                    <p className="text-lg font-semibold text-white">{b.service?.title}</p>
                    <p className={`text-sm mt-1 font-medium text-${statusColor} capitalize`}>
                      Status: {b.status}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">Provider: {b.provider?.name || "N/A"}</p>
                    <p className="text-gray-300 text-sm mt-1">Address: {b.address}</p>
                    {b.price && <p className="text-white font-bold mt-2">₹{b.price}</p>}
                  </div>

                  {b.reviewed && (
                    <div className="mt-2 text-sm text-gray-300">
                      <span className="font-medium">Reviewed</span> ✅ {b.rating}{" "}
                      {b.comment && `- "${b.comment}"`}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
