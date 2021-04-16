import React, { useState, useRef } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
	const [inputs, setInputs] = useState({
		username : '',
		email : ''
	});

	const {username, email} = inputs;
	const onChange = e => {
		const {name, value} = e.target;
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
			active : true
		},
		{
			id: 2,
			username: 'chicol',
			email: 'chicol@gmail.com',
			active : false
		},
		{
			id: 3,
			username: 'coco',
			email: 'coco@gmail.com',
			active : true
		}
	]);
	const nextId = useRef(4);

	const onCreate = () => {
		const user = {
			id : nextId.current,
			username,
			email
		};
		setUsers([...users, user]);

		setInputs({
			username: '',
			email : ''
		});
		nextId.current += 1;
	};

	const onRemove = id => {
		// user.id가 파라미터로 일치하지 않는 원소들만 추출하여 새로운 배열을 만듦.
		// == user.id가 id와 일치하는 것을 빼고 원소 추출 -> 새로운 배열 만들기
		setUsers(users.filter(user => user.id !== id));
	};

	const onToggle = id => {
		setUsers(
			users.map(user => 
				user.id === id ? {...user, active: !user.active} : user
				)
		)
	}
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