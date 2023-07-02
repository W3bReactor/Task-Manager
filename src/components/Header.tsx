import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser, selectIsAuth } from '../store/auth/selectors';
import HeaderAuth from './HeaderAuth';
import { setActiveMenu } from '../store/settings';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const Header = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	const { id } = useAppSelector(selectAuthUser);
	return (
		<HeaderWrapper>
			<LogoWrapper
				onClick={() => dispatch(setActiveMenu(999))}
				to={isAuth ? `/account/${id}` : '/register'}
			>
				<LazyLoadImage effect="blur" src={logo} height={42} width={42} />
				<LogoName>Task-Manager</LogoName>
			</LogoWrapper>
			{isAuth && <HeaderAuth />}
		</HeaderWrapper>
	);
};

const HeaderWrapper = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 12px 0;
	justify-content: space-between;
`;

const LogoWrapper = styled(Link)`
	text-decoration: none;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const LogoName = styled.h1`
	font-weight: 600;
	font-size: 30px;
	line-height: 35px;
	letter-spacing: 0.05em;
	color: ${Colors.BLACK};
	margin-left: 10px;
`;
