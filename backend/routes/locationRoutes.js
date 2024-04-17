// import express from 'express';
// const router = express.Router();
// import Location from '../models/locationModel.js';

// // Post or update location
// router.post('/', async (req, res) => {
//   const { userId, location } = req.body;
//   try {
//     const result = await Location.findOneAndUpdate({ userId }, { location }, { new: true, upsert: true });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get location by userId
// router.get('/:userId', async (req, res) => {
//   try {
//     const result = await Location.findOne({ userId: req.params.userId });
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       res.status(404).json({ message: 'Location not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


import express from 'express';
import Location from '../models/Location.js';  // Ensure the path to your model is correct

const router = express.Router();

// Post or update location
router.post('/', async (req, res) => {
  const { userId, location } = req.body;
  try {
    const result = await Location.findOneAndUpdate(
      { userId }, 
      { location }, 
      { new: true, upsert: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get location by userId
router.get('/:userId', async (req, res) => {
  try {
    const result = await Location.findOne({ userId: req.params.userId });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
