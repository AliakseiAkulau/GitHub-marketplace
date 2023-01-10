import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { Label } from '../../common/Label';
import { logInUserThunk } from '../../store/user/thunk';
import { getUserSelector } from '../../store/selectors';
import './login.scss';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { error: isError } = useSelector(getUserSelector);
	const dispatch = useDispatch();

	const onPasswordChange = (value) => {
		setPassword(value);
	};
	const onEmailChange = (value) => {
		setEmail(value);
	};

	const handleSubmit = () => {
		dispatch(logInUserThunk(email, password));
	};

	return (
		<div className='login'>
			<h1 className='login-header'>Login</h1>
			<form className='login-form' onSubmit={handleSubmit}>
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
					btnText='Login'
					btnClassName='login-btn'
					onClick={handleSubmit}
				/>
			</form>
			<div className='redirect-link'>
				<span>
					If you not have an account you can{' '}
					<Link to={`/registration`}>Register</Link>
				</span>
			</div>
			{isError ? <span className='error'> Login error </span> : null}
		</div>
	);
};

export default Login;
