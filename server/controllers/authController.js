const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { getIsConnected } = require('../config/db');
const memoryUsers = require('../utils/memoryStore').users;
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, currency } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        currency: currency || '₹'
      });

      if (user) {
        return res.status(201).json({
          success: true,
          token: generateToken(user._id),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            currency: user.currency,
            createdAt: user.createdAt
          }
        });
      }
    } else {
      // Memory Store fallback mode
      const found = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const newUser = {
        _id: 'user_' + Date.now(),
        id: 'user_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 10),
        currency: currency || '₹',
        createdAt: new Date()
      };
      memoryUsers.push(newUser);

      return res.status(201).json({
        success: true,
        token: generateToken(newUser._id),
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          currency: newUser.currency,
          createdAt: newUser.createdAt
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (getIsConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          token: generateToken(user._id),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            currency: user.currency,
            createdAt: user.createdAt
          }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      // Memory Store Fallback
      const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user && bcrypt.compareSync(password, user.password)) {
        return res.json({
          success: true,
          token: generateToken(user._id),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            currency: user.currency,
            createdAt: user.createdAt
          }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
