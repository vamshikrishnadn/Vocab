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

// Calling while production is running.
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static('client/build'));
}

// Connecting to port.
const PORT = process.env.PORT || 5000;

// Database Connection
app.listen(PORT, () => {
  console.log(`Successfully started on ${PORT}`);
});
