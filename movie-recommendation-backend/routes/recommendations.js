const express = require('express');
const { createRecommendation, getRecommendations } = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createRecommendation);
router.get('/', getRecommendations);

module.exports = router;