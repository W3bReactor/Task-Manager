import React, { FC } from 'react';
import AddUser, { AddUserProps } from './AddUser';
import styled from 'styled-components';
import { Colors } from '../styles';
import { UserResponse } from '../models/response/UserResponse';

interface ModalProps {
	onClick: () => void;
	name: string;
	surname: string;
	type: string;
	items: AddUserProps[];
	userId: string;
	onUpdate: (
		userId: string,
		projectId: string,
		type: string,
		admins: UserResponse[]
	) => void;
}

const Modal: FC<ModalProps> = ({
	onClick,
	type,
	surname,
	name,
	items,
	userId,
	onUpdate,
}) => {
	return (
		<Wrapper onClick={onClick}>
			<ModalContent onClick={(event) => event.stopPropagation()}>
				<ModalTitle>
					Add {name} {surname} to {type}
				</ModalTitle>
				<ModalList>
					{items.map((item) => (
						<ModalItem key={item._id}>
							<AddUser
								projectId={item._id}
								onUpdate={onUpdate}
								admins={item.admins}
								workers={item.workers}
								tags={item.tags}
								title={item.title}
								_id={userId}
							/>
						</ModalItem>
					))}
				</ModalList>
			</ModalContent>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`;

const ModalList = styled.ul`
	list-style: none;
`;

const ModalItem = styled.li`
	:not(:last-child) {
		margin-bottom: 44px;
	}
`;

const ModalTitle = styled.h2`
	text-transform: capitalize;
	font-weight: 500;
	font-size: 28px;
	line-height: 33px;
	color: ${Colors.BLACK};
	margin-bottom: 26px;
	text-align: center;
`;

const ModalContent = styled.div`
	background-color: ${Colors.LIGHT};
	max-height: 800px;
	min-width: 800px;
	height: 100%;
	overflow-y: auto;
	padding: 20px 50px;
	border-radius: 10px;
`;

export default Modal;
