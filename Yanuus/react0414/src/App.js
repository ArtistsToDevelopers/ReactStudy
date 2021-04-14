import { findAllByTestId } from '@testing-library/react';
import React, { useRef, useState } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

function App() {
  const [inputs, setInputs] =useState({
    username: '',
    email: ''
  });
  const {username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'velopert',
        email: 'public.versa@gmail.com',
        active: true
    },
    {
        id:2,
        username: 'tester',
        email: 'tester@gmail.com',
        active: false
    },
    {
        id:3,
        username: 'yanuus',
        email: 'yanuus@gmail.com',
        active: false
    }
]);

  const nextId = useRef(4);
  const onCreate = () =>{
    const user={
      id:nextId.current,
      username,
      email
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: ''
    });

    nextId.current +=1;
  };

  const onRemove = id => {
    //user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬 
    // = user.id가 id인 것을 제거함 
    setUsers(users.filter(user => user.id !== id));
  };
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id == id? {...user, active: !user.active } : user)
    );
  };
  return (
    <>
      <CreateUser 
      username={username} 
      eamil={email}
      onChange={onChange}
      onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} />
    </>
  );
}

export default App;
