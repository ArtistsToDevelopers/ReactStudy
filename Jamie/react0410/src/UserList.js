import React, { useContext } from 'react';
import { UserDispatch } from './App'

function User({ user, onRemove, onToggle }) {
  const dispatch = useContext(UserDispatch)

  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => {
          dispatch({ type: 'TOGGLE_USER', id: user.id })
        }}
      >{user.username}</b> <span>({user.email})</span>
      {/* 삭제 버튼 렌더링 */}
      <button onClick = {() => {
        dispatch({ type: 'REMOVE_USER', id: user.id });
      }}>삭제</button>
    </div>
  );
}

function UserList({users}) {

  return (
    <div>
      {users.map(user => (
        <User 
        user={user} key={user.id} />
      ))}
    </div>

  );
}
export default React.memo(UserList);