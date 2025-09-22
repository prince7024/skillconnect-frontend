import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner"; 

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      setAuth(res.data.user, res.data.token);
      toast.success("Registration successful!"); 
      navigate("/services");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account ✨
        </h2>

        <form onSubmit={handle} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-gray-800 text-white pl-10 pr-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-800 text-white pl-10 pr-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>

          {/* Role */}
          <select
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:scale-[1.02] transition transform disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
