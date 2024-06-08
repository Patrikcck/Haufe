const express = require('express');
const { createGroup, getGroups, joinGroup } = require('../controllers/groupController'); // Add joinGroup here
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/join', authMiddleware, joinGroup); // This will now work
router.post('/', authMiddleware, createGroup);
router.get('/', getGroups);

module.exports = router;