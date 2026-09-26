const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

// In-memory user fallback store when MongoDB is unavailable
const memoryUsers = require('../utils/memoryStore').users;

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_aura_fintech_jwt_key_2026');

      if (getIsConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const found = memoryUsers.find(u => u._id === decoded.id || u.id === decoded.id);
        if (found) {
          const { password, ...userWithoutPass } = found;
          req.user = userWithoutPass;
        }
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
