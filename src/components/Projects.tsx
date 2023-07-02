import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import ellipsis from '../assets/images/ellipsis.svg';
import { ProjectCard } from './UI/ProjectCard';
import { projectApi } from '../store/services/ProjectService';
import Loading from './UI/Loading';
import { ProjectResponse } from '../models/response/ProjectResponse';

export const Projects = () => {
	const { data, isLoading } = projectApi.useGetProjectsQuery();
	const countProjects = (data: ProjectResponse[], status: string) => {
		return data &&
			data?.filter((el) => el.status === status).length < 10 &&
			data?.filter((el) => el.status === status).length !== 0
			? `0${data?.filter((el) => el.status === status).length}`
			: data?.filter((el) => el.status === status).length;
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<GridWrapper>
			<GridItem>
				<Content>
					<Content>
						<Title>Waiting</Title>
						<Count>
							({data && data.length !== 0 ? countProjects(data, 'waiting') : 0})
						</Count>
					</Content>
					<Button>
						<img src={ellipsis} alt="Узнать больше" />
					</Button>
				</Content>
				<List>
					{data &&
						data
							.filter((el) => el.status === 'waiting')
							.map((project) => (
								<Item key={project._id}>
									<ProjectCard
										status={project.status}
										admins={project.admins}
										id={project._id}
										workers={project.workers}
										tags={project.tags}
										description={project.description}
										title={project.title}
									/>
								</Item>
							))}
				</List>
			</GridItem>
			<GridItem>
				<Content>
					<Content>
						<Title>In Progress</Title>
						<Count>({data ? countProjects(data, 'in progress') : 0})</Count>
					</Content>
					<Button>
						<img src={ellipsis} alt="Узнать больше" />
					</Button>
				</Content>
				<List>
					{data &&
						data
							.filter((el) => el.status === 'in progress')
							.map((project) => (
								<Item key={project._id}>
									<ProjectCard
										status={project.status}
										admins={project.admins}
										id={project._id}
										workers={project.workers}
										tags={project.tags}
										description={project.description}
										title={project.title}
									/>
								</Item>
							))}
				</List>
			</GridItem>
			<GridItem>
				<Content>
					<Content>
						<Title>Completed</Title>
						<Count>({data ? countProjects(data, 'completed') : 0})</Count>
					</Content>
					<Button>
						<img src={ellipsis} alt="Узнать больше" />
					</Button>
				</Content>
				<List>
					{data &&
						data
							.filter((el) => el.status === 'completed')
							.map((project) => (
								<Item key={project._id}>
									<ProjectCard
										status={project.status}
										admins={project.admins}
										id={project._id}
										workers={project.workers}
										tags={project.tags}
										description={project.description}
										title={project.title}
									/>
								</Item>
							))}
				</List>
			</GridItem>
		</GridWrapper>
	);
};

const GridWrapper = styled.section`
	margin-top: 21px;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 28px;
`;

const GridItem = styled.div`
	grid-column: 4 span;
`;

const Content = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h2`
	margin-right: 10px;
	font-size: 19px;
	font-weight: 500;
	line-height: 22px;
	color: ${Colors.BLACK};
`;

const Count = styled.p`
	font-size: 16px;
	font-weight: 400;
	line-height: 19px;
	color: ${Colors.GRAY};
`;

const Button = styled.button`
	background-color: transparent;
	cursor: pointer;
	outline: none;
	border: none;
`;

const List = styled.ul`
	margin-top: 21px;
	list-style: none;
`;

const Item = styled.li`
	:not(:last-child) {
		margin-bottom: 20px;
	}
`;
