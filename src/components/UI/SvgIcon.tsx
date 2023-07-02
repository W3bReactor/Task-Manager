import React, { FC } from 'react';
import Icons from '../../assets/images/sprite.svg';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface SvgIconProps {
	name: string;
	color?: string;
	size?: number;
	styles?: FlattenSimpleInterpolation;
	onClick?: () => void;
}

export const SvgIcon: FC<SvgIconProps> = ({
	name,
	color,
	size,
	styles,
	onClick,
}) => (
	<Svg
		onClick={onClick}
		styles={styles}
		fill={color}
		width={size}
		height={size}
	>
		<use href={`${Icons}#sprite-${name}`} />
	</Svg>
);

SvgIcon.defaultProps = {
	size: 30,
	color: 'black',
};

const Svg = styled.svg<{ styles?: FlattenSimpleInterpolation }>`
	${(props) => props.styles};
	transition: all 0.3s;
`;
