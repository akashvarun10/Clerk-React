import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  emailAddress: String,
  location: String,
});

const User = mongoose.model('User', userSchema);

export default User;
