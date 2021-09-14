import express from 'express';
import { addPosts, getPosts, getPostByName, searchByName } from '../controllers/postControllers.js';

const router = express.Router();
// Routes are defined here
router.post('/', addPosts);
router.get('/', getPosts);
router.get('/search', searchByName);
router.get('/:id', getPostByName);

export default router;
