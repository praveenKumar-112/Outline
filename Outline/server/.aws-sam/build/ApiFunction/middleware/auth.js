// server/middleware/auth.js

import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded = { id, isAdmin, ... }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default auth;