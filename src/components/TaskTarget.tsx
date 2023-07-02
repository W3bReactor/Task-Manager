import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../styles';
import { Info } from './UI/Info';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';
import { socket } from '../socket';
import Loading from './UI/Loading';

export const TaskTarget = () => {
	const user = useAppSelector(selectAuthUser);
	const [percent, setPercent] = useState(0);
	const [tasksCount, setTasksCount] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		socket.emit('set_completed', {
			user,
		});
	}, []);

	useEffect(() => {
		const getHandler = (stats: { percent: number; tasks: number }) => {
			setPercent(stats.percent);
			setTasksCount(stats.tasks);
			setLoading(false);
		};
		socket.on('get_completed', getHandler);
		return () => {
			socket.off('get_completed', getHandler);
		};
	}, [percent]);
	if (loading) {
		return <Loading />;
	}
	return (
		<Section>
			<Title>Complete Task Target</Title>
			<CircleItem>
				<CircleWrapper viewBox="0 0 36 36" className="circular-chart blue">
					<CircleBackground
						strokeLinecap="round"
						strokeDasharray="100, 100"
						d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
					<Circle
						strokeDasharray={`${percent}, 100`}
						d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
				</CircleWrapper>
				<CircleContent>
					<CircleTitle>{percent}%</CircleTitle>
					<CircleDesc>Task</CircleDesc>
				</CircleContent>
			</CircleItem>
			<Info
				count={tasksCount}
				title={'Completed Task'}
				category={'Global'}
				svgName={'play'}
				svgColor={Colors.LIME}
				borderColor={Colors.LIGHT_LIME}
				svgSize={16}
				styles={InfoStyles}
			/>
		</Section>
	);
};

const InfoStyles = css`
	margin-top: auto;
`;

const Section = styled.section`
	width: 269px;
	height: 353px;
	background-color: ${Colors.LIGHT};
	padding: 19px;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
`;

const Title = styled.h2`
	margin-bottom: 40px;
	font-weight: 500;
	font-size: 17px;
	line-height: 20px;
	color: ${Colors.BLACK};
`;

const CircleItem = styled.div`
	margin: 0 auto;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 155px;
	width: 155px;
`;

const CircleWrapper = styled.svg`
	position: absolute;
	display: block;
	margin: 10px auto;
	max-width: 80%;
	max-height: 155px;
	stroke: ${Colors.LIME};
`;

const CircleBackground = styled.path`
	fill: none;
	stroke: #eff2f4;
	stroke-width: 4.3;
`;

const Circle = styled.path`
	fill: none;
	stroke-width: 4.3;
	stroke-linecap: round;
	animation: progress 1s ease-out forwards;
`;
const CircleContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const CircleTitle = styled.h3`
	font-size: 31px;
	font-weight: 600;
	line-height: 37px;
`;

const CircleDesc = styled.p`
	font-size: 14px;
	font-weight: 400;
	line-height: 16px;
	text-align: center;
	color: ${Colors.GRAY};
`;
