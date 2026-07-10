import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import Ratings from "./Ratings";

const ProductRating = ({ productId, size = 18 }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchRating = async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.get(`/api/review/${productId}/summary`);

      setAverageRating(data.averageRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch (error) {
      console.error(error);

      setAverageRating(0);
      setTotalReviews(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchRating();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Ratings
        rating={averageRating}
        size={size}
      />

      <span className="text-sm text-gray-500">
        {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
      </span>

      <span className="text-sm text-gray-400">
        ({totalReviews} {totalReviews === 1 ? "Review" : "Reviews"})
      </span>
    </div>
  );
};

export default ProductRating;