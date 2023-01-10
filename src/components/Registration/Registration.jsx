import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { Label } from '../../common/Label';
import { registerUser } from '../../servisces';
import './registration.scss';

const Registration = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [isError, setIsError] = useState(false);

	const history = useHistory();

	const onNameChange = (value) => {
		setName(value);
	};

	const onPasswordChange = (value) => {
		setPassword(value);
	};

	const onEmailChange = (value) => {
		setEmail(value);
	};

	// TODO rewrite for thunks ?
	const regUser = async () => {
		const res = await registerUser({
			name: name,
			email: email,
			password: password,
		});
		if (res === false) {
			setIsError(true);
			return;
		}
		setTimeout(() => {
			history.push('/login');
		}, 100);
	};

	const handleSubmit = async () => {
		await regUser();
	};

	return (
		<div className='registration'>
			<h1 className='registration-header'>Registration</h1>
			<form className='registration-form' onSubmit={handleSubmit}>
				<Label id='name' labelText='Name'>
					<Input
						id='name'
						inputClassName='name-input'
						onChange={onNameChange}
						value={name}
						placeholder='Enter name'
					/>
				</Label>
				<Label id='email' labelText='Email'>
					<Input
						id='email'
						inputClassName='email-input'
						onChange={onEmailChange}
						value={email}
						placeholder='Enter email'
					/>
				</Label>
				<Label id='password' labelText='Password'>
					<Input
						id='password'
						inputClassName='password-input'
						onChange={onPasswordChange}
						value={password}
						placeholder='Enter password'
						type='password'
					/>
				</Label>
				<Button
					btnText='Registration'
					btnClassName='registration-btn'
					onClick={handleSubmit}
				/>
			</form>
			<div className='redirect-link'>
				<span>
					If you have an account you can <Link to={`/login`}>Login</Link>
				</span>
			</div>
			{isError ? <span className='error'> Registration error </span> : null}
		</div>
	);
};

export default Registration;
