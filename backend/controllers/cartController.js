import {
  addProductToCart,
  updateUserCart,
  getCartByUserId,
} from "../services/cartService.js";

const addToCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.userId || req.body.userId;

    if (!userId || !productId || !size) {
      return res.status(400).json({
        success: false,
        message: "userId, productId and size are required",
      });
    }

    const cartData = await addProductToCart(userId, productId, size);

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cartData,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to add product to cart",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.userId || req.body.userId;

    if (!userId || !productId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "userId, productId, size and quantity are required",
      });
    }

    const parsedQuantity = Number(quantity);

    if (Number.isNaN(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a valid number greater than or equal to 0",
      });
    }

    const cartData = await updateUserCart(
      userId,
      productId,
      size,
      parsedQuantity
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartData,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update cart",
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const cartData = await getCartByUserId(userId);

    return res.status(200).json({
      success: true,
      message: "User cart fetched successfully",
      cartData,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error fetching user cart",
    });
  }
};

export { addToCart, updateCart, getUserCart };