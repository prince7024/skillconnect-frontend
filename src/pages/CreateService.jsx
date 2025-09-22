import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner"; 

export default function CreateService() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [err, setErr] = useState("");

  if (!user || user.role !== "provider") {
    return (
      <div className="mt-6 bg-gray-800 text-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
        Only providers can create services.
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.city || !form.state || !form.pincode) {
      setErr("Please fill in all address fields.");
      return;
    }

    try {
      await API.post("/services", {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        address: {
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
      });

      toast.success("✅ Service created successfully!");
      navigate("/services");
    } catch (err) {
      toast.error(err?.response?.data?.message || "❌ Failed to create service"); 
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-lg text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">Create New Service</h2>

        {err && (
          <div className="bg-red-600 bg-opacity-30 text-red-100 p-3 rounded mb-4">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            rows={4}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-2xl font-semibold"
          >
            Create Service
          </button>
        </form>
      </motion.div>
    </div>
  );
}
