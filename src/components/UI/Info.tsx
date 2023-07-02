import React, { FC } from 'react';
import { SvgIcon } from './SvgIcon';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Colors } from '../../styles';

interface InfoProps {
	svgSize?: number;
	svgName: string;
	svgColor: Colors;
	borderColor: Colors;
	title: string;
	category: string;
	count: number;
	styles?: FlattenSimpleInterpolation;
}

export const Info: FC<InfoProps> = ({
	svgSize = 18,
	svgName,
	svgColor,
	borderColor,
	category,
	title,
	count,
	styles,
}) => {
	return (
		<Wrapper styles={styles}>
			<Item>
				<Border color={borderColor}>
					<SvgIcon
						name={svgName}
						styles={SvgStyles}
						color={svgColor}
						size={svgSize}
					/>
				</Border>

				<Content>
					<Title>{title}</Title>
					<Desc>{category}</Desc>
				</Content>
			</Item>
			<Count>{count}</Count>
		</Wrapper>
	);
};
const Wrapper = styled.div<{ styles?: FlattenSimpleInterpolation }>`
	${(props) => props.styles};
	display: flex;
	justify-content: space-between;
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 6px;
`;

const SvgStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Border = styled.div<{ color?: Colors }>`
	display: inline-block;
	background-color: ${(props) => props.color};
	padding: 10px;
	border-radius: 5px;
`;

const Title = styled.h3`
	font-size: 13px;
	font-weight: 500;
	line-height: 15px;
	color: ${Colors.BLACK};
`;

const Desc = styled.p`
	font-size: 12px;
	font-weight: 400;
	line-height: 14px;
	color: ${Colors.GRAY};
`;

const Count = styled.p`
	margin-top: 4px;
	font-size: 13px;
	font-weight: 500;
	line-height: 15px;
	color: ${Colors.BLACK};
`;
