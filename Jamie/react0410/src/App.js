import React, { useMemo, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import produce from 'immer'

function countActiveUsers(users) {
	console.log('활성 사용자 수를 세는 중 ...');
	return users.filter(user => user.active).length;
}

const initialState = {
	users: [
		{
			id: 1,
			username: 'jamie',
			email: 'jamie@gmail.com',
			active: true
		},
		{
			id: 2,
			username: 'chicol',
			email: 'chicol@gmail.com',
			active: false
		},
		{
			id: 3,
			username: 'coco',
			email: 'coco@gmail.com',
			active: true
		}
	]
}

function reducer(state, action) {
	switch (action.type) {
		case 'CREATE_USER':
			return produce(state, draft => {
        draft.users.push(action.user);
      })
		case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id)
        user.active = !user.active
      })
		case 'REMOVE_USER':
			return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id)
        draft.users.splice(index, 1)
      })
		default:
			return state
	}
}

// UserDispatch라는 이름으로 export
export const UserDispatch = React.createContext(null);

function App() {

	const [state, dispatch] = useReducer(reducer, initialState)
	const { users } = state;

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		<UserDispatch.Provider value={dispatch}>
			<CreateUser />
			<UserList users={users} />
			<div>활성 사용자 수: {count}</div>
		</UserDispatch.Provider>
	);

}

export default App;