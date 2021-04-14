import React, { useRef } from 'react';
import UserList from './UserList';

function App() {
  const users = [
    {
        id: 1,
        username: 'velopert',
        email: 'public.versa@gmail.com'
    },
    {
        id:2,
        username: 'tester',
        email: 'tester@gmail.com'
    },
    {
        id:3,
        username: 'yanuus',
        email: 'yanuus@gmail.com'
    }
];

  const nextId = useRef(4);
  const onCreate = () =>{
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...

    nextId.current +=1;
  };

  return <UserList users={users} /> ;
}

export default App;
