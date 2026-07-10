import mongoose from "mongoose";
import reviewModel from "../models/reviewModel.js";
import orderModel from "../models/orderModel.js";

const createReview = async ({ product, user, rating, comment }) => {
  const hasPurchased = await orderModel.exists({
    userId: user,
    status: "Order Delivered",
    "items.productId": product,
  });

  if (!hasPurchased) {
    throw new Error(
      "You can only review products that have been delivered to you."
    );
  }

  const existingReview = await reviewModel.findOne({
    product,
    user,
  });

  if (existingReview) {
    throw new Error("You have already reviewed this product.");
  }

  const review = await reviewModel.create({
    product,
    user,
    rating,
    comment,
  });

  return review;
};

const getProductReviews = async (
  productId,
  page = 1,
  limit = 10
) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    reviewModel
      .find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    reviewModel.countDocuments({
      product: productId,
    }),
  ]);

  return {
    reviews,

    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
    },
  };
};

const updateReview = async (reviewId, userId, data) => {
  const review = await reviewModel.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized");
  }

  if (data.rating !== undefined) review.rating = data.rating;
  if (data.comment !== undefined) review.comment = data.comment;

  await review.save();

  return review;
};

const deleteReview = async (reviewId, userId) => {
  const review = await reviewModel.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized");
  }

  await review.deleteOne();
};

const getReviewSummary = async (productId) => {
  const stats = await reviewModel.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: {
          $avg: "$rating",
        },
        totalReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  return {
    averageRating: stats[0]?.averageRating || 0,
    totalReviews: stats[0]?.totalReviews || 0,
  };
};

const getCanReview = async (productId, userId) => {
  const hasPurchased = await orderModel.exists({
    userId,
    status: "Order Delivered",
    "items.productId": productId,
  });

  if (!hasPurchased) {
    return {
      canReview: false,
      hasReviewed: false,
      review: null,
    };
  }

  // Check if user already reviewed
  const review = await reviewModel
    .findOne({
      product: productId,
      user: userId,
    })
    .populate("user", "name");

  return {
    canReview: true,
    hasReviewed: !!review,
    review,
  };
};

export default {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getReviewSummary,
  getCanReview
};