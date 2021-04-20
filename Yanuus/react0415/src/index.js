import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  // 여기서 ReactDOM.render의 역할은 브라우저에 있는 실제 DOM 내부에 리액트 컴포넌트 렌더링 하겠다는것을 의미
  <React.StrictMode>
    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
  // id가 root인 DOM을 선택하고 있는데 이 DOM 은 public/index.html 에 있다.
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
