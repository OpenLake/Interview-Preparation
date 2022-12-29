const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  que: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;
