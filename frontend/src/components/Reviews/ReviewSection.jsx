import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import apiClient from "../../utils/apiClient";

import Ratings from "./Ratings";
import ReviewCard from "./ReviewCard";
import ReviewDialog from "./ReviewDialog";
import ReviewForm from "./ReviewForm";

const ReviewSection = ({ productId, description }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [canReview, setCanReview] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  const fetchReviewSummary = async () => {
    try {
      const { data } = await apiClient.get(
        `/api/review/${productId}/summary`
      );

      setAverageRating(data.averageRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.get(
        `/api/review/${productId}?page=1&limit=3`
      );

      setReviews(data.reviews || []);
      setPagination(data.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyReview = async () => {
    try {
      const { data } = await apiClient.get(
        `/api/review/${productId}/me`
      );

      console.log(data);

      setCanReview(data.canReview);
      setHasReviewed(data.hasReviewed);
      setUserReview(data.review);
    } catch (err) {
      console.log(err);
    }
  };

  const refreshReviews = async () => {
    await Promise.all([
      fetchReviewSummary(),
      fetchReviews(),
      fetchMyReview(),
    ]);
  };

  useEffect(() => {
    if (!productId) return;
    refreshReviews();
  }, [productId]);

  const handleDelete = async (review) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await apiClient.delete(`/api/review/${review._id}`);
      setUserReview(null);
      refreshReviews();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (review) => {
    setUserReview(review);
  };

  return (
    <div className="mt-12">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-5 py-3 text-sm ${
            activeTab === "description"
              ? "border-b-2 border-black"
              : ""
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-5 py-3 text-sm ${
            activeTab === "reviews"
              ? "border-b-2 border-black"
              : ""
          }`}
        >
          Reviews ({totalReviews})
        </button>
      </div>

      {activeTab === "description" ? (
        <div className="py-6 text-gray-600">
          <p>{description}</p>
        </div>
      ) : (
        <div className="py-6">
          <div className="mb-8">
            <Ratings
              rating={averageRating}
              size={22}
              showNumber
            />

            <p className="mt-2 text-sm text-gray-500">
              Based on {totalReviews}{" "}
              {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

         {canReview ? (
            <div className="mb-8">
              <ReviewForm
                productId={productId}
                review={userReview}
                onSuccess={refreshReviews}
                onCancel={() => setUserReview(userReview)}
              />
            </div>
          ) : (
            <div className="mb-8 rounded-xl border border-dashed py-12 text-center text-gray-500">
              Buy this product to leave a review.
            </div>
          )}
   
         {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed py-12 text-center">
            <h3 className="text-lg font-semibold">
              No Reviews Yet
            </h3>

            <p className="mt-2 text-gray-500">
              Be the first to share your experience.
            </p>
          </div>
          ) : (
            <>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    currentUserId={currentUserId}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>

              {pagination?.total > 3 && (
                <button
                  onClick={() => setDialogOpen(true)}
                  className="mt-6 flex items-center gap-2 text-sm font-medium hover:text-shop_light_green"
                >
                  View All Reviews
                  <ChevronDown size={18} />
                </button>
              )}
            </>
          )}
        </div>
      )}

      <ReviewDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        productId={productId}
        currentUserId={currentUserId}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onRefresh={refreshReviews}
      />
    </div>
  );
};

export default ReviewSection;