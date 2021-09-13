import { FETCH_POST } from '../actions/type';

export default (state = [], actions) => {
  switch (actions.type) {
    case FETCH_POST:
      return actions.payload;
    default:
      return state;
  }
};
