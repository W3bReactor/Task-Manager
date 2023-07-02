import React, { FC } from 'react';
import { Colors } from '../../styles';
import styled from 'styled-components';

interface MenuListProps {
	children: React.ReactNode;
}

const MenuList: FC<MenuListProps> = ({ children }) => {
	return <List>{children}</List>;
};

const List = styled.ul`
	z-index: 1000;
	position: absolute;
	width: 205px;
	top: 50px;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	list-style: none;
	border: 1px solid ${Colors.BLACK};
	border-radius: 5px;
	background-color: ${Colors.LIGHT};
`;

export default MenuList;
