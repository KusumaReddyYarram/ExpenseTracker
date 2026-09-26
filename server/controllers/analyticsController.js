const Transaction = require('../models/Transaction');
const { getIsConnected } = require('../config/db');
const { transactions: memoryTransactions } = require('../utils/memoryStore');

const getOverview = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let transactions = [];

    if (getIsConnected()) {
      transactions = await Transaction.find({ userId });
    } else {
      transactions = memoryTransactions.filter(t => t.userId === userId || t.userId === 'user_demo_123');
    }

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount;
      else if (t.type === 'expense') totalExpenses += t.amount;
    });

    const balance = totalIncome - totalExpenses;
    const savings = Math.max(0, balance);
    const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

    // Category Breakdown
    const categoryMap = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });

    const categoryBreakdown = Object.keys(categoryMap).map(cat => ({
      name: cat,
      value: categoryMap[cat]
    }));

    // Monthly Trend Mock / Real Stream
    const monthlyData = [
      { month: 'May', income: 32000, expense: 19500 },
      { month: 'Jun', income: 32000, expense: 22100 },
      { month: 'Jul', income: 35000, expense: 20400 },
      { month: 'Aug', income: 35000, expense: 24800 },
      { month: 'Sep', income: totalIncome || 35000, expense: totalExpenses || 21450 }
    ];

    return res.json({
      success: true,
      summary: {
        balance,
        totalIncome,
        totalExpenses,
        savings,
        savingsRate
      },
      categoryBreakdown,
      monthlyData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview
};
