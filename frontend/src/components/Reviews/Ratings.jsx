import { Star } from "lucide-react";

const Ratings = ({
  rating = 0,
  size = 18,
  showNumber = false,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill =
            rating >= star
              ? 100
              : rating >= star - 0.5
              ? 50
              : 0;

          return (
            <div key={star} className="relative">
              {/* Empty Star */}
              <Star
                size={size}
                className="text-gray-300"
                strokeWidth={1.8}
              />

              {/* Filled Star */}
              {fill > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill}%` }}
                >
                  <Star
                    size={size}
                    className="fill-amber-400 text-amber-400"
                    strokeWidth={1.8}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showNumber && (
        <span className="text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Ratings;