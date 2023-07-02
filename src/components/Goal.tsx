import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';
import { socket } from '../socket';
import Loading from './UI/Loading';

export const Goal = () => {
	const user = useAppSelector(selectAuthUser);
	const [percent, setPercent] = useState(0);
	const [tasksCount, setTasksCount] = useState(0);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		socket.emit('set_prediction', {
			user,
		});
	}, []);

	useEffect(() => {
		const getHandler = (stats: { percent: number; tasks: number }) => {
			setPercent(stats.percent);
			setTasksCount(stats.tasks);
			setLoading(false);
		};
		socket.on('get_prediction', getHandler);
		return () => {
			socket.off('get_prediction', getHandler);
		};
	}, [percent]);
	if (loading) {
		return <Loading />;
	}
	return (
		<Section>
			<Title>Task Target Actual vs Prediction</Title>
			<CircleItem>
				<CircleWrapper viewBox="0 0 36 36" className="circular-chart blue">
					<CircleBackground
						strokeLinecap="round"
						strokeDasharray="50, 100"
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
					<CircleTitle>{tasksCount}</CircleTitle>
					<CircleDesc>Tasks</CircleDesc>
				</CircleContent>
			</CircleItem>
		</Section>
	);
};

const Section = styled.section`
	background-color: ${Colors.LIGHT};
	padding: 19px;
	width: 320px;
	height: 232px;
	border-radius: 10px;
`;

const Title = styled.h2`
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.BLACK};
	margin-bottom: 37px;
`;

const CircleItem = styled.div`
	height: 148px;
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
`;

const CircleContent = styled.div`
	position: absolute;
	bottom: 15px;
	left: 50%;
	transform: translateX(-50%);
`;

const CircleTitle = styled.h3`
	font-size: 32px;
	font-weight: 500;
	line-height: 38px;
	text-align: center;
`;

const CircleDesc = styled.p`
	font-size: 13px;
	font-weight: 400;
	line-height: 15px;
	text-align: center;
	color: ${Colors.GRAY};
`;

const CircleWrapper = styled.svg`
	position: absolute;
	display: block;
	margin: 10px auto;
	max-width: 80%;
	max-height: 250px;
	stroke: ${Colors.PRIMARY};
	transform: rotate(-90deg);
`;

const CircleBackground = styled.path`
	fill: none;
	stroke: #eff2f4;
	stroke-width: 3.5;
`;

const Circle = styled.path`
	fill: none;
	stroke-width: 3.5;
	stroke-linecap: round;
	animation: progress 1s ease-out forwards;
`;
