import React, { FC } from 'react';
import { SvgIcon } from './SvgIcon';
import styled, { css } from 'styled-components';
import { Colors } from '../../styles';

interface ToggleButtonProps {
	svgName: string;
	active: boolean;
	size?: number;
	onClick?: () => void;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
	svgName,
	active,
	size = 14,
	onClick,
}) => {
	return (
		<Button onClick={onClick} active={active}>
			<SvgIcon
				styles={SvgIconStyles}
				name={svgName}
				size={size}
				color={active ? Colors.AQUA : Colors.GRAY}
			/>
		</Button>
	);
};

const SvgIconStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Button = styled.button<{ active: boolean }>`
	padding: 10px;
	background-color: ${(props) =>
		props.active ? Colors.LIGHT_AQUA : 'transparent'};
	border: ${(props) =>
		props.active ? `1px solid ${Colors.AQUA}` : '1px solid transparent'};
	margin: 0;
	cursor: pointer;
	border-radius: 8px;
	transition: all 0.3s;
`;
