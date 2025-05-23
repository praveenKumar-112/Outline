import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { items, total, shippingInfo } = req.body;

  try {
    const newOrder = new Order({
      user: req.user._id, // from auth middleware
      items,
      total,
      shippingInfo
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
