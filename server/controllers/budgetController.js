const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const { getIsConnected } = require('../config/db');
const { budgets: memoryBudgets, transactions: memoryTransactions } = require('../utils/memoryStore');

const getBudgets = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    if (getIsConnected()) {
      const budgetDocs = await Budget.find({ userId, month: currentMonth, year: currentYear });
      const userTransactions = await Transaction.find({
        userId,
        type: 'expense'
      });

      const result = budgetDocs.map(b => {
        const spent = userTransactions
          .filter(t => t.category.toLowerCase() === b.category.toLowerCase())
          .reduce((acc, t) => acc + t.amount, 0);
        return {
          ...b.toObject(),
          spent,
          remaining: Math.max(0, b.amount - spent),
          percentUsed: Math.round((spent / (b.amount || 1)) * 100)
        };
      });

      return res.json({ success: true, budgets: result });
    } else {
      const result = memoryBudgets.map(b => {
        const spent = memoryTransactions
          .filter(t => t.type === 'expense' && t.category.toLowerCase() === b.category.toLowerCase())
          .reduce((acc, t) => acc + t.amount, 0);
        return {
          ...b,
          spent,
          remaining: Math.max(0, b.amount - spent),
          percentUsed: Math.round((spent / (b.amount || 1)) * 100)
        };
      });

      return res.json({ success: true, budgets: result });
    }
  } catch (error) {
    next(error);
  }
};

const setBudget = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { category, amount } = req.body;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    if (!category || !amount) {
      return res.status(400).json({ success: false, message: 'Category and amount required' });
    }

    if (getIsConnected()) {
      const budget = await Budget.findOneAndUpdate(
        { userId, category, month: currentMonth, year: currentYear },
        { amount: Number(amount) },
        { new: true, upsert: true }
      );
      return res.json({ success: true, budget });
    } else {
      let b = memoryBudgets.find(b => b.category.toLowerCase() === category.toLowerCase());
      if (b) {
        b.amount = Number(amount);
      } else {
        b = { _id: 'b_' + Date.now(), userId, category, amount: Number(amount), month: currentMonth, year: currentYear };
        memoryBudgets.push(b);
      }
      return res.json({ success: true, budget: b });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBudgets,
  setBudget
};
