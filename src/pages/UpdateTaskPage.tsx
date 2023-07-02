import React from 'react';
import AddProject from '../components/AddProject';
import styled from 'styled-components';
import { Colors } from '../styles';
import AddTask from '../components/AddTask';
import { useParams } from 'react-router-dom';
import Loading from '../components/UI/Loading';
import { taskApi } from '../store/services/TaskService';

const UpdateTaskPage = () => {
	const { projectId, taskId } = useParams();
	const { data, isLoading } = taskApi.useGetTaskQuery({
		projectId: projectId || '',
		taskId: taskId || '',
	});
	if (isLoading) {
		return <Loading />;
	}
	return (
		<Section>
			<Title>Update Task</Title>
			<AddTask
				dueDate={data?.dueDate}
				type={'update'}
				projectId={projectId || ''}
				description={data?.description}
				taskId={taskId}
				title={data?.title}
				initialTags={data?.tags}
				timer={data?.timer}
			/>
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

export default UpdateTaskPage;
