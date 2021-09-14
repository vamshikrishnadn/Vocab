import * as api from '../api';
import { FETCH_POSTS, CREATE_POST, FETCH_POST, ERROR } from './type';
import M from 'materialize-css/dist/js/materialize.min.js';

// Calling actions
export const fetchPosts = () => async dispatch => {
  const fetchPosts = await api.fetchPosts();

  dispatch({
    type: FETCH_POSTS,
    payload: fetchPosts.data,
  });
};

// Adding posts here
export const addPost = value => async dispatch => {
  try {
    const addPost = await api.addPost(value);
    dispatch({
      type: CREATE_POST,
      payload: addPost.data,
    });
    M.toast({ html: 'Successfully Added' });
  } catch (error) {
    M.toast({ html: 'Search already exists.' });
  }
};

// Fetching single post when we click on a particular word.
export const fetchSinglePost = id => async dispatch => {
  const fetchPost = await api.fetchSinglePost(id);
  dispatch({
    type: FETCH_POST,
    payload: fetchPost.data,
  });
};

// Searching the word from database.
export const searchByName = name => async dispatch => {
  const fetchPosts = await api.searchByName(name);
  dispatch({
    type: FETCH_POSTS,
    payload: fetchPosts.data,
  });
};
