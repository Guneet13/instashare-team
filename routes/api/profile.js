const express = require('express');
const router = express.Router();

// @route GET /api/profile/register
// @desc Register a user
// @access Public
router.get('/register', (req,res) => res.json({msg: 'profile work!'}));

module.exports = router; 