const bcrypt = require('bcryptjs');
const { catchAsync } = require('../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    college: req.body.college,
    linkedin: req.body.linkedin,
  });

  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect mail or password', 401));
  }
  res.status(200).json({
    status: 'success',
    user,
  });
  next();
});
