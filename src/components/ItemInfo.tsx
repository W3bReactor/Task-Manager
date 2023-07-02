import React, { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { Tag } from './UI/Tag';

interface ItemInfo {
	title: string;
	status: string;
	tags: string[];
	description: string;
}

const ItemInfo: FC<ItemInfo> = ({ title, description, tags, status }) => {
	return (
		<Wrapper>
			<Title>{title}</Title>
			<SubTitle>{status}</SubTitle>
			<TagList>
				{tags.map((tag) => (
					<TagItem key={tag}>
						<Tag>{tag}</Tag>
					</TagItem>
				))}
			</TagList>
			<Desc>{description}</Desc>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-column: 7 span;
	margin-right: 50px;
`;

const Title = styled.h2`
	color: ${Colors.BLACK};
	font-weight: 500;
	font-size: 48px;
	line-height: 56px;
	margin-bottom: 10px;
`;
const SubTitle = styled.h3`
	color: ${Colors.BLACK};
	font-weight: 500;
	font-size: 28px;
	line-height: 33px;
	text-transform: capitalize;
`;

const TagList = styled.ul`
	list-style: none;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 20px 0;
`;
const TagItem = styled.li`
	:not(:last-child) {
		margin-right: 15px;
	}
`;

const Desc = styled.p`
	color: ${Colors.GRAY};
	font-weight: 400;
	font-size: 28px;
	line-height: 33px;
	white-space: pre-wrap;
`;

export default ItemInfo;
