import React, { FC, useEffect, useState } from 'react';
import TaskTitle from './TaskTitle';
import { Task } from './Task';
import TaskTableAdd from './TaskTableAdd';
import styled from 'styled-components';
import { ProjectWithTasksResponse } from '../models/response/ProjectResponse';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { selectSettingsProject } from '../store/settings/selectors';
import { setSettingsTask } from '../store/settings';
import { useAppSelector } from '../hooks/useAppSelector';

interface TaskBodyProps {
	project: ProjectWithTasksResponse;
}

const TaskBody: FC<TaskBodyProps> = ({ project }) => {
	const [openTask, setOpenTask] = useState(true);
	const task = useAppSelector(selectSettingsProject(project._id));
	const dispatch = useAppDispatch();
	const onOpenTask = (curr: boolean) => {
		setOpenTask((prev) => !prev);
		dispatch(setSettingsTask({ id: project._id, isOpen: !curr }));
	};
	useEffect(() => {
		if (task) {
			setOpenTask(task?.isOpen);
		}
	}, []);
	return (
		<TableBody key={project._id}>
			<TaskTitle
				openTask={openTask}
				setOpenTask={() => onOpenTask(openTask)}
				projectId={project._id}
				title={project.title}
				tasksCount={project.tasks.length}
			/>
			{openTask && (
				<>
					{project.tasks.map((task, i) => (
						<Task
							key={task._id}
							admins={task.admins}
							workers={task.workers}
							title={task.title}
							count={i + 1}
							id={task._id}
							projectId={project._id}
							completed={task.status === 'completed'}
							dueDate={task.dueDate}
							endTime={task.timer}
							tags={task.tags}
							status={task.status}
							comments={task.comments}
							timerPlay={task.timerPlay}
						/>
					))}
					<TaskTableAdd projectId={project._id} />
				</>
			)}
		</TableBody>
	);
};

const TableBody = styled.tbody`
	border-radius: 4px;

	:before {
		content: '';
		display: block;
		height: 20px;
		width: 20px;
	}
`;

export default TaskBody;
