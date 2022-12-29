const { default: mongoose } = require('mongoose');

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
  likes: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model('Question', questionScheme);
module.exports = Question;
