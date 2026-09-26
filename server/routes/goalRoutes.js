const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoalProgress } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getGoals);
router.post('/', createGoal);
router.put('/:id/progress', updateGoalProgress);

module.exports = router;
