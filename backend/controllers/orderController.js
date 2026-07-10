import {
  createCodOrder,
  getUserOrders,
  getAllOrders,
  cancelUserOrder,
  updateOrderStatus,
} from "../services/orderService.js";

// Order using Cash on Delivery
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "userId, items, amount and address are required",
      });
    }

    const order = await createCodOrder({
      userId,
      items,
      amount,
      address,
    });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};

// Order using Safepay
const placeOrderSafepay = async (req, res) => {
  return res.status(501).json({
    success: false,
    message: "Safepay payment is not implemented yet",
  });
};

// Display all orders for a user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const orders = await getUserOrders(userId);

    return res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user orders",
      error: error.message,
    });
  }
};

// Display all orders for admin
const allOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();

    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching all orders",
      error: error.message,
    });
  }
};

// Cancel order by user
const cancelOrder = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    if (!orderId || !userId) {
      return res.status(400).json({
        success: false,
        message: "orderId and userId are required",
      });
    }

    const order = await cancelUserOrder({ orderId, userId });

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error cancelling order",
    });
  }
};

// Update order status (admin only)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "orderId and status are required",
      });
    }

    const order = await updateOrderStatus({ orderId, status });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error updating order status",
    });
  }
};

export {
  placeOrder,
  placeOrderSafepay,
  userOrders,
  allOrders,
  updateStatus,
  cancelOrder,
};

