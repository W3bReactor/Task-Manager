import React, { FC, useEffect, useState } from 'react';
import { SvgIcon } from './UI/SvgIcon';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled, { css } from 'styled-components';
import { Colors } from '../styles';
import { Tag } from './UI/Tag';
import { Link } from 'react-router-dom';
import { UserResponse } from '../models/response/UserResponse';
import Moment from 'react-moment';
import { socket } from '../socket';
import { getTime } from '../helpers/getTime';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';

interface TaskProps {
	id: string;
	count: number;
	completed: boolean;
	title: string;
	dueDate: Date;
	tags: string[];
	projectId: string;
	admins: UserResponse[];
	workers: UserResponse[];
	status: 'waiting' | 'in progress' | 'completed';
	comments: string[];
	endTime: number;
	timerPlay: number;
}

const statuses = {
	waiting: Colors.GREEN,
	'in progress': Colors.ORANGE,
	completed: Colors.LIME,
};

const dateColors = {
	initial: Colors.BLACK,
	completed: Colors.LIME,
	failed: Colors.RED,
};

export const Task: FC<TaskProps> = ({
	completed,
	id,
	count,
	title,
	timerPlay,
	endTime,
	dueDate,
	tags,
	projectId,
	workers,
	admins,
	status: initialStatus,
	comments,
}) => {
	const getFullName = (name: string, surname: string) => {
		const fullName = `${name} ${surname}`;
		return `${fullName.slice(0, 6).trim()}...`;
	};
	const [status, setStatus] = useState<
		'waiting' | 'completed' | 'in progress'
	>();
	const [timer, setTimer] = useState(timerPlay);
	useEffect(() => {
		// Connect to task
		socket.emit('connect_task', {
			taskId: id,
		});

		return () => {
			socket.emit('disconnect_task', {
				taskId: id,
			});
			socket.emit('leave_timer', { taskId: id });
		};
	}, []);

	useEffect(() => {
		const onChangeTimer = (currTimer: { time: number; taskId: string }) => {
			if (currTimer.taskId === id) {
				setTimer(currTimer.time);
			}
		};
		socket.on('timer', onChangeTimer);
		return () => {
			socket.off('timer', onChangeTimer);
		};
	}, [timer]);

	useEffect(() => {
		const statusChange = (newStatus: {
			status: 'waiting' | 'completed' | 'in progress';
			taskId: string;
		}) => {
			if (newStatus.taskId === id) {
				setStatus(newStatus.status);
			}
		};
		socket.on('status', statusChange);

		return () => {
			socket.off('status', statusChange);
		};
	}, [status]);

	const getColorDate = () => {
		if (
			new Date(dueDate) < new Date() &&
			!completed &&
			new Date(dueDate).getDay() !== new Date().getDay()
		) {
			return dateColors.failed;
		}
		if (completed) {
			return dateColors.completed;
		}
		return dateColors.initial;
	};

	const getColorTimer = () => {
		if (status === 'completed') {
			return Colors.LIME;
		}
		if (timer > endTime) {
			return Colors.RED;
		}

		return Colors.BLACK;
	};

	const calendarStrings = {
		lastDay: '[Yesterday] ',
		sameDay: '[Today]',
		nextDay: '[Tomorrow]',
		lastWeek: '[last] dddd',
		nextWeek: 'dddd',
		sameElse: 'DD MMMM, YYYY',
	};
	console.log(status);
	return (
		<Stroke>
			<TableContentBody>
				<Status status={statuses[status || initialStatus]} />
				<Content>
					<Number>{count < 10 ? `0${count}` : count}</Number>
					<SvgIcon
						styles={
							status === 'completed'
								? SvgIconActiveStyles
								: SvgIconDisabledStyles
						}
						name={'complete'}
						size={9}
					/>
					<TitleLink to={`/project/${projectId}/task/${id}`}>
						<TaskTitle>{title}</TaskTitle>
					</TitleLink>
					{comments.length > 0 && (
						<CommentsInfo>
							<CommentsCount>{comments.length}</CommentsCount>
							<SvgIcon size={14} name={'small_message'} />
						</CommentsInfo>
					)}
				</Content>
			</TableContentBody>
			<TableContentBody>
				<Tags>
					{tags
						.filter((el, i) => i === 0)
						.map((tag) => (
							<TagItem key={tag}>
								<Tag>{tag}</Tag>
							</TagItem>
						))}
					{tags.length > 1 && <MoreTags>+{tags.length - 1}</MoreTags>}
				</Tags>
			</TableContentBody>
			<TableContentBody>
				{endTime !== 0 && (
					<TimerText color={getColorTimer()}>{`${getTime(timer)} / ${getTime(
						endTime
					)}`}</TimerText>
				)}
			</TableContentBody>
			<TableContentBody>
				<Content>
					{workers.length > 1 &&
						workers.map((worker) => (
							<Avatar
								key={worker._id}
								effect={'blur'}
								width={31}
								height={31}
								src={
									worker.avatar
										? `${process.env.REACT_APP_SERVER_URL}/api/uploads/${worker.avatar}`
										: `${process.env.REACT_APP_SERVER_URL}/api/uploads/user.png`
								}
								alt={worker.name}
							/>
						))}
					{workers.length === 1 &&
						workers.map((worker) => (
							<React.Fragment key={worker._id}>
								<Avatar
									key={worker._id}
									effect={'blur'}
									width={31}
									height={31}
									src={
										worker.avatar
											? `${process.env.REACT_APP_SERVER_URL}/api/uploads/${worker.avatar}`
											: `${process.env.REACT_APP_SERVER_URL}/api/uploads/user.png`
									}
									alt={worker.name}
								/>
								<Name>{getFullName(worker.name, worker.surname)}</Name>
							</React.Fragment>
						))}
				</Content>
			</TableContentBody>
			<TableContentBody>
				<DueDate color={getColorDate()} calendar={calendarStrings}>
					{dueDate}
				</DueDate>
			</TableContentBody>
		</Stroke>
	);
};

const DueDate = styled(Moment)<{ color: Colors }>`
	font-weight: 400;
	font-size: 15px;
	line-height: 18px;
	color: ${(props) => props.color};
`;

const SvgIconStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	fill: none;
	border-radius: 100%;
	width: 20px;
	height: 20px;
	padding-left: 4px;
	padding-top: 5px;
	transition: all 0.3s;
`;

const Avatar = styled(LazyLoadImage)`
	border-radius: 100%;
`;
const SvgIconActiveStyles = css`
	${SvgIconStyles};
	border: 1px solid ${Colors.LIME};
	background-color: ${Colors.LIME};
	stroke: ${Colors.LIGHT};
`;
const SvgIconDisabledStyles = css`
	${SvgIconStyles};
	border: 1px solid ${Colors.GRAY};
	stroke: ${Colors.GRAY};
`;
const Content = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
`;
const Status = styled.div<{ status: Colors }>`
	position: absolute;
	top: 0;
	left: 0;
	background-color: ${(props) => props.status};
	height: 100%;
	width: 4px;
`;
const Number = styled.p`
	margin-right: 11px;
	color: ${Colors.BLACK};
	font-size: 15px;
	font-weight: 400;
	line-height: 18px;
`;
const TitleLink = styled(Link)`
	text-decoration: none;
`;

const TimerText = styled.p<{ color: Colors }>`
	font-weight: 400;
	font-size: 15px;
	line-height: 18px;
	color: ${(props) => props.color};
`;

const TaskTitle = styled.h3`
	margin-left: 14px;
	font-size: 15px;
	font-weight: 400;
	line-height: 18px;
	color: ${Colors.BLACK};
`;

const MoreTags = styled.div`
	font-weight: 500;
	font-size: 13px;
	line-height: 15px;
	color: ${Colors.BLACK};
	padding: 8px;
	border: 1px solid ${Colors.LIGHT_GRAY};
	border-radius: 4px;
`;

const CommentsInfo = styled.div`
	display: flex;
	align-items: center;
	margin-left: 30px;
`;

const CommentsCount = styled.p`
	font-weight: 400;
	font-size: 15px;
	line-height: 18px;
	margin-right: 4px;
	color: ${Colors.GRAY};
`;

const Name = styled.p`
	margin-left: 7px;
	font-size: 15px;
	font-weight: 400;
	line-height: 18px;
	color: ${Colors.BLACK};
`;
const TableContentBody = styled.td`
	position: relative;
	padding: 15px 0 15px 10px;

	:not(:last-child) {
		border-right: 1px solid ${Colors.LIGHT_GRAY};
	}

	:first-child {
		padding-left: 15px;
	}
`;
const Stroke = styled.tr`
	border-bottom: 1px solid ${Colors.LIGHT_GRAY};
	border-left: 1px solid ${Colors.LIGHT_GRAY};
	border-right: 1px solid ${Colors.LIGHT_GRAY};
	background-color: ${Colors.LIGHT};

	:first-child {
		border-top: 1px solid ${Colors.LIGHT_GRAY};
	}

	transition: height 0.3s ease-in-out;
`;

const Tags = styled.ul`
	display: flex;
	align-items: center;
`;

const TagItem = styled.li`
	display: inline-block;

	:not(:last-child) {
		margin-right: 5px;
	}
`;
