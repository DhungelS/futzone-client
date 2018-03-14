import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import './index.css';
import App from './components/App';
import reducers from './reducers';

const middlwares = [createLogger(), thunk];

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(...middlwares),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
