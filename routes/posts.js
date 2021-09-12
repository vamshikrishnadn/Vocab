import express from 'express';
import { addPosts, getPosts, getPost, getPostById } from '../controllers/postControllers.js';

const router = express.Router();
// Routes are defined here
router.post('/', addPosts);
router.get('/', getPosts);
router.get('/search', getPost);
router.get('/:id', getPostById);

export default router;
