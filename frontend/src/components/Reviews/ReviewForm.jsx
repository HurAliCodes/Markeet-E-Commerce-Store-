import { useEffect, useState } from "react";
import { Star, Pencil, Trash2 } from "lucide-react";
import apiClient from "../../utils/apiClient";

const ReviewForm = ({
  productId,
  review = null,
  onSuccess,
}) => {
  const [editing, setEditing] = useState(!review);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
      setEditing(false);
    } else {
      setRating(5);
      setComment("");
      setEditing(true);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return alert("Please enter a review.");
    }

    try {
      setLoading(true);

      if (review) {
        await apiClient.put(`/api/review/${review._id}`, {
          rating,
          comment,
        });
      } else {
        await apiClient.post("/api/review", {
          product: productId,
          rating,
          comment,
        });
      }

      onSuccess?.();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your review?")) return;

    try {
      await apiClient.delete(`/api/review/${review._id}`);

      onSuccess?.();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  if (review && !editing) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Your Review
            </h3>

            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  size={22}
                  className={
                    value <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="mt-4 whitespace-pre-wrap text-gray-600">
              {review.comment}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg border p-2 hover:bg-gray-100"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={handleDelete}
              className="rounded-lg border p-2 text-red-500 hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-6"
    >
      <h3 className="mb-5 text-lg font-semibold">
        {review ? "Edit Your Review" : "Write a Review"}
      </h3>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Rating
        </label>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              size={30}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(value)}
              className={`cursor-pointer transition ${
                value <= (hoverRating || rating)
                  ? "fill-yellow-400 text-yellow-400 scale-110"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Review
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : review
            ? "Update Review"
            : "Submit Review"}
        </button>

        {review && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setRating(review.rating);
              setComment(review.comment);
            }}
            className="rounded-lg border border-gray-300 px-6 py-3"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;