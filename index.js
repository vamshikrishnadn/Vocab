import express from 'express';
import dotenv from 'dotenv';
import postRouter from './routes/posts.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config({ path: './config/config.env' });

const app = express();

// Use of bodyParser to extract the data from the request body
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(cors());

// Connecting to the database
mongoose.connect(process.env.MONGODB_URL);
// Saving in database and searching in the oxford dictionaries
app.use('/posts', postRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Successfully started`);
});
