const express = require('express');
const authRoutes = require('./auth');
const speakerRoutes = require('./speaker');
const bookingRoutes = require('./booking');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();
router.get('/', (req, res) => {
    res.send('this is TALKTIME.');
  });

router.use('/auth', authRoutes);
router.use('/speaker', authenticateToken, speakerRoutes);
router.use('/booking', authenticateToken, bookingRoutes);

module.exports = router;
