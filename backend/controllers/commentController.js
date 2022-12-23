const { catchAsync } = require('../utils/catchAsync');
const Comment = require('./../models/commentModal');

exports.postComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create({
    que: req.body.que,
    type: req.body.type,
    username: req.body.username,
    comment: req.body.comment,
    user: req.body.user,
  });
  res.status(200).json({
    status: 'success',
    data: newComment,
  });
  next();
});

exports.getComments = catchAsync(async (req, res, next) => {
  const type = req.params.que_id;
  const getComment = await Comment.find({ que: type });
  res.status(200).json({
    status: 'success',
    data: getComment,
  });
  next();
});
