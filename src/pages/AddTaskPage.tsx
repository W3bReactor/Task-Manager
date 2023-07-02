import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import AddTask from '../components/AddTask';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

const AddTaskPage = () => {
	const { projectId } = useParams();
	if (!projectId) {
		return <NotFound />;
	}
	return (
		<Section>
			<Title>New Task</Title>
			<AddTask projectId={projectId} />
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

export default AddTaskPage;
