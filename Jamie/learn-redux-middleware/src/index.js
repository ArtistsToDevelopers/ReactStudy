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
import { BrowserRouter, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const customHistory = createBrowserHistory()

const store = createStore(
  rootReducer,
  // logger를 사용하는 경우 logger가 맨 마지막에 와야 함
  composeWithDevTools(applyMiddleware(ReduxThunk.withExtraArgument({ history: customHistory }), logger))
)

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
