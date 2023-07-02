import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import ItemInfo from '../components/ItemInfo';
import ProjectParams from '../components/ProjectParams';
import Loading from '../components/UI/Loading';
import { projectApi } from '../store/services/ProjectService';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

const ProjectPage = () => {
	const { projectId } = useParams();
	const { data, isLoading } = projectApi.useGetProjectQuery(
		projectId ? projectId : ''
	);
	if (isLoading) {
		return <Loading />;
	}
	return (
		<Section>
			{data ? (
				<>
					<ItemInfo
						title={data.title}
						status={data.status}
						tags={data.tags}
						description={data.description}
					/>
					<ProjectParams
						status={data.status}
						projectId={data._id}
						workers={data.workers}
						admins={data.admins}
					/>
				</>
			) : (
				<NotFound />
			)}
		</Section>
	);
};

const Section = styled.section`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	min-height: 80vh;
	background-color: ${Colors.LIGHT};
	border-radius: 10px;
	padding: 24px;
`;
export default ProjectPage;
