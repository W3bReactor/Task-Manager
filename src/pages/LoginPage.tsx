import React from 'react';
import Login from '../components/Login';
import styled from 'styled-components';
import { Colors } from '../styles';

const LoginPage = () => {
	return (
		<>
			<Title>Welcome!</Title>
			<SubTitle>Please login to use the app</SubTitle>
			<Login />
		</>
	);
};
const Title = styled.h2`
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
	color: ${Colors.BLACK};
`;

const SubTitle = styled.h3`
	margin-bottom: 46px;
	font-weight: 400;
	font-size: 32px;
	line-height: 38px;
	color: ${Colors.BLACK};
`;
export default LoginPage;
