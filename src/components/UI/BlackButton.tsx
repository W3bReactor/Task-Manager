import React, { FC } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { Colors } from '../../styles';

interface BlackButtonProps {
	children: React.ReactNode;
	type: 'button' | 'submit';
	styles?: FlattenSimpleInterpolation;
}

const BlackButton: FC<BlackButtonProps> = ({ children, type, styles }) => {
	return (
		<Button styles={styles} type={type}>
			{children}
		</Button>
	);
};

const Button = styled.button<{ styles?: FlattenSimpleInterpolation }>`
	width: max-content;
	cursor: pointer;
	outline: none;
	border: none;
	border-radius: 50px;
	padding: 7px 11px;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.LIGHT};
	background-color: ${Colors.BLACK};
	${(props) => props.styles};
`;

export default BlackButton;
