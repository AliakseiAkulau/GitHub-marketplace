import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from './components/Logo';
import { Button } from '../../common/Button';
import { checkAuth, deleteUserFromLS, getFromLS } from '../../helpers/auth';
import { getUserSelector } from '../../store/selectors';
import {
	LOGO_URL,
	LOGO_ALT_TEXT,
	LOGOUT_BTN_CLASS_NAME,
	LOGOUT_LABEL,
} from '../../constants';
import './header.scss';
import { deleteUserThunk, getUserMe } from '../../store/user/thunk';

const Header = () => {
	const history = useHistory();
	const { name, isAuth, token } = useSelector(getUserSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (checkAuth()) {
			dispatch(getUserMe(getFromLS('token')));
		} else {
			history.push('/login');
		}
	}, [dispatch, history]);

	const handleLogOff = () => {
		dispatch(deleteUserThunk(token));
		deleteUserFromLS();
		history.push('/login');
	};

	return (
		<>
			{name && isAuth && <Redirect to='/courses' />}
			<header className='header'>
				<div className='header-logo-wrapper'>
					<Logo
						url={process.env.PUBLIC_URL + LOGO_URL}
						altText={LOGO_ALT_TEXT}
						className='logo'
					/>
				</div>
				<div className='header-content-wrapper'>
					<h2 className='nickname'>{name ? name : 'unauthorized'}</h2>
					<Button
						btnText={LOGOUT_LABEL}
						btnClassName={LOGOUT_BTN_CLASS_NAME}
						isDisabled={!isAuth}
						onClick={handleLogOff}
					/>
				</div>
			</header>
		</>
	);
};

export default Header;
