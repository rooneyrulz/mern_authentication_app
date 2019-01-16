import mongoose from "mongoose";
const Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },

  name: {
    type: String,
    required: [true, 'name is required...']
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'email is required...']
  },

  username: {
    type: String,
    unique: true,
    required: [true, 'username is required...']
  },

  password: {
    type: String,
    required: [true, 'password is required...']
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Users', userSchema);