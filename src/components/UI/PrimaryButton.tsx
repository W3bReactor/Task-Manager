import React, { FC } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Colors } from '../../styles';
import { Link } from 'react-router-dom';

interface PrimaryButtonProps {
	children: React.ReactNode;
	styles?: FlattenSimpleInterpolation;
	type?: 'link' | 'button';
	to?: string;
	disabled?: boolean;
	onClick?: () => void;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
	children,
	styles,
	type = 'button',
	to,
	disabled,
	onClick,
}) => {
	return (
		<>
			{type === 'button' && (
				<Button onClick={onClick} disabled={disabled} styles={styles}>
					{children}
				</Button>
			)}
			{type === 'link' && (
				<PrimaryLink to={to ? to : ''} styles={styles}>
					{children}
				</PrimaryLink>
			)}
		</>
	);
};

const Styles = css`
	background-color: ${Colors.PRIMARY};
	display: flex;
	align-items: center;
	padding: 13px 20px;
	border: none;
	outline: none;
	border-radius: 14px;
	cursor: pointer;
	color: ${Colors.LIGHT};
`;

const Button = styled.button<{ styles?: FlattenSimpleInterpolation }>`
	${Styles};
	${(props) => props.styles};
`;

const PrimaryLink = styled(Link)<{ styles?: FlattenSimpleInterpolation }>`
	text-decoration: none;
	${Styles};
	${(props) => props.styles};
`;
