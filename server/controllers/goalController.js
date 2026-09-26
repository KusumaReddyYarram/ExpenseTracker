const Goal = require('../models/Goal');
const { getIsConnected } = require('../config/db');
const { goals: memoryGoals } = require('../utils/memoryStore');

const getGoals = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getIsConnected()) {
      const goals = await Goal.find({ userId });
      return res.json({ success: true, goals });
    } else {
      return res.json({ success: true, goals: memoryGoals });
    }
  } catch (error) {
    next(error);
  }
};

const createGoal = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { title, targetAmount, savedAmount = 0, category } = req.body;

    if (!title || !targetAmount) {
      return res.status(400).json({ success: false, message: 'Title and target amount are required' });
    }

    if (getIsConnected()) {
      const goal = await Goal.create({
        userId,
        title,
        targetAmount: Number(targetAmount),
        savedAmount: Number(savedAmount),
        category: category || 'Savings'
      });
      return res.status(201).json({ success: true, goal });
    } else {
      const newGoal = {
        _id: 'g_' + Date.now(),
        userId,
        title,
        targetAmount: Number(targetAmount),
        savedAmount: Number(savedAmount),
        category: category || 'Savings',
        status: Number(savedAmount) >= Number(targetAmount) ? 'completed' : 'in-progress'
      };
      memoryGoals.push(newGoal);
      return res.status(201).json({ success: true, goal: newGoal });
    }
  } catch (error) {
    next(error);
  }
};

const updateGoalProgress = async (req, res, next) => {
  try {
    const { savedAmount } = req.body;

    if (getIsConnected()) {
      const goal = await Goal.findById(req.params.id);
      if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });

      goal.savedAmount = Number(savedAmount);
      if (goal.savedAmount >= goal.targetAmount) {
        goal.status = 'completed';
      }
      await goal.save();
      return res.json({ success: true, goal });
    } else {
      const goal = memoryGoals.find(g => g._id === req.params.id);
      if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
      goal.savedAmount = Number(savedAmount);
      if (goal.savedAmount >= goal.targetAmount) goal.status = 'completed';
      return res.json({ success: true, goal });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoalProgress
};
