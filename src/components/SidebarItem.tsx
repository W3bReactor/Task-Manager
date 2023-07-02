import React, { FC, useState } from 'react';
import { SvgIcon } from './UI/SvgIcon';
import { Colors } from '../styles';
import styled, { css } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectSettingsActiveMenu } from '../store/settings/selectors';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setActiveMenu } from '../store/settings';

interface SidebarItemProps {
	svgName: string;
	text?: string;
	id: number;
}

export const SidebarItem: FC<SidebarItemProps> = ({ svgName, text, id }) => {
	const dispatch = useAppDispatch();
	const [hover, setHover] = useState(false);
	const active = useAppSelector(selectSettingsActiveMenu);
	const navigate = useNavigate();
	const onSetActiveMenu = () => {
		dispatch(setActiveMenu(id));
		navigate(svgName);
	};
	return (
		<ListItem onClick={onSetActiveMenu} $active={active === id || hover}>
			<ListLink
				onMouseOver={() => setHover(true)}
				onMouseOut={() => setHover(false)}
				to={svgName}
				$active={active === id}
			>
				<SvgIcon
					color={active === id || hover ? Colors.PRIMARY : Colors.GRAY}
					size={24}
					name={svgName}
					styles={Icon}
				/>
				{text}
			</ListLink>
		</ListItem>
	);
};

const ListItem = styled.li<{ $active?: boolean }>`
	display: flex;
	align-items: center;
	padding: 8px 0;
	transition: border 0.3s ease-out;
	position: relative;
	cursor: pointer;
	:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		opacity: ${(props) => (props.$active ? 1 : 0)};
		height: 100%;
		width: 2px;
		background-color: ${Colors.PRIMARY};
		border-radius: 2px;
		transition: all 0.3s;
	}
	:not(:last-child) {
		margin-bottom: 15px;
	}
`;

const ListLink = styled(Link)<{ $active?: boolean }>`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	text-decoration: none;
	font-weight: 500;
	font-size: 15px;
	line-height: 18px;
	color: ${(props) => (props.$active ? Colors.PRIMARY : Colors.GRAY)};
	transition: all 0.3s;
	:hover {
		color: ${Colors.PRIMARY};
	}
`;

const Icon = css`
	margin-right: 10px;
`;
