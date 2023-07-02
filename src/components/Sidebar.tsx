import React, { FC } from 'react';
import styled from 'styled-components';
import { SidebarItem } from './SidebarItem';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectSettingsItems } from '../store/settings/selectors';

export const Sidebar: FC = () => {
	const sidebarItems = useAppSelector(selectSettingsItems);

	return (
		<Menu>
			<List>
				{sidebarItems.map((el) => (
					<SidebarItem
						key={el.id}
						id={el.id}
						svgName={el.svgName}
						text={el.name}
					/>
				))}
			</List>
		</Menu>
	);
};

const Menu = styled.aside`
	grid-column: 2 span;
`;

const List = styled.ul`
	padding: 31px 0 31px 31px;
	list-style: none;
	display: flex;
	flex-direction: column;
`;
