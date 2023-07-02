import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors } from '../../styles';

const Loading = () => {
	return (
		<>
			<Overlay> </Overlay>
			<Loader></Loader>
		</>
	);
};

const load = keyframes`	 
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(90deg);
		}
		50% {
			transform: rotate(180deg);
		}
		75% {
			transform: rotate(270deg);
		}
		100% {
			transform: rotate(360deg);
		`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1;
`;

const Loader = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%;
	background-color: transparent;
	padding: 30px;
	border: 5px dashed ${Colors.PRIMARY};
	animation: ${load} linear 5s infinite;
	}
`;

export default Loading;
