import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Endpoint to save user information
router.post('/api/save-user', async (req, res) => {
  try {
    const { username, firstName, lastName, emailAddress, location } = req.body;

    const newUser = new User({
      username,
      firstName,
      lastName,
      emailAddress,
      location,
    });

    await newUser.save();

    res.status(200).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
