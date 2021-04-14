import './App.css';

import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser'

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'jamie',
      email: 'jamie@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'diana',
      email: 'diana@gmail.com',
      active: false
    },
    {
      id: 3,
      username: 'yannus',
      email: 'yannus@gmail.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    // 나중에 구현할 배열에 항목을 추가하는 로직
    const user = {
      id : nextId.current,
      username,
      email
    };

    setUsers([...users, user]);
    // setUsers(users.concat(user));
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    // user.id가 파라미터로 일치하지 않는 원소들만 추출하여 새로운 배열을 만듦
    // = user.id가 id인 것을 제거
    setUsers(users.filter(user => user.id !== id));
  };

  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? {...user, active : !user.active} : user
      )
    )
  };
  return (
    <>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>
  );

}

export default App;