// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// const LocationSchema = new mongoose.Schema({
//   userId: String,
//   location: String,
// });

// const Location = mongoose.model('Location', LocationSchema);

// app.post('/location', async (req, res) => {
//   const { userId, location } = req.body;
//   try {
//     const result = await Location.findOneAndUpdate({ userId }, { location }, { new: true, upsert: true });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get('/location/:userId', async (req, res) => {
//   try {
//     const result = await Location.findOne({ userId: req.params.userId });
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       res.status(404).send('Location not found');
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// mongoose.connect('mongodb+srv://pemmarajuv:dTNwtwcEdqy2IBcu@cluster0.z5f5zp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
//   .catch((error) => console.error(error));

// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb+srv://pemmarajuv:dTNwtwcEdqy2IBcu@cluster0.z5f5zp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Define a schema for the location
// const locationSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true },
//   location: { type: String, required: true }
// });

// // Create a model from the schema
// const Location = mongoose.model('Location', locationSchema);

// // Routes
// app.post('/location', async (req, res) => {
//   const { userId, location } = req.body;
//   try {
//     const updatedLocation = await Location.findOneAndUpdate(
//       { userId },
//       { location },
//       { new: true, upsert: true }
//     );
//     res.status(200).json(updatedLocation);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/location/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const locationData = await Location.findOne({ userId });
//     if (locationData) {
//       res.status(200).json(locationData);
//     } else {
//       res.status(404).json({ message: 'Location not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Server listening
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://pemmarajuv:dTNwtwcEdqy2IBcu@cluster0.z5f5zp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema for the location
const locationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  location: { type: String, required: true }
});

// Create a model from the schema
const Location = mongoose.model('Location', locationSchema);

// Routes
app.post('/location', async (req, res) => {
  const { userId, location } = req.body;
  try {
    const updatedLocation = await Location.findOneAndUpdate(
      { userId },
      { location },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/location/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const locationData = await Location.findOne({ userId });
    if (locationData) {
      res.status(200).json(locationData);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
