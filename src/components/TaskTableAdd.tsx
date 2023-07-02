import React, { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { Link } from 'react-router-dom';

interface TaskTableAdd {
	projectId: string;
}

const TaskTableAdd: FC<TaskTableAdd> = ({ projectId }) => {
	return (
		<Stroke>
			<MainTableContent>
				<Content>
					<AddLink to={`/project/${projectId}/task/add`}>+ Add New</AddLink>
				</Content>
			</MainTableContent>
			<TableContentBody></TableContentBody>
			<TableContentBody></TableContentBody>
			<TableContentBody></TableContentBody>
			<TableContentBody></TableContentBody>
		</Stroke>
	);
};
const Content = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
`;

const TableContentBody = styled.td`
	padding: 15px 0 15px 10px;

	:not(:last-child) {
		border-right: 1px solid ${Colors.LIGHT_GRAY};
	}

	:first-child {
		padding-left: 15px;
	}
`;

const Stroke = styled.tr`
	border-left: 1px solid ${Colors.LIGHT_GRAY};
	border-right: 1px solid ${Colors.LIGHT_GRAY};
	background-color: ${Colors.LIGHT};
	border-bottom: 1px solid ${Colors.LIGHT_GRAY};

	:first-child {
		border-top: 1px solid ${Colors.LIGHT_GRAY};
	}
`;

const MainTableContent = styled.td`
	padding: 15px 0 15px 15px;

	:not(:last-child) {
		border-right: 1px solid ${Colors.LIGHT_GRAY};
	}
`;

const AddLink = styled(Link)`
	margin-left: 60px;
	text-decoration: none;
	display: block;
	font-weight: 400;
	font-size: 15px;
	line-height: 18px;
	color: ${Colors.GRAY};
`;

export default TaskTableAdd;
