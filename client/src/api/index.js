import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dnvk-vocab.herokuapp.com',
});

// const API = axios.create({
//   baseURL: 'http://localhost:5000',
// });

export const fetchPosts = () => API.get('/posts');
export const addPost = value => API.post(`/posts?search=${value}`);
export const fetchSinglePost = id => API.get(`/posts/${id}`);
