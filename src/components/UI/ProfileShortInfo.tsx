import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Colors } from '../../styles';
import { PrimaryButton } from './PrimaryButton';
import plus from '../../assets/images/plus.svg';
import Modal from '../Modal';
import { AddUserProps } from '../AddUser';
import { UserResponse } from '../../models/response/UserResponse';
import { taskApi } from '../../store/services/TaskService';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAuthUser } from '../../store/auth/selectors';
import { useNavigate } from 'react-router-dom';

interface ProfileShortInfoProps {
	name: string;
	surname: string;
	avatar: string;
	post: string;
	type?: string;
	userId: string;
	setInfo?: (p: { surname: string; name: string; userId: string }) => void;
	setOpenModal?: (b: boolean) => void;
	isAdmin?: boolean;
}

const ProfileShortInfo: FC<ProfileShortInfoProps> = ({
	name,
	surname,
	avatar,
	post,
	type,
	userId,
	setInfo,
	setOpenModal,
	isAdmin,
}) => {
	const user = useAppSelector(selectAuthUser);
	const navigate = useNavigate();
	const onClickAdd = () => {
		if (setInfo) {
			setInfo({ userId, name, surname });
		}
		if (setOpenModal) {
			setOpenModal(true);
		}
	};

	return (
		<Wrapper>
			<Column onClick={() => navigate(`/account/${userId}`)}>
				<Avatar
					height={98}
					width={98}
					src={
						avatar
							? `${process.env.REACT_APP_SERVER_URL}/api/uploads${avatar}`
							: `${process.env.REACT_APP_SERVER_URL}/api/uploads/user.png`
					}
					alt={`${name} ${surname}`}
				/>
				<Info>
					<FullName>
						{name} {surname}
					</FullName>
					<Post>{post}</Post>
				</Info>
			</Column>
			{isAdmin && user.id !== userId && type === 'task' && (
				<Column>
					<PrimaryButton onClick={onClickAdd} styles={ButtonStyles}>
						<Plus src={plus} />
					</PrimaryButton>
				</Column>
			)}
		</Wrapper>
	);
};

const ButtonStyles = css`
	background-color: ${Colors.AQUA};
`;

const Column = styled.div`
	display: flex;
	align-items: center;
`;
const Plus = styled.img`
	height: 15px;
	width: 15px;
	transition: all 0.3s;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
`;

const Avatar = styled(LazyLoadImage)`
	border-radius: 15px;
`;

const Info = styled.div`
	margin-left: 20px;
	display: flex;
	flex-direction: column;
`;
const FullName = styled.h3`
	color: ${Colors.BLACK};
	font-weight: 500;
	font-size: 28px;
	line-height: 34px;
`;

const Post = styled.p`
	color: ${Colors.GRAY};
	font-weight: 400;
	font-size: 24px;
	line-height: 28px;
`;

export default ProfileShortInfo;
