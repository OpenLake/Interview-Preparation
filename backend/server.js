const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const port = 3011;

dotenv.config({ path: './.config.env' });

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connected successfully!!!');
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
