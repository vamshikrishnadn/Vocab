import ReactDOM from 'react-dom';
import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import App from './components/App';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import './styles/index.css';

import reducers from './reducers';

// Applying Promise to wait for some time for the request.
const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
