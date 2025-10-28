import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import upload from '../middleware/upload.js'; // ✅ Add this

const router = express.Router();

// ✅ Add `upload.single('image')` to handle image file uploads
router.post('/', auth, admin, upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', auth, admin, updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

export default router;
