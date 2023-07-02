import React, { useEffect, useRef, useState } from 'react';
import search from '../assets/images/search.svg';
import styled from 'styled-components';
import { Colors } from '../styles';
import useDebounce from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

const Search = () => {
	const [value, setValue] = useState('');
	const navigate = useNavigate();
	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		console.log(value); // обновление запроса
	}, [useDebounce(value)]);
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (ref.current) {
			console.log('blured');
			ref.current.blur();
		}
	};
	return (
		<SearchForm onSubmit={onSubmit}>
			<SearchInput
				onChange={(e) => setValue(e.target.value)}
				value={value}
				placeholder="Search..."
				type="text"
				ref={ref}
			/>
			<SearchBtn
				onClick={() => navigate(`/search/:${value}`)}
				src={search}
				type="submit"
			></SearchBtn>
		</SearchForm>
	);
};

const SearchForm = styled.form`
	position: relative;
	display: flex;
	align-items: center;
`;

const SearchInput = styled.input`
	border: none;
	background-color: #f7f8f9;
	border-radius: 10px;
	outline: none;
	padding: 18px 50px 18px 20px;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.BLACK};
	width: 349px;

	::placeholder {
		color: ${Colors.GRAY};
	}
`;

const SearchBtn = styled.button<{ src?: string }>`
	position: absolute;
	right: 20px;
	background-image: url(${(props) => props.src});
	background-color: transparent;
	border: none;
	width: 19px;
	height: 19px;
	object-fit: cover;
	cursor: pointer;
`;

export default Search;
