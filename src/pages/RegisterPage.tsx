import React from 'react';
import Register from '../components/Register';
import styled from 'styled-components';
import { Colors } from '../styles';

const RegisterPage = () => {
	return (
		<>
			<Title>Welcome!</Title>
			<SubTitle>Please register to use the app</SubTitle>
			<Register />
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

export default RegisterPage;
