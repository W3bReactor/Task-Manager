import React, { FC, useEffect, useState } from 'react';
import { Colors } from '../styles';
import TimerButton from './UI/TimerButton';
import styled, { css } from 'styled-components';
import { socket } from '../socket';

const statuses = {
	waiting: Colors.GREEN,
	'in progress': Colors.ORANGE,
	completed: Colors.LIME,
};

const statusesArray = ['waiting', 'in progress'];

interface ChangeStatusProps {
	status: 'waiting' | 'in progress' | 'completed';
	projectId: string;
	taskId: string;
}

const ChangeStatus: FC<ChangeStatusProps> = ({
	status: initialStatus,
	taskId,
	projectId,
}) => {
	const [status, setStatus] = useState(initialStatus || 'waiting');
	useEffect(() => {
		const onChangeTimer = (currStatus: {
			status: 'waiting' | 'in progress' | 'completed';
			taskId: string;
		}) => {
			setStatus(currStatus.status || 'waiting');
		};
		socket.on('status', onChangeTimer);
		return () => {
			socket.off('status', onChangeTimer);
		};
	}, [status]);
	useEffect(() => {
		window.addEventListener('beforeunload', (event) => {
			socket.emit('status_stop', { taskId });
		});
		setStatus(initialStatus || 'waiting');
		return () => {
			socket.emit('status_stop', { taskId });
		};
	}, []);

	const onChangeStatus = (
		type: string,
		currStatus: 'waiting' | 'in progress' | 'completed'
	) => {
		const newStatus =
			statusesArray[
				statusesArray.indexOf(currStatus) === statusesArray.length - 1
					? 0
					: statusesArray.indexOf(currStatus) + 1
			];

		if (newStatus === 'in progress' && type === 'work') {
			socket.emit('status_start', { taskId });
		}
		if (newStatus === 'waiting' && type === 'work') {
			socket.emit('status_stop', { taskId });
		}
		if (type === 'complete') {
			socket.emit('status_complete', { taskId });
		}
	};

	return (
		<Wrapper>
			<Status color={statuses[status]} bordercolor={statuses[status]}>
				{status || initialStatus}
			</Status>
			<StatusButtons>
				{status !== 'completed' && (
					<TimerButton
						onClick={() => onChangeStatus('work', status)}
						size={30}
						color={statuses[status]}
						svgName={status === 'waiting' ? 'arrow-right' : 'pause'}
					/>
				)}
				{status === 'in progress' && (
					<TimerButton
						onClick={() => onChangeStatus('complete', status)}
						styles={TimerButtonStyles}
						size={28}
						color={Colors.RED}
						svgName={'stop'}
					/>
				)}
			</StatusButtons>
		</Wrapper>
	);
};

const TimerButtonStyles = css`
	margin-left: 15px;
`;

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

const StatusButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Status = styled.div<{ color?: Colors; bordercolor?: Colors }>`
	border-radius: 5px;
	margin-bottom: 12px;
	padding: 30px 80px;
	border: 1px solid
		${(props) => (props.bordercolor ? props.bordercolor : Colors.BLACK)};
	color: ${(props) => (props.color ? props.color : Colors.BLACK)};
	font-weight: 400;
	font-size: 28px;
	line-height: 33px;
	text-transform: capitalize;
`;

export default ChangeStatus;
