import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { tagsApi } from '../store/services/TagsService';
import { Colors } from '../styles';
import useDebounce from '../hooks/useDebounce';
import { ITag } from '../models/ITag';

interface TagSearchProps {
	value: string;
	setTags: (items: string[]) => void;
	tags: string[];
	setValue: (s: string) => void;
}

const TagSearch: FC<TagSearchProps> = ({ value, setTags, tags, setValue }) => {
	const [getTags, { isLoading, data }] = tagsApi.useLazyGetTagsQuery();
	const onClickTag = (e: React.MouseEvent<HTMLLIElement>, tag: ITag) => {
		if (!tags.includes(tag.value)) {
			setTags([...tags, tag.value]);
		}
		setValue('');
	};
	useEffect(() => {
		if (value) {
			getTags({
				limit: 3,
				search: value,
				exclude: tags,
			});
		}
	}, [useDebounce(value, 500)]);
	if (isLoading) {
		return <div></div>;
	}
	return (
		<>
			{value && data && data.length > 0 && (
				<TagList>
					{data.map((tag) => (
						<TagItem
							id={'tag'}
							key={tag._id}
							onClick={(e) => onClickTag(e, tag)}
						>
							<Text id={'tag'}>{tag.value}</Text>
						</TagItem>
					))}
				</TagList>
			)}
		</>
	);
};

const TagList = styled.ul`
	z-index: 1000;
	width: 100%;
	position: absolute;
	top: 100%;
	left: 0;
	list-style: none;
	background-color: ${Colors.LIGHT};
	display: flex;
	flex-direction: column;
	border: 1px solid ${Colors.BLACK};
	border-radius: 5px;
`;

const TagItem = styled.li`
	cursor: pointer;
	padding: 15px;
	:hover {
		border-radius: 5px;
		background-color: ${Colors.LIGHT_AQUA};
	}
	:not(:last-child) {
		border-bottom: 1px solid ${Colors.BLACK};
	}
`;
const Text = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
`;

export default TagSearch;
