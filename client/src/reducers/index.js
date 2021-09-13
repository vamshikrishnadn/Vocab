import { combineReducers } from 'redux';
import postReducers from './postReducers';
import singleReducers from './singlePostReducer';

export default combineReducers({
  posts: postReducers,
  post: singleReducers,
});
