const express = require('express');
const app = express();

const AppError = require('./utils/appError');

app.use(express.json());

const userRouter = require('./routes/userRoutes');

app.use('/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
