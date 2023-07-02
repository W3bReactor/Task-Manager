import React, { FC } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { Colors } from '../../styles';

interface EmployCountProps {
	styles?: FlattenSimpleInterpolation;
	title: string;
	count: number;
	percent: number;
}

export const EmployCount: FC<EmployCountProps> = ({
	styles,
	count,
	percent,
	title,
}) => {
	return (
		<Section styles={styles}>
			<Title>{title}</Title>
			<Count>{count}</Count>
			<Desc>Employees</Desc>
			<ProgressWrapper>
				<Progress percent={percent}></Progress>
			</ProgressWrapper>
		</Section>
	);
};

const Section = styled.section<{ styles?: FlattenSimpleInterpolation }>`
	background-color: ${Colors.LIGHT};
	padding: 19px;
	border-radius: 10px;
	${(props) => props.styles}
`;

const Title = styled.h2`
	font-size: 13px;
	font-weight: 500;
	line-height: 15px;
	color: ${Colors.BLACK};
	margin-bottom: 11px;
`;

const Count = styled.p`
	font-size: 20px;
	font-weight: 500;
	line-height: 23px;
	color: ${Colors.BLACK};
`;

const Desc = styled.p`
	font-size: 13px;
	font-weight: 400;
	line-height: 15px;
	color: ${Colors.GRAY};
	margin-bottom: 14px;
`;

const ProgressWrapper = styled.div`
	position: relative;
	width: 232px;
	height: 9px;
	background-color: ${Colors.LIGHT_GRAY};
	border-radius: 5px;
`;

const Progress = styled.div<{ percent: number }>`
	position: absolute;
	left: 0;
	top: 0;
	width: ${(props) => `${props.percent}%`};
	height: 100%;
	border-radius: 5px;
	background-color: ${(props) =>
		props.percent >= 75 ? Colors.PRIMARY : Colors.RED};
	transition: all 0.3s;
	animation: progressHorizontal 1s ease-in-out forwards;
`;
