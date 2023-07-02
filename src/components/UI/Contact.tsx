import React, { FC } from 'react';
import { SvgIcon } from './SvgIcon';
import { Colors } from '../../styles';
import styled, { css } from 'styled-components';

interface ContactProps {
	link: string;
	svgName: string;
}

const Contact: FC<ContactProps> = ({ link, svgName }) => {
	return (
		<Item>
			<Link href={link} target={'_blank'}>
				<SvgIcon
					name={svgName}
					styles={SvgStyles}
					color={Colors.LIGHT}
					size={64}
				/>
			</Link>
		</Item>
	);
};

const SvgStyles = css`
	:hover {
		fill: ${Colors.LIGHT_GRAY};
	}
`;

const Item = styled.li`
	:not(:last-child) {
		margin-right: 30px;
	}
`;

const Link = styled.a`
	text-decoration: none;
`;

export default Contact;
