import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../styles';
import UsersList from '../components/UI/UsersList';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/UI/Loading';
import { taskApi } from '../store/services/TaskService';
import NotFound from './NotFound';
import ItemInfo from '../components/ItemInfo';
import SimpleButton from '../components/UI/SimpleButton';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';
import Timer from '../components/Timer';
import Comments from '../components/Comments';
import ChangeStatus from '../components/ChangeStatus';
import { socket } from '../socket';

const TaskPage = () => {
	const { projectId, taskId } = useParams();
	const ref = useRef(false);
	const [deleteTask] = taskApi.useDeleteTaskMutation();
	const { data, isLoading } = taskApi.useGetTaskQuery({
		projectId: projectId || '',
		taskId: taskId || '',
	});
	const [status, setStatus] = useState<
		'waiting' | 'completed' | 'in progress'
	>();
	const user = useAppSelector(selectAuthUser);
	const isWorker = data?.workers.some((worker) => worker._id === user.id);
	useEffect(() => {
		const statusChange = (newStatus: {
			status: 'waiting' | 'completed' | 'in progress';
			taskId: string;
		}) => {
			setStatus(newStatus.status);
		};

		socket.on('status', statusChange);
		return () => {
			socket.off('status', statusChange);
		};
	}, [status]);

	useEffect(() => {
		if (!ref.current) {
			if (isWorker) {
				socket.emit('connect_task_worker', {
					taskId,
				});
				ref.current = true;
			} else if (isWorker === false) {
				socket.emit('connect_task', {
					taskId,
				});
				ref.current = true;
			}
		}

		return () => {
			if (isWorker) {
				socket.emit('disconnect_task_worker', {
					taskId,
				});
				ref.current = true;
			} else if (isWorker === false) {
				socket.emit('disconnect_task', {
					taskId,
				});
				ref.current = true;
			}
		};
	}, [data]);

	const { id } = useAppSelector(selectAuthUser);
	const navigate = useNavigate();
	const isAdmin = data && data.admins.some((admin) => admin._id === id);
	const onDeleteTask = () => {
		deleteTask({
			projectId: projectId || '',
			taskId: taskId || '',
		});
		navigate('/task/');
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			{data ? (
				<>
					<Section>
						<LeftItem>
							<ItemInfo
								title={data.title}
								status={status || data.status}
								tags={data.tags}
								description={data.description}
							/>
							{isWorker && (
								<>
									{data.timer !== 0 && status !== 'completed' ? (
										<Timer
											status={status || data.status}
											taskId={data._id}
											projectId={projectId || ''}
											timerPlay={data.timerPlay}
											endTime={data.timer}
										/>
									) : (
										<ChangeStatus
											taskId={taskId || ''}
											projectId={projectId || ''}
											status={status || data.status}
										/>
									)}
									<Comments />
								</>
							)}
						</LeftItem>
						<RightItem>
							<UsersList
								projectId={projectId || ''}
								admins={data.admins}
								workers={data.workers}
							/>
							{isAdmin && (
								<ButtonWrapper>
									<SimpleButton
										styles={SimpleLinkStyles}
										type={'link'}
										to={`/project/${projectId}/task/${taskId}/update`}
									>
										Update Task
									</SimpleButton>

									<SimpleButton
										onClick={onDeleteTask}
										styles={SimpleButtonStyles}
										type={'button'}
									>
										Delete Task
									</SimpleButton>
								</ButtonWrapper>
							)}
						</RightItem>
					</Section>
				</>
			) : (
				<NotFound />
			)}
		</>
	);
};

const SimpleButtonStyles = css`
	color: ${Colors.RED};
	transition: all 0.3s linear;

	:hover {
		background-color: ${Colors.LIGHT_GRAY};
	}
`;
const SimpleLinkStyles = css`
	margin-right: 15px;
	color: ${Colors.BLACK};
	transition: all 0.3s linear;

	:hover {
		background-color: ${Colors.LIGHT_GRAY};
	}
`;
const ButtonWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	margin-top: auto;
`;

const Section = styled.section`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	min-height: 80vh;
	background-color: ${Colors.LIGHT};
	border-radius: 10px;
	padding: 24px;
`;

const LeftItem = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 7 span;
	margin-right: 50px;
`;

const RightItem = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 5 span;
	max-height: max-content;
`;

export default TaskPage;
