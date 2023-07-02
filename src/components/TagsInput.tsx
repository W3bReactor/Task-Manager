import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../styles';
import { Tag } from './UI/Tag';
import styled from 'styled-components';
import {
	ErrorMessage,
	Field,
	FormikErrors,
	FormikTouched,
	FormikValues,
	useField,
} from 'formik';
import TagSearch from './TagSearch';

interface AddTagProps {
	setTags: (p: (string | string)[]) => void;
	touched: FormikTouched<FormikValues>;
	values: FormikValues;
	tags: string[];
	errors: FormikErrors<FormikValues>;
}

const TagsInput: FC<AddTagProps> = ({ setTags, tags, errors, touched }) => {
	const [field, meta, helpers] = useField('tags');
	const [overlay, setOverlay] = useState(false);

	const checkTagsOnBlur = (e: React.MouseEvent) => {
		if (
			meta.value.trim() !== '' &&
			meta.value.length <= 10 &&
			!tags.includes(meta.value.trim('')) &&
			!meta.value.includes(',')
		) {
			setTags([...tags, meta.value]); // Добавление тэга при условии, что он не пуст
			helpers.setValue('');
			setOverlay(false);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (e.target?.id !== 'tag') {
			setOverlay(false);
		}
	};
	const onClickTag = (e: React.MouseEvent<HTMLUListElement>) => {
		(document.querySelector('#tags') as HTMLInputElement)?.focus();
		e?.nativeEvent.stopImmediatePropagation();
	};
	const onClickKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			(e.keyCode === 32 ||
				e.keyCode === 13 ||
				e.keyCode === 188 ||
				meta.value[meta.value.length - 1] === ' ') &&
			!meta.value.match(/^\s+$/gi) &&
			meta.value !== '' &&
			!meta.value.includes(',') &&
			meta.value.length <= 10 &&
			!tags.includes(meta.value.trim(''))
		) {
			e.preventDefault();
			setTags([...tags, meta.value]); // Добавление тэга при условии, что он не пуст
			helpers.setValue('');
		}
		if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 188) {
			e.preventDefault();
		}
		if (e.keyCode === 8 && meta.value === '') {
			setTags(tags.filter((el, i) => i !== tags.length - 1));
		}
	};

	return (
		<SearchItem>
			{overlay && <Overlay onClick={checkTagsOnBlur}></Overlay>}
			<Tags>
				<Error name="tags" component="div" />
				<AddedTagsList
					onClick={(e) => onClickTag(e)}
					bordercolor={
						touched.tags
							? errors.tags
								? Colors.RED
								: Colors.LIME
							: Colors.BLACK
					}
				>
					{tags.map((tag) => (
						<AddedTagItem key={tag}>
							<Tag>
								{tag}
								<Delete
									onClick={() => setTags(tags.filter((el) => el !== tag))}
								/>
							</Tag>
						</AddedTagItem>
					))}
					<InvisibleInput
						onFocus={() => setOverlay(true)}
						name="tags"
						id={'tags'}
						placeholder={'Tags'}
						onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
							onClickKey(e)
						}
						autocomplete="off"
					/>
					<TagSearch
						tags={tags}
						setValue={helpers.setValue}
						setTags={(el) => setTags(el)}
						value={meta.value}
					/>
				</AddedTagsList>
			</Tags>
		</SearchItem>
	);
};
const Error = styled(ErrorMessage)`
	width: max-content;
	margin-bottom: 10px;
	background-color: ${Colors.LIGHT};
	color: ${Colors.RED};
	border: 1px solid #000000;
	border-radius: 5px;
	padding: 6px 11px;
`;
const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;
const SearchItem = styled.div`
	margin-bottom: 25px;
`;

const Tags = styled.div`
	position: relative;
	height: max-content;
`;
const AddedTagsList = styled.ul<{ bordercolor: Colors }>`
	display: flex;
	align-items: center;
	flex-direction: row;
	list-style: none;
	border: 1px solid ${(props) => props.bordercolor};
	padding: 0 10px;
	outline: none;
	border-radius: 10px;
	flex-wrap: wrap;
	background-color: ${Colors.LIGHT};
	cursor: text;
`;
const AddedTagItem = styled.li`
	margin: 5px;

	:not(:last-child) {
		margin-right: 15px;
	}
`;

const InvisibleInput = styled(Field)`
	background-color: ${Colors.LIGHT};
	border: none;
	outline: none;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	max-width: 100px;
	width: 100%;
	padding: 18px 0;

	::placeholder {
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: ${Colors.GRAY};
	}
`;

const Delete = styled.button`
	font-size: 16px;
	position: relative;
	line-height: 19px;
	margin-left: 15px;
	background-color: transparent;
	border-radius: 100%;
	padding: 0 4px;
	border: none;
	width: 5px;
	height: 8px;
	cursor: pointer;

	::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 15px;
		height: 2px;
		transform: rotate(-45deg);
		background-color: ${Colors.BLACK};
	}

	::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 15px;
		height: 2px;
		transform: rotate(45deg);
		background-color: ${Colors.BLACK};
	}
`;
export default TagsInput;
