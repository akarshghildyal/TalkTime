const express = require('express');
const { SpeakerAvailability } = require('../models');
const router = express.Router();

router.post('/add-expertise', async (req, res) => {
  const { day, timeSlot } = req.body;
  try {
    await SpeakerAvailability.create({ speakerId: req.user.id, day, timeSlot, isBooked: false });
    res.status(201).json({ message: 'Expertise added' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;    
