import React, { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import Contact from './UI/Contact';

interface ContactsProps {
	contacts: {
		vk?: string;
		inst?: string;
		twitter?: string;
		gh?: string;
	};
}

const Contacts: FC<ContactsProps> = ({ contacts }) => {
	return (
		<Section>
			<Text>Contacts</Text>
			<Items>
				{contacts.vk && <Contact link={contacts.vk} svgName={'vk'} />}
				{contacts.gh && <Contact link={contacts.gh} svgName={'gh'} />}
				{contacts.inst && <Contact link={contacts.inst} svgName={'gh'} />}
				{contacts.twitter && <Contact link={contacts.twitter} svgName={'gh'} />}
			</Items>
		</Section>
	);
};

const Section = styled.section`
	background-color: ${Colors.PRIMARY};
	border-radius: 24px;
	margin-top: 32px;
	display: flex;
	flex-direction: column;
	padding: 10px;
`;

const Text = styled.p`
	text-align: center;
	font-weight: 600;
	font-size: 24px;
	line-height: 28px;
	color: ${Colors.LIGHT};
`;

const Items = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	list-style: none;
`;

export default Contacts;
