const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  preferences: {
    type: [String], // Categories of policies the user is interested in
    default: [],
  },
  selectedPolicy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
