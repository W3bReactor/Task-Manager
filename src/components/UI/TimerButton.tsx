import React, { FC } from 'react';
import { Colors } from '../../styles';
import { SvgIcon } from './SvgIcon';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface TimerButton {
	color: Colors;
	svgColor?: Colors;
	svgName: string;
	size: number;
	styles?: FlattenSimpleInterpolation;
	onClick?: () => void;
}

const TimerButton: FC<TimerButton> = ({
	color,
	svgColor = Colors.LIGHT,
	size,
	svgName,
	styles,
	onClick,
}) => {
	return (
		<Button onClick={onClick} styles={styles} color={color}>
			<SvgIcon color={svgColor} size={size} name={svgName} />
		</Button>
	);
};

const Button = styled.button<{
	color: Colors;
	styles?: FlattenSimpleInterpolation;
}>`
	outline: none;
	cursor: pointer;
	border: none;
	padding: 20px;
	width: 70px;
	height: 70px;
	background-color: ${(props) => props.color};
	${(props) => props.styles};
`;

export default TimerButton;
