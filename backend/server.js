const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './.config.env' });
const port = process.env.PORT;

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '1532910',
  key: 'c60bbe3cbde2425488b5',
  secret: '3471b0364dd81b2263c8',
  cluster: 'ap2',
  useTLS: true,
});

pusher.trigger('my-channel', 'my-event', {
  message: 'hello world',
});


mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connected successfully!!!');
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected');

  const commentCollection = db.collection('comments');
  const changeStream = commentCollection.watch();

  changeStream.on('change', (change) => {
    console.log({ change });
    if (change.operationType === 'insert') {
      const commentDetails = change.fullDocument;
      pusher.trigger('comments', 'inserted', {
        username: commentDetails.username,
        type: commentDetails.type,
        comment: commentDetails.comment,
        time: commentDetails.time,
        que: commentDetails.que,
        user: commentDetails.user,
      });
    } else console.log('Error triggered Pusher');
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
