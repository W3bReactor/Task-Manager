import React, { FC, useState } from 'react';
import styled from 'styled-components';
import uniqolor from 'uniqolor';

interface TagProps {
	children: React.ReactNode;
}

export const Tag: FC<TagProps> = ({ children }) => {
	const [backgroundColor, setBackgroundColor] = useState(
		uniqolor.random({
			saturation: 100,
			lightness: [70, 80],
			format: 'rgb',
		}).color
	);
	const [color, setColor] = useState(
		uniqolor(backgroundColor, {
			saturation: [70],
			lightness: 40,
		}).color
	);
	return (
		<TagItem backgroundColor={backgroundColor} color={color}>
			{children}
		</TagItem>
	);
};

const TagItem = styled.div<{ backgroundColor: string; color: string }>`
	display: inline-block;
	padding: 7px 19px;
	font-size: 13px;
	font-weight: 500;
	line-height: 15px;
	color: ${(props) => props.color};
	background-color: ${(props) => props.backgroundColor};
	border-radius: 4px;
`;
