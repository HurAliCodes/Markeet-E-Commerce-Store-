import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Loader2, X } from "lucide-react";

import apiClient from "../../utils/apiClient";
import ReviewCard from "./ReviewCard";

const LIMIT = 10;

const ReviewDialog = ({
  open,
  onClose,
  productId,
  currentUserId,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.get(
        `/api/review/${productId}?page=1&limit=${LIMIT}`
      );

      setReviews(data.reviews || []);
      setPagination(data.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!pagination?.hasNext) return;

    try {
      setLoadingMore(true);

      const nextPage = pagination.page + 1;

      const { data } = await apiClient.get(
        `/api/review/${productId}?page=${nextPage}&limit=${LIMIT}`
      );

      setReviews((prev) => [...prev, ...data.reviews]);

      setPagination(data.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchReviews();
    }
  }, [open, productId]);

  const handleDeleteReview = async (review) => {
    await onDelete(review);

    fetchReviews();

    onRefresh?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="flex h-[85vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-xl">

          {/* Header */}

          <div className="flex items-center justify-between border-b px-6 py-4">
            <DialogTitle className="text-xl font-semibold">
              Customer Reviews
            </DialogTitle>

            <button
              onClick={onClose}
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body */}

          <div className="flex-1 overflow-y-auto p-6">

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2
                  className="animate-spin"
                  size={32}
                />
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                No reviews yet.
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      currentUserId={currentUserId}
                      onEdit={onEdit}
                      onDelete={handleDeleteReview}
                    />
                  ))}
                </div>

                {pagination?.hasNext && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="rounded-lg border px-6 py-3 transition hover:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {loadingMore
                        ? "Loading..."
                        : "Load More Reviews"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReviewDialog;