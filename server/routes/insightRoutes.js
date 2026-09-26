const express = require('express');
const router = express.Router();
const { getInsights, simulateWhatIf } = require('../controllers/insightController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getInsights);
router.post('/simulate', simulateWhatIf);

module.exports = router;
