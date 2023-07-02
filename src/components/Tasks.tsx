import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { projectApi } from '../store/services/ProjectService';
import Loading from './UI/Loading';
import TaskBody from './TaskBody';

export const Tasks = () => {
	const { data, isLoading } = projectApi.useGetProjectsWithTasksQuery();

	if (isLoading) {
		return <Loading />;
	}
	return (
		<section>
			<Table>
				<TableHead>
					<tr>
						<TableContentHead>
							<Info>
								<span>#</span>Task name
							</Info>
						</TableContentHead>
						<TableContentHead>
							<Info>Task Tags</Info>
						</TableContentHead>
						<TableContentHead>
							<Info>Hours</Info>
						</TableContentHead>
						<TableContentHead>
							<Info>Task Assign name</Info>
						</TableContentHead>
						<TableContentHead>
							<Info>Due Date</Info>
						</TableContentHead>
					</tr>
				</TableHead>
				{data &&
					data.map((project) => (
						<TaskBody key={project._id} project={project} />
					))}
			</Table>
		</section>
	);
};

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: left;
	margin-top: 20px;
`;

const TableHead = styled.thead`
	background-color: ${Colors.LIGHT};
	border-radius: 4px;
	border: 1px solid ${Colors.LIGHT_GRAY};
`;

const TableContentHead = styled.th`
	padding: 10px 0 10px 13px;

	:not(:last-child) {
		border-right: 1px solid ${Colors.LIGHT_GRAY};
	}
`;

const Info = styled.p`
	color: ${Colors.GRAY};
	font-size: 15px;
	font-weight: 400;
	line-height: 18px;

	span {
		margin-right: 18px;
	}
`;
