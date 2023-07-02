import React, { FC, useCallback, useEffect, useState } from 'react';
import { Colors } from '../styles';
import { SvgIcon } from './UI/SvgIcon';
import { getTime } from '../helpers/getTime';
import TimerButton from './UI/TimerButton';
import styled from 'styled-components';
import { socket } from '../socket';
import { taskApi } from '../store/services/TaskService';

const statuses = {
	waiting: Colors.GREEN,
	'in progress': Colors.ORANGE,
	completed: Colors.LIME,
};

const statusesArray = ['waiting', 'in progress'];

interface TimerProps {
	endTime: number;
	timerPlay: number;
	projectId: string;
	taskId: string;
	status: 'waiting' | 'in progress' | 'completed';
}

const Timer: FC<TimerProps> = ({
	timerPlay,
	endTime,
	projectId,
	taskId,
	status,
}) => {
	const [timer, setTimer] = useState(timerPlay);

	useEffect(() => {
		const onChangeTimer = (currTimer: { time: number; taskId: string }) => {
			setTimer(currTimer.time);
		};
		socket.on('timer', onChangeTimer);
		return () => {
			socket.off('timer', onChangeTimer);
		};
	}, [timer]);

	useEffect(() => {
		const onTimerConnected = ({
			initialTimerPlay,
		}: {
			initialTimerPlay: number;
		}) => {
			setTimer(initialTimerPlay);
		};
		socket.on('timer_connected', onTimerConnected);
		return () => {
			socket.off('timer_connected', onTimerConnected);
		};
	}, [timer]);

	useEffect(() => {
		// Connect to timer
		socket.emit('connect_timer', {
			taskId,
		});
		return () => {
			console.log('timer disconnect');
			socket.emit('timer_stop', { taskId });
			socket.emit('leave_timer', { taskId });
		};
	}, []);

	// не трогаем
	window.addEventListener('beforeunload', (event) => {
		socket.emit('timer_stop', { taskId });
		// socket.emit('leave_timer', { taskId });
	});

	// Всё ок
	const onChangeStatus = async (
		type: string,
		currStatus: 'waiting' | 'in progress' | 'completed'
	) => {
		const newStatus =
			statusesArray[
				statusesArray.indexOf(currStatus) === statusesArray.length - 1
					? 0
					: statusesArray.indexOf(currStatus) + 1
			];
		if (newStatus === 'in progress') {
			socket.emit('timer_start', { time: timer, taskId, endTime });
		}

		if (newStatus === 'waiting' || newStatus === 'completed') {
			socket.emit('timer_stop', { taskId, type });
		}
	};

	return (
		<Wrapper>
			<Time>
				{getTime(timer)} / {getTime(endTime)}
			</Time>
			<TimerPlayer>
				<SvgIcon color={Colors.GRAY} size={50} name={'speed'} />
				<TimerButton
					onClick={() => onChangeStatus('work', status)}
					size={30}
					color={statuses[status]}
					svgName={status === 'waiting' ? 'arrow-right' : 'pause'}
				/>
				{status === 'in progress' && (
					<TimerButton
						onClick={() => onChangeStatus('complete', status)}
						size={28}
						color={Colors.RED}
						svgName={'stop'}
					/>
				)}
			</TimerPlayer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-top: 35px;
	margin-bottom: 35px;
	width: 100%;
	padding: 55px 0;
	border-radius: 10px;
	border: 1px solid ${Colors.BLACK};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Time = styled.h4`
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
	color: ${Colors.BLACK};
	margin-bottom: 15px;
`;

const TimerPlayer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid ${Colors.BLACK};
	width: 282px;
	padding: 10px;
`;

export default Timer;
