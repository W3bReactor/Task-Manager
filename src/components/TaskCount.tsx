import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../styles';
import { Info } from './UI/Info';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';
import { IStats } from './TotalStats';
import { socket } from '../socket';
import Loading from './UI/Loading';

interface Count {
	fullDate: Date;
	date: string;
	tasks: number;
	percent: number;
}
export const TaskCount = () => {
	const user = useAppSelector(selectAuthUser);
	const [counts, setCounts] = useState<Count[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		socket.emit('set_count', {
			user,
		});
	}, []);
	useEffect(() => {
		const getHandler = (stats: Count[]) => {
			setCounts(stats);
			setLoading(false);
		};
		socket.on('get_count', getHandler);
		return () => {
			socket.off('get_count', getHandler);
		};
	}, [counts]);
	if (loading) {
		return <Loading />;
	}
	return (
		<Section>
			<Title>Task Count</Title>
			<List>
				{counts.map((count) => (
					<ListItem key={count.date}>
						<ProgressWrapper percent={count.percent}>
							<Progress percent={70}></Progress>
						</ProgressWrapper>
						<ProgressMonth>{count.date}</ProgressMonth>
					</ListItem>
				))}
			</List>

			<Info
				count={245}
				borderColor={Colors.LIGHT_AQUA}
				svgColor={Colors.AQUA}
				svgName={'packet'}
				title={'Expanslon Europo'}
				category={'Global'}
				styles={InfoStyles}
			/>
			<Info
				count={122}
				borderColor={Colors.LIGHT_ORANGE}
				svgColor={Colors.ORANGE}
				svgName={'wallet'}
				title={'Payment Promo'}
				category={'Commercial'}
			/>
		</Section>
	);
};

const InfoStyles = css`
	margin-top: auto;
	margin-bottom: 12px;
`;

const Section = styled.section`
	border-radius: 10px;
	margin-left: 20px;
	height: 353px;
	width: 269px;
	background-color: ${Colors.LIGHT};
	padding: 19px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	margin-bottom: 20px;
	font-weight: 500;
	font-size: 17px;
	line-height: 20px;
	color: ${Colors.BLACK};
`;

const List = styled.ul`
	list-style: none;
	height: 140px;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	margin-bottom: 33px;
`;

const ListItem = styled.li`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	height: 100%;
	:not(:last-child) {
		margin-right: 19px;
	}
`;

const ProgressWrapper = styled.div<{ percent: number }>`
	position: relative;
	background-color: ${Colors.LIGHT_GRAY};
	width: 30px;
	height: ${(props) => `${props.percent}%`};
	border-radius: 9px 9px 0 0;
`;

const Progress = styled.div<{ percent: number }>`
	position: absolute;
	bottom: 0;
	left: 0;
	background-color: ${Colors.PRIMARY};
	width: 100%;
	height: ${(props) => `${props.percent}%`};
	border-radius: 9px 9px 0 0;
	animation: progressVertical 1s ease-in-out forwards;
`;

const ProgressMonth = styled.p`
	margin-top: 3px;
	font-weight: 400;
	font-size: 13px;
	line-height: 15px;
	color: ${Colors.GRAY};
`;
