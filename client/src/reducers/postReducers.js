import { FETCH_POSTS, CREATE_POST } from '../actions/type';

export default (state = [], actions, error = '') => {
  switch (actions.type) {
    case FETCH_POSTS:
      return actions.payload;
    case CREATE_POST:
      return [...state, actions.payload];

    default:
      return state;
  }
};
