import express from "express";
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getReviewSummary,
  getCanReview
} from "../controllers/reviewController.js";

import authUser from "../middlewares/auth.js";

const router = express.Router();

router.get("/:productId", getProductReviews);

router.get("/:productId/summary", getReviewSummary);

router.get("/:productId", getProductReviews);

router.get("/:productId/me", authUser, getCanReview);

router.post("/", authUser, createReview);

router.put("/:reviewId", authUser, updateReview);

router.delete("/:reviewId", authUser, deleteReview);

export default router;