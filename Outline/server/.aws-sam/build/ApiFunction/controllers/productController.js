import Product from '../models/Product.js';

// Create new product (admin only)
// controllers/productController.js

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock } = req.body;

    const image = req.file?.path;

    if (!name || !description || !price || !category || !countInStock || !image) {
      return res.status(400).json({ message: 'All fields are required including image.' });
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price), // ensure number
      category,
      countInStock: parseInt(countInStock),
      image,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ message: 'Server error during product creation.' });
  }
};



// Get all products
export const getAllProducts = async (req, res) => {
  // your logic here
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  // your logic here
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // or specific fields you allow
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};



// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  // your logic here
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

