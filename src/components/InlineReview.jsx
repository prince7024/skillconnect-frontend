import React, { useState } from "react";
import API from "../api";
import { Star } from "lucide-react";
import { toast } from "sonner"; 

export default function InlineReview({ booking, onReviewed }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (rating === 0) {
      toast.error("Please select a rating ⭐"); 
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/reviews", {
        bookingId: booking._id,
        rating,
        comment,
      });

      toast.success("Thanks for your review! 🎉"); 
      booking.reviewed = true;
      booking.rating = rating;
      booking.comment = comment;

      onReviewed();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit review ❌"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      {/* Star Rating */}
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`w-5 h-5 cursor-pointer ${
              n <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-500"
            } transition`}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(n)}
          />
        ))}
      </div>

      {/* Optional Comment */}
      <textarea
        placeholder="Leave a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 mb-2"
        rows={2}
      />

      {/* Submit Button */}
      <button
        onClick={submitReview}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
