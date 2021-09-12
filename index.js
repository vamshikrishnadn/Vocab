import express from 'express';
import dotenv from 'dotenv';
import postRouter from './routes/posts.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log('Mongodb connected.');
});
// Saving in database and searching in the oxford dictionaries
app.use('/posts', postRouter);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(process.env.PORT, () => {
  console.log(`Successfully started on port ${process.env.PORT}`);
});
