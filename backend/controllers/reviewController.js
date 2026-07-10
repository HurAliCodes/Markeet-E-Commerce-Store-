import reviewService from "../services/reviewService.js";

const createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const user = req.userId; 

    const review = await reviewService.createReview({
      product,
      user,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const result = await reviewService.getProductReviews(
      req.params.productId,
      page,
      limit
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(
      req.params.reviewId,
      req.userId,
      req.body
    );

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(
      req.params.reviewId,
      req.userId
    );

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getReviewSummary = async (req, res) => {
  try {
    const summary = await reviewService.getReviewSummary(
      req.params.productId
    );

    res.json({
      success: true,
      ...summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCanReview = async (req, res) => {
  try {
    const canReview = await reviewService.getCanReview(
      req.params.productId,
      req.userId
    );

    res.json({
      success: true,
      ...canReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getReviewSummary,
  getCanReview  
};