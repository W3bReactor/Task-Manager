import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectTotalItems } from '../store/total/selectors';
import { SvgIcon } from './UI/SvgIcon';
import { selectAuthUser } from '../store/auth/selectors';
import { socket } from '../socket';
import Loading from './UI/Loading';

export interface IStats {
	id: string;
	title: string;
	count: number;
	color: Colors;
	svgName: string;
}

export const TotalStats = () => {
	const user = useAppSelector(selectAuthUser);
	const [stats, setStats] = useState<IStats[]>([]);
	useEffect(() => {
		socket.emit('set_stats', {
			stats: ['employ', 'tasks', 'completed-tasks', 'incompleted-tasks'],
			user,
		});
	}, []);
	useEffect(() => {
		const getHandler = (stats: IStats[]) => {
			setStats(stats);
		};
		socket.on('get_stats', getHandler);
		return () => {
			socket.off('get_stats', getHandler);
		};
	}, [stats]);

	if (stats.length === 0) {
		return <Loading />;
	}
	return (
		<List>
			{stats.map((item) => (
				<ListItem key={item.id}>
					<Border color={item.color}>
						<SvgIcon size={24} name={item.svgName} color={Colors.LIGHT} />
					</Border>
					<Title>{item.title}</Title>
					<Count>{item.count}</Count>
					<Type>Task</Type>
					<Percent>
						<span>0%</span> This Month
					</Percent>
				</ListItem>
			))}
		</List>
	);
};

const List = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 752px;
	list-style: none;
`;

const ListItem = styled.li`
	border-radius: 10px;
	background-color: ${Colors.LIGHT};
	padding: 24px 15px;
	width: 173px;
`;

const Border = styled.div<{ color: string }>`
	border-radius: 8px;
	padding: 8px;
	display: inline-block;
	height: 40px;
	width: 40px;
	background-color: ${(props) => props.color};
`;

const Title = styled.h2`
	margin-top: 27px;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: ${Colors.GRAY};
`;

const Count = styled.p`
	margin-top: 17px;
	font-weight: 500;
	font-size: 24px;
	line-height: 28px;
	color: ${Colors.BLACK};
`;

const Type = styled.p`
	margin-top: 5px;
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	color: ${Colors.GRAY};
`;

const Percent = styled.p`
	margin-top: 21px;
	font-weight: 400;
	font-size: 12px;
	line-height: 14px;
	color: ${Colors.GRAY};

	span {
		color: ${Colors.PRIMARY};
	}
`;
