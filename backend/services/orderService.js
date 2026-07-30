import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const createCodOrder = async ({ userId, items, amount, address }) => {
  const orderData = {
    userId,
    items,
    amount,
    paymentMethod: "cod",
    address,
    payment: false,
    date: Date.now(),
    cancellable: true,
  };
  console.log("Creating COD order:", orderData);

  const order = new orderModel(orderData);
  await order.save();

  await userModel.findByIdAndUpdate(userId, { cartData: {} });

  return order;
};

export const getUserOrders = async (userId) => {
  return await orderModel.find({ userId }).sort({ date: -1 });
};

export const getAllOrders = async () => {
  return await orderModel.find().sort({ date: -1 });
};

export const cancelUserOrder = async ({ orderId, userId }) => {
  const order = await orderModel.findOne({
    _id: orderId,
    userId,
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  const nonCancellableStatuses = [
    "Order Shipped",
    "Out for Delivery",
    "Order Delivered",
    "Order Cancelled",
    "Returned",
  ];

  if (nonCancellableStatuses.includes(order.status)) {
    const error = new Error(
      `This order cannot be cancelled because it is ${order.status}`
    );
    error.statusCode = 400;
    throw error;
  }

  if (order.cancellable === false) {
    const error = new Error("This order is no longer eligible for cancellation");
    error.statusCode = 400;
    throw error;
  }

  order.status = "Order Cancelled";
  order.cancellable = false;

  await order.save();

  return order;
};

export const updateOrderStatus = async ({ orderId, status }) => {
  const updatedOrder = await orderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!updatedOrder) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  return updatedOrder;
};

