import userModel from "../models/userModel.js";

const getUserById = async (userId) => {
  const user = await userModel.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const addProductToCart = async (userId, productId, size) => {
  const user = await getUserById(userId);

  const cartData = user.cartData || {};

  if (!cartData[productId]) {
    cartData[productId] = {};
  }

  if (cartData[productId][size]) {
    cartData[productId][size] += 1;
  } else {
    cartData[productId][size] = 1;
  }

  user.cartData = cartData;
  await user.save();

  return cartData;
};

const updateUserCart = async (userId, productId, size, quantity) => {
  const user = await getUserById(userId);

  const cartData = user.cartData || {};

  if (cartData[productId] && cartData[productId][size]) {
    if (quantity > 0) {
      cartData[productId][size] = quantity;
    } else {
      delete cartData[productId][size];

      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }
    }
  }

  user.cartData = cartData;
  await user.save();

  return cartData;
};

const getCartByUserId = async (userId) => {
  const user = await getUserById(userId);

  return user.cartData || {};
};

export {
  addProductToCart,
  updateUserCart,
  getCartByUserId,
};