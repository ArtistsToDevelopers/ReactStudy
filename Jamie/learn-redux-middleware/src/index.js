import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer, { rootSaga } from './modules'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'

const customHistory = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
}); // saga middleware 생성

const store = createStore(
  rootReducer,
  // logger를 사용하는 경우 logger가 맨 마지막에 와야 함
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      sagaMiddleware, // saga middleware 적용
      logger))
)
// 주의: 스토어 생성 후 아래 코드 실행
sagaMiddleware.run(rootSaga) // root saga 실행


ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
