import React, { FC } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Colors } from '../../styles';
import { Link } from 'react-router-dom';

interface SimpleButtonProps {
	children: React.ReactNode;
	disabled?: boolean;
	type: 'button' | 'submit' | 'reset' | 'link' | undefined;
	onClick?: () => void;
	styles?: FlattenSimpleInterpolation;
	to?: string;
}

const SimpleButton: FC<SimpleButtonProps> = ({
	children,
	styles,
	disabled,
	type,
	onClick,
	to,
}) => {
	if (type === 'link') {
		return (
			<SimpleLink
				to={to || ''}
				onSubmit={() => console.log('hi')}
				type={type}
				styles={styles}
				onClick={onClick}
			>
				{children}
			</SimpleLink>
		);
	}
	return (
		<Button
			onSubmit={() => console.log('hi')}
			type={type}
			disabled={disabled}
			styles={styles}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};
const SimpleStyles = css`
	background-color: ${Colors.LIGHT};
	padding: 18px 50px;
	filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
	border: 1px solid ${Colors.BLACK};
	border-radius: 10px;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	outline: none;
	cursor: pointer;
`;

const Button = styled.button<{ styles?: FlattenSimpleInterpolation }>`
	${SimpleStyles};
	${(props) => props.styles};
`;
const SimpleLink = styled(Link)<{ styles?: FlattenSimpleInterpolation }>`
	${SimpleStyles};
	text-decoration: none;
	${(props) => props.styles};
`;
export default SimpleButton;
