const Transaction = require('../models/Transaction');
const { getIsConnected } = require('../config/db');
const memoryTransactions = require('../utils/memoryStore').transactions;

// @desc    Get all transactions for authenticated user with search, filter, sort
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { type, category, search, startDate, endDate, sortBy = 'date', sortOrder = 'desc', limit = 50 } = req.query;

    if (getIsConnected()) {
      let query = { userId };

      if (type && type !== 'all') {
        query.type = type;
      }
      if (category && category !== 'all') {
        query.category = category;
      }
      if (search) {
        query.description = { $regex: search, $options: 'i' };
      }
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
      }

      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

      const transactions = await Transaction.find(query)
        .sort(sortOptions)
        .limit(parseInt(limit));

      return res.json({ success: true, count: transactions.length, transactions });
    } else {
      // Memory Store Fallback
      let filtered = memoryTransactions.filter(t => t.userId === userId || t.userId === 'user_demo_123');

      if (type && type !== 'all') {
        filtered = filtered.filter(t => t.type === type);
      }
      if (category && category !== 'all') {
        filtered = filtered.filter(t => t.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        filtered = filtered.filter(t => t.description.toLowerCase().includes(search.toLowerCase()));
      }

      // Sort
      filtered.sort((a, b) => {
        const dateA = new Date(a[sortBy] || a.date);
        const dateB = new Date(b[sortBy] || b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });

      return res.json({ success: true, count: filtered.length, transactions: filtered });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
const getTransactionById = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getIsConnected()) {
      const transaction = await Transaction.findOne({ _id: req.params.id, userId });
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
      return res.json({ success: true, transaction });
    } else {
      const transaction = memoryTransactions.find(t => t._id === req.params.id);
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
      return res.json({ success: true, transaction });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Add new transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { type, amount, category, description, date, paymentMethod, notes } = req.body;

    if (!type || !amount || !category || !description) {
      return res.status(400).json({ success: false, message: 'Type, amount, category, and description are required' });
    }

    if (getIsConnected()) {
      const transaction = await Transaction.create({
        userId,
        type,
        amount: Number(amount),
        category,
        description,
        date: date ? new Date(date) : new Date(),
        paymentMethod: paymentMethod || 'UPI',
        notes
      });
      return res.status(201).json({ success: true, transaction });
    } else {
      const newTx = {
        _id: 'tx_' + Date.now(),
        userId,
        type,
        amount: Number(amount),
        category,
        description,
        date: date ? new Date(date) : new Date(),
        paymentMethod: paymentMethod || 'UPI',
        notes
      };
      memoryTransactions.unshift(newTx);
      return res.status(201).json({ success: true, transaction: newTx });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getIsConnected()) {
      let transaction = await Transaction.findOne({ _id: req.params.id, userId });
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }

      transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      return res.json({ success: true, transaction });
    } else {
      const index = memoryTransactions.findIndex(t => t._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }

      memoryTransactions[index] = { ...memoryTransactions[index], ...req.body };
      return res.json({ success: true, transaction: memoryTransactions[index] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getIsConnected()) {
      const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId });
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
      return res.json({ success: true, message: 'Transaction removed' });
    } else {
      const index = memoryTransactions.findIndex(t => t._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
      memoryTransactions.splice(index, 1);
      return res.json({ success: true, message: 'Transaction removed' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
