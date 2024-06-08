const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      console.log('Token decoded but userId not found', decoded);
      return res.status(401).json({ error: 'Invalid token, authorization denied' });
    }

    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      console.log('User not found with decoded userId:', decoded.userId);
      return res.status(401).json({ error: 'User not found, authorization denied' });
    }

    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
