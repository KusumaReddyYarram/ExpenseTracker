const { calculateHealthScore, generateSmartInsights, runWhatIfSimulation } = require('../services/insightEngine');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const { getIsConnected } = require('../config/db');
const { transactions: memoryTransactions, budgets: memoryBudgets } = require('../utils/memoryStore');

const getInsights = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let txList = [];
    let budgetList = [];

    if (getIsConnected()) {
      txList = await Transaction.find({ userId });
      budgetList = await Budget.find({ userId });
    } else {
      txList = memoryTransactions.filter(t => t.userId === userId || t.userId === 'user_demo_123');
      budgetList = memoryBudgets;
    }

    let income = 0;
    let expense = 0;
    txList.forEach(t => {
      if (t.type === 'income') income += t.amount;
      if (t.type === 'expense') expense += t.amount;
    });

    const health = calculateHealthScore(income, expense, budgetList);
    const insights = generateSmartInsights(txList);

    return res.json({
      success: true,
      healthScore: health,
      insights
    });
  } catch (error) {
    next(error);
  }
};

const simulateWhatIf = async (req, res) => {
  const { monthlySaveBoost = 0, reduceCategory = '', reduceAmount = 0 } = req.body;
  const result = runWhatIfSimulation({ monthlySaveBoost, reduceCategory, reduceAmount });
  return res.json({ success: true, simulation: result });
};

module.exports = {
  getInsights,
  simulateWhatIf
};
