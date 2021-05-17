import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './modules'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'

const store = createStore(
  rootReducer,
  // logger를 사용하는 경우 logger가 맨 마지막에 와야 함
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
