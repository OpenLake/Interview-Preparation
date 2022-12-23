const express = require('express');
const app = express();
const cors = require('cors');

const AppError = require('./utils/appError');

app.use(express.json());
app.use(cors());

const userRouter = require('./routes/userRoutes');
const questionRouter = require('./routes/questionRoutes');
const commentRouter = require('./routes/commentRoutes');
app.use('/v1/users', userRouter);
app.use('/v1/home', questionRouter);
app.use('/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
