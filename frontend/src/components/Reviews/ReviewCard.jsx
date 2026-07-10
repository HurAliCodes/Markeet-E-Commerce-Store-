import Ratings from "./Ratings";

const ReviewCard = ({
  review,
  currentUserId,
  onEdit,
  onDelete,
}) => {
  const isOwner = currentUserId === review.user?._id;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-gray-900">
            {review.user?.name || "Anonymous"}
          </h4>

          <p className="mt-1 text-xs text-gray-500">
            {formatDate(review.createdAt)}
          </p>
        </div>

        <Ratings
          rating={review.rating}
          size={18}
          showNumber
        />
      </div>

      <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-600">
        {review.comment}
      </p>

      {isOwner && (
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => onEdit(review)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(review)}
            className="text-sm font-medium text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;