import React, { FC } from 'react';
import arrow from '../assets/images/arrow-down.svg';
import styled from 'styled-components';
import { Colors } from '../styles';
import { Link } from 'react-router-dom';

interface TaskTitle {
	title: string;
	tasksCount: number;
	projectId: string;
	setOpenTask: () => void;
	openTask: boolean;
}

const TaskTitle: FC<TaskTitle> = ({
	title,
	tasksCount,
	projectId,
	setOpenTask,
	openTask,
}) => {
	return (
		<Stroke openTask={openTask}>
			<MainTableContent>
				<Content>
					<Button>
						<Arrow
							openTask={openTask}
							onClick={setOpenTask}
							src={arrow}
							alt="Показать больше"
						/>
					</Button>
					<TitleLink to={`/project/${projectId}`}>
						<Title>{title}</Title>
					</TitleLink>
					<Count>({tasksCount < 10 ? `0${tasksCount}` : tasksCount})</Count>
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

const Arrow = styled.img<{ openTask: boolean }>`
	transition: all 0.3s linear;
	transform: rotate(${(props) => (props.openTask ? '0deg' : '-90deg')});
`;

const Stroke = styled.tr<{ openTask: boolean }>`
	border-left: 1px solid ${Colors.LIGHT_GRAY};
	border-right: 1px solid ${Colors.LIGHT_GRAY};
	background-color: ${Colors.LIGHT};
	border-bottom: 1px solid
		${(props) => (props.openTask ? 'trasparent' : Colors.LIGHT_GRAY)};

	:not(:last-child) {
		border-bottom: 1px solid ${Colors.LIGHT_GRAY};
	}
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

const TitleLink = styled(Link)`
	text-decoration: none;
`;

const Title = styled.h2`
	margin-left: 33px;
	color: ${Colors.BLACK};
	font-size: 19px;
	font-weight: 500;
	line-height: 22px;
`;

const Count = styled.p`
	margin-left: 11px;
	font-size: 15px;
	font-weight: 400;
	line-height: 18px;
	color: ${Colors.GRAY};
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`;
export default TaskTitle;
