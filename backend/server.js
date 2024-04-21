// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import fetch from 'node-fetch'; // Assuming node-fetch is installed for making HTTP requests

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Ensure you replace this with your environment variable
// mongoose.connect('mongodb+srv://pemmarajuv:dTNwtwcEdqy2IBcu@cluster0.z5f5zp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Schema to include the state
// const locationSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true },
//   location: { type: String, required: true },
//   state: { type: String },
//   username: { type: String },
//   firstName: { type: String },
//   lastName: { type: String },
//   emailAddress: { type: String }
// });

// const Location = mongoose.model('Location', locationSchema);

// // Helper function to get state from Google Geocoding API
// async function getStateFromLocation(location) {
//   const apiKey = 'AIzaSyALvS5oK04po7EP4eNSm82BM6uv4pMbrhE'; // Make sure to store your Google API Key in an environment variable
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const stateComponent = data.results[0].address_components.find(component =>
//       component.types.includes('administrative_area_level_1')
//     );
//     return stateComponent ? stateComponent.short_name : null;
//   } catch (error) {
//     console.error('Failed to fetch state from location:', error);
//     return null;
//   }
// }

// // Routes
// app.post('/location', async (req, res) => {
//   const { userId, location, username, firstName, lastName, emailAddress } = req.body;
  
//   try {
//     const state = await getStateFromLocation(location); // Fetch state based on location

//     const updatedLocation = await Location.findOneAndUpdate(
//       { userId },
//       { userId, location, state, username, firstName, lastName, emailAddress },
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

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// server.js
// Import necessary modules
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// // Create an Express application
// const app = express();
// app.use(cors());

// // Configure MongoDB connection
// const mongoURI = 'mongodb+srv://pemmarajuv:dTNwtwcEdqy2IBcu@cluster0.z5f5zp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define a schema for donation information
// const donationSchema = new mongoose.Schema({
//   amount: {
//     type: Number,
//     required: true,
//   },
//   username: {
//     type: String,
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   emailAddress: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// // Create a model based on the schema
// const Donation = mongoose.model('Donation', donationSchema);

// // Define a route to handle donation submissions
// app.post('/payment', async (req, res) => {
//   try {
//     console.log('Request body:', req.body); // Log the request body
//     // Extract donation information from the request body
//     const { amount, username, firstName, emailAddress } = req.body;

//     // Create a new donation document
//     const donation = new Donation({
//       amount,
//       username,
//       firstName,
//       emailAddress,
//     });

//     // Save the donation to the database
//     await donation.save();

//     // Respond with a success message
//     res.status(200).json({ message: 'Donation saved successfully' });
//   } catch (error) {
//     // Handle errors
//     console.error('Error saving donation:', error);
//     res.status(500).json({ error: 'Failed to process donation' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });














// server.js

// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// const app = express();
// app.use(cors());


// // MongoDB connection
// mongoose.connect('mongodb+srv://pemmarajuv:dTNwtwcEdqy2IBcu@cluster0.z5f5zp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const Donation = mongoose.model('Donation', {
//   username: String,
//   emailAddress: String,
//   donationAmount: Number,
// });

// app.use(bodyParser.json());

// // POST endpoint to save donation details
// app.post('/payment', async (req, res) => {
//   try {
//     const { username, emailAddress, donationAmount } = req.body;

//     // Create a new donation document
//     const newDonation = new Donation({
//       username,
//       emailAddress,
//       donationAmount,
//     });

//     // Save the donation to the database
//     await newDonation.save();

//     res.status(201).json({ message: 'Donation saved successfully' });
//   } catch (error) {
//     console.error('Error saving donation:', error);
//     res.status(500).json({ error: 'Failed to save donation' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://pemmarajuv:hcB5wVKOb5u6YnqO@paymentdonation.iu50ogh.mongodb.net/?retryWrites=true&w=majority&appName=paymentdonation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Donation = mongoose.model('Donation', {
  username: String,
  emailAddress: String,
  donationAmount: Number,
});

app.use(bodyParser.json());

// POST endpoint to save donation details
app.post('/payment', async (req, res) => {
  try {
    const { username, emailAddress, donationAmount } = req.body;

    // Check if a donation record already exists for the user
    const existingDonation = await Donation.findOne({ username, emailAddress });

    if (existingDonation) {
      // If a record exists, update the donation amount
      existingDonation.donationAmount += donationAmount;
      await existingDonation.save();
    } else {
      // If no record exists, create a new donation document
      const newDonation = new Donation({
        username,
        emailAddress,
        donationAmount,
      });
      // Save the new donation to the database
      await newDonation.save();
    }

    res.status(201).json({ message: 'Donation saved successfully' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to save donation' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});