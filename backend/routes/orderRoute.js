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


const orderRouter = express.Router();

// ADMIN ROUTES
orderRouter.get('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// PAYMENT
orderRouter.post('/place/cod', authUser, placeOrder);
orderRouter.post('/place/safepay', authUser, placeOrderSafepay);

// USER ROUTES
orderRouter.get('/user', authUser, userOrders);
orderRouter.post('/cancel', authUser, cancelOrder);

export default orderRouter;