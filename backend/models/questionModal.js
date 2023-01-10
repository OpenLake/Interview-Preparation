const { default: mongoose } = require('mongoose');
const User = require('./userModel');

const questionScheme = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    unique: true,
    trim: true,
  },
  basic: {
    type: String,
    required: true,
  },
  tips: [{ type: String }],
  sample: {
    type: String,
    trim: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: User,
      unique: true,
    },
  ],
});

const Question = mongoose.model('Question', questionScheme);
module.exports = Question;
