import React from 'react';
import AddProject from '../components/AddProject';
import styled from 'styled-components';
import { Colors } from '../styles';
import { useParams } from 'react-router-dom';
import { projectApi } from '../store/services/ProjectService';
import Loading from '../components/UI/Loading';

const UpdateProjectPage = () => {
	const { projectId } = useParams();
	const { data, isLoading } = projectApi.useGetProjectQuery(
		projectId ? projectId : ''
	);
	if (isLoading) {
		return <Loading />;
	}
	return (
		<Section>
			<Title>Update Project</Title>
			<AddProject
				type={'update'}
				projectId={projectId}
				title={data?.title}
				initialTags={data?.tags}
				description={data?.description}
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

export default UpdateProjectPage;
