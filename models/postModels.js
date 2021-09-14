import mongoose from 'mongoose';

const { Schema } = mongoose;

// Defining the modal
const postsSchema = new Schema({
  searchTerm: { type: String, unique: true },
  definitions: [{ type: String }],
  shortDef: [{ type: String }],
  speech: { type: String },
  language: { type: String },
  pronunciations: { type: String },
});

// modal connection
const Posts = mongoose.model('Posts', postsSchema);

export default Posts;
