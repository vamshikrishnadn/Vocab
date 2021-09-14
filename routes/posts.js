import express from 'express';
import { addPosts, getPosts, getPostByName } from '../controllers/postControllers.js';

const router = express.Router();
// Routes are defined here
router.post('/', addPosts);
router.get('/', getPosts);
router.get('/:id', getPostByName);

export default router;
