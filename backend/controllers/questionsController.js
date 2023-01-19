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
    likes: req.body.likes,
    code: req.body.code,
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

exports.likeQuestion = catchAsync(async (req, res, next) => {
  const type = req.params.que_id;

  // const que = await Question.findById(type);

  // if (que.checkUniqueLike(req.body._id, que.likes)) {
  //   res.status(409).json({
  //     status: 'success',
  //     data: 'User already exist',
  //   });
  // }

  const data = await Question.findByIdAndUpdate(
    { _id: type },
    {
      $push: {
        likes: req.body._id,
      },
    },
    {
      new: true,
    },
  );

  res.status(200).json({
    status: 'success',
    data: data.likes,
  });
  next();
});

exports.unlikeQuestion = catchAsync(async (req, res, next) => {
  const type = req.params.que_id;

  const data = await Question.findByIdAndUpdate(
    { _id: type },
    {
      $pull: {
        likes: req.body._id,
      },
    },
    {
      new: true,
    },
  );

  res.status(200).json({
    status: 'success',
    data: data.likes,
  });
  next();
});
