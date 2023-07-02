import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { EmployStats } from './UI/EmployStats';
import { socket } from '../socket';
import Loading from './UI/Loading';

interface Employ {
	_id: string;
	name: string;
	surname: string;
	post: string;
	avatar: string;
	tasks: number;
}

export const TopEmploy = () => {
	const [top, setTop] = useState<Employ[]>([]);
	useEffect(() => {
		socket.emit('set_top');
	}, []);

	useEffect(() => {
		const getHandler = (stats: Employ[]) => {
			setTop(stats);
		};
		socket.on('get_top', getHandler);
		return () => {
			socket.off('get_top', getHandler);
		};
	}, [top]);
	if (top.length === 0) {
		return <Loading />;
	}
	return (
		<Section>
			<Title>Top Employees</Title>
			<List>
				{top.map((employ) => (
					<ListItem key={employ._id}>
						<EmployStats
							prof={employ.post}
							name={`${employ.name} ${employ.surname}`}
							tasksCount={employ.tasks}
							profileIcon={employ.avatar}
						/>
					</ListItem>
				))}
			</List>
		</Section>
	);
};

const Section = styled.section`
	height: 353px;
	margin-left: 20px;
	background-color: ${Colors.LIGHT};
	padding: 19px;
	width: 558px;
	border-radius: 10px;
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
`;
const ListItem = styled.li`
	:not(:last-child) {
		margin-bottom: 20px;
	}
`;
