import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function EditService() {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); 
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await API.get(`/services/my`);
        const svc = res.data.find((s) => s._id === id);
        if (!svc) {
          setErr("Service not found or unauthorized");
        } else {
          setForm({
            title: svc.title,
            description: svc.description || "",
            price: svc.price,
            category: svc.category || "",
            city: svc.address?.city || "",
            state: svc.address?.state || "",
            pincode: svc.address?.pincode || "",
          });
        }
      } catch (err) {
        console.error(err);
        setErr("Failed to load service");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (!user || user.role !== "provider") {
    return (
      <div className="mt-6 bg-gray-800 text-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto text-center">
        Only providers can edit services.
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.title || !form.price || !form.city || !form.state || !form.pincode) {
      setErr("Please fill all required fields including address.");
      return;
    }

    try {
      setSubmitting(true);
      await API.put(`/services/${id}`, {
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

      toast.success("✅ Service updated successfully!"); 
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "❌ Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="mt-6 text-gray-400 text-center">Loading service...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg text-white mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Service</h2>
      {err && (
        <div className="bg-red-600 bg-opacity-30 text-red-100 p-3 rounded mb-4">
          {err}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          placeholder="Description"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />
          <input
            className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-2xl font-semibold disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Service"}
        </button>
      </form>
    </motion.div>
  );
}
