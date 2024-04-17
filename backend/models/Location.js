// import mongoose from 'mongoose';

// const LocationSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   location: { type: String, required: true }
// });

// module.exports = mongoose.model('Location', LocationSchema);
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  location: { type: String, required: true }
});

const Location = mongoose.model('Location', LocationSchema);
export default Location;
