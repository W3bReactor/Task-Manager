import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { Link } from 'react-router-dom';
import { selectAuthUser } from '../store/auth/selectors';
import { useAppSelector } from '../hooks/useAppSelector';

const NotFound = () => {
	const { id } = useAppSelector(selectAuthUser);
	return (
		<Section>
			<Title>Not Found :(</Title>
			<SubTitle to={`/account/${id}`}>Back</SubTitle>
		</Section>
	);
};
const Section = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 80vh;
`;

const Title = styled.h2`
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
	color: ${Colors.BLACK};
`;

const SubTitle = styled(Link)`
	font-weight: 400;
	font-size: 32px;
	line-height: 38px;

	color: ${Colors.BLACK};
`;

export default NotFound;
