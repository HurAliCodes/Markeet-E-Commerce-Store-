import express from 'express';
import adminAuth from "../middlewares/adminAuth.js";
import authUser from '../middlewares/auth.js';
import {
  placeOrder,
  placeOrderSafepay,
  userOrders,
  allOrders,
  updateStatus,
  cancelOrder,
} from "../controllers/orderController.js";

orderRouter.post("/cancel", authUser, cancelOrder);

const orderRouter = express.Router();

// ADMIN ROUTES
orderRouter.get('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// PAYMENT
orderRouter.post('/place/cod', authUser, placeOrder);
orderRouter.post('/place/safepay', authUser, placeOrderSafepay);

// USER ROUTES
orderRouter.get('/user', authUser, userOrders);
apiClient.post("/api/order/cancel", { orderId });

export default orderRouter;