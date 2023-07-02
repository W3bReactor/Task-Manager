import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../styles';
import { Tag } from './UI/Tag';
import { PrimaryButton } from './UI/PrimaryButton';
import plus from '../assets/images/plus.svg';
import { UserResponse } from '../models/response/UserResponse';

export interface AddUserProps {
	title: string;
	tags: string[];
	_id: string;
	admins: UserResponse[];
	workers: UserResponse[];
}

const AddUser: FC<
	AddUserProps & {
		projectId: string;
		onUpdate: (
			userId: string,
			projectId: string,
			type: string,
			admins: UserResponse[]
		) => void;
	}
> = ({ title, tags, _id, workers, admins, onUpdate, projectId }) => {
	const isWorker = workers.some((worker) => worker._id === _id);
	const isAdmin = admins.some((admin) => admin._id === _id);

	const addAdmin = () => {
		if (!isAdmin) {
			onUpdate(_id, projectId, 'addAdmin', admins);
			if (!isWorker) {
				onUpdate(_id, projectId, 'addWorker', workers);
			}
		}
		if (isAdmin) {
			onUpdate(_id, projectId, 'removeAdmin', admins);
		}
	};
	const addWorker = () => {
		if (!isWorker) {
			onUpdate(_id, projectId, 'addWorker', workers);
		}
		if (isWorker && !isAdmin) {
			onUpdate(_id, projectId, 'removeWorker', workers);
		}
	};
	return (
		<Wrapper>
			<Column>
				<Title>{title}</Title>
				<Tags>
					{tags.map((tag) => (
						<TagItem key={tag}>
							<Tag>{tag}</Tag>
						</TagItem>
					))}
				</Tags>
			</Column>
			<Column>
				<PrimaryButton
					onClick={addAdmin}
					styles={isAdmin ? ButtonStyles : PrimaryButtonStyles}
				>
					Add Admin
					<Plus isAdmin={isAdmin} src={plus} />
				</PrimaryButton>
				<PrimaryButton
					onClick={addWorker}
					styles={isWorker ? ButtonStyles : PrimaryButtonStyles}
				>
					Add Worker
					<Plus isWorker={isWorker} src={plus} />
				</PrimaryButton>
			</Column>
		</Wrapper>
	);
};

const ButtonStyles = css`
	background-color: ${Colors.RED};
`;
const PrimaryButtonStyles = css`
	background-color: ${Colors.PRIMARY};
`;

const Plus = styled.img<{ isWorker?: boolean; isAdmin?: boolean }>`
	height: 15px;
	margin-left: 10px;
	width: 15px;
	transform: rotate(${(props) => props.isWorker && '45deg'});
	transform: rotate(${(props) => props.isAdmin && '45deg'});
	transition: all 0.3s;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	border: 1px solid ${Colors.BLACK};
	border-radius: 15px;
	height: 120px;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-wrap: wrap;
	height: 100%;
	margin-right: 20px;
`;

const Title = styled.h3`
	font-weight: 500;
	font-size: 28px;
	line-height: 33px;
	color: ${Colors.BLACK};
`;

const Tags = styled.ul`
	list-style: none;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;
const TagItem = styled.li`
	:not(:last-child) {
		margin-right: 5px;
	}
`;

export default AddUser;
