const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Question = require('./../models/questionModal');

exports.postQuestion = catchAsync(async (req, res, next) => {
  const newQuestion = await Question.create({
    type: req.body.type,
    question: req.body.question,
    basic: req.body.basic,
    tips: req.body.tips,
    sample: req.body.sample,
  });
  res.status(200).json({
    status: 'success',
    data: { newQuestion },
  });
  next();
});

exports.getQuestions = catchAsync(async (req, res, next) => {
  const type = req.params.type;
  const que = await Question.aggregate([
    {
      $match: { type: type },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: que,
  });
});

exports.getOneQuestion = catchAsync(async (req, res, next) => {
  const queId = req.params.id;
  const que = await Question.findById(queId);
  res.status(200).json({
    status: 'success',
    data: que,
  });
});
