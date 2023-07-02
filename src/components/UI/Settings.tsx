import React, { useState } from 'react';
import { PrimaryButton } from './PrimaryButton';
import plus from '../../assets/images/plus.svg';
import styled, { css } from 'styled-components';
import { ToggleButton } from './ToggleButton';
export const Settings = () => {
	const [active, setActive] = useState(1);
	return (
		<Wrapper>
			<Buttons>
				<ToggleButton
					onClick={() => setActive(0)}
					active={active === 0}
					svgName={'lines'}
				/>
				<ToggleButton
					onClick={() => setActive(1)}
					active={active === 1}
					svgName={'squares'}
					size={18}
				/>
			</Buttons>
			<PrimaryButton
				type={'link'}
				to={'/project/add'}
				styles={PrimaryButtonStyles}
			>
				<img src={plus} alt="Добавить проект" />
			</PrimaryButton>
		</Wrapper>
	);
};

const PrimaryButtonStyles = css`
	padding: 11px;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
`;
