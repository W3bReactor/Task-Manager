import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { Colors } from '../../styles';

interface EmployStatsProps {
	styles?: FlattenSimpleInterpolation;
	profileIcon: string;
	name: string;
	prof: string;
	tasksCount: number;
}

export const EmployStats: FC<EmployStatsProps> = ({
	styles,
	profileIcon,
	name,
	tasksCount,
	prof,
}) => {
	return (
		<Wrapper styles={styles}>
			<MainInfo>
				<IconProfile
					src={
						profileIcon
							? `http://localhost:7000/api/uploads/${profileIcon}`
							: 'http://localhost:7000/api/uploads/user.png'
					}
					alt={name}
				/>
				<Name>{name.slice(0, 12)}...</Name>
			</MainInfo>
			<Prof>{prof}</Prof>
			<Tasks>{tasksCount} Tasks</Tasks>
		</Wrapper>
	);
};

const Wrapper = styled.div<{ styles?: FlattenSimpleInterpolation }>`
	display: grid;
	align-items: center;
	grid-template-columns: repeat(12, 1fr);
	${(props) => props.styles};
`;

const MainInfo = styled.div`
	grid-column: 4 span;
	display: flex;
	align-items: center;
`;

const IconProfile = styled(LazyLoadImage)`
	width: 40px;
	height: 40px;
	border-radius: 100%;
`;

const Name = styled.h3`
	margin-left: 15px;
	font-size: 15px;
	font-weight: 500;
	line-height: 17px;
	color: ${Colors.BLACK};
`;

const Prof = styled.p`
	grid-column: 4 span;
	font-size: 15px;
	font-weight: 500;
	line-height: 17px;
	color: ${Colors.BLACK};
`;

const Tasks = styled.p`
	grid-column: 2 span;
	font-size: 15px;
	font-weight: 500;
	line-height: 17px;
	color: ${Colors.BLACK};
`;

const Stats = styled.p`
	grid-column: 2 span;
	font-size: 15px;
	font-weight: 500;
	line-height: 17px;
	color: ${Colors.PRIMARY};
`;
