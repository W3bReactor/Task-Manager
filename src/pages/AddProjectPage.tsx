import React from 'react';
import AddProject from '../components/AddProject';
import styled from 'styled-components';
import { Colors } from '../styles';

const AddProjectPage = () => {
	return (
		<Section>
			<Title>New Project</Title>
			<AddProject />
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
	margin-bottom: 28px;
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
	color: ${Colors.BLACK};
`;

export default AddProjectPage;
