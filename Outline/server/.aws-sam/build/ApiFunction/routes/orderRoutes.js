import express from 'express';
import { createOrder, getMyOrders, getAllOrders } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/my-orders', auth, getMyOrders);
router.get('/admin-orders', auth, admin, getAllOrders); // 🔥 New admin route

export default router;
