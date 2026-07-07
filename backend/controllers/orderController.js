import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

  // Order using Cash on Delivery
const placeOrder = async (req, res) => {
  try{
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "userId, items, amount and address are required",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "cod",
      address,
      payment: false,
      date: Date.now(),
      cancellable: true,
    }

    const order = new orderModel(orderData);
    await order.save();

    await userModel.findByIdAndUpdate(userId, {cartData:{}});

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message
    });
  }
}

// Order using safepay
const placeOrderSafepay = async (req, res) => {

}

// Display all orders for a user
const userOrders = async (req, res) => {
  try{
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders,
    });

  } catch(error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user orders",
      error: error.message
    });
  }
}

// Display all orders for admin
const allOrders = async (req, res) => {
  try{
    const orders = await orderModel.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  }
  catch(error) {
    res.status(500).json({
      success: false,
      message: "Error fetching all orders",
      error: error.message
    });
  } 
}

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

    const order = await orderModel.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Orders that should not be cancelled by customer
    const nonCancellableStatuses = [
      "Order Shipped",
      "Out for Delivery",
      "Order Delivered",
      "Order Cancelled",
      "Returned",
    ];

    if (nonCancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `This order cannot be cancelled because it is ${order.status}`,
      });
    }

    // Optional: respect your cancellable field if it exists in schema
    if (order.cancellable === false) {
      return res.status(400).json({
        success: false,
        message: "This order is no longer eligible for cancellation",
      });
    }

    order.status = "Order Cancelled";
    order.cancellable = false;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error cancelling order",
      error: error.message,
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


    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
}

export {
  placeOrder,
  placeOrderSafepay,
  userOrders,
  allOrders,
  updateStatus,
  cancelOrder,
};