import axios from 'axios';

export const fetchPosts = () => axios.get('/posts');
export const addPost = value => axios.post(`/posts?search=${value}`);
export const fetchSinglePost = id => axios.get(`/posts/${id}`);
