const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'Name must have less or equal to 40 characters'],
    // validate: [validator.isAlpha, 'Name should only contain alphanumeric characters'],
  },
  email: {
    type: String,
    required: [true, 'Email in required'],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Email not correct'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  college: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  profession: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  //hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  
  next();
});

userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
