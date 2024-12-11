const express = require('express');
const nodemailer = require('nodemailer');
const { Booking, SpeakerAvailability } = require('../models');
const router = express.Router();

router.post('/book-session', async (req, res) => {
  const { speakerId, day, timeSlot } = req.body;

  const availability = await SpeakerAvailability.findOne({ where: { speakerId, day, timeSlot, isBooked: false } });
  if (!availability) return res.status(400).json({ error: 'Slot not available' });

  await SpeakerAvailability.update({ isBooked: true }, { where: { id: availability.id } });
  const booking = await Booking.create({ userId: req.user.id, speakerId, day, timeSlot });

  const transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: 'you@gmail.com', pass: 'password' } });
  await transporter.sendMail({
    from: 'you@gmail.com',
    to: ['user@gmail.com', 'speaker@gmail.com'],
    subject: 'Session Booking',
    text: `Your session is booked on ${day} at ${timeSlot}.`
  });

  res.status(201).json({ message: 'Session booked', booking });
});

module.exports = router;