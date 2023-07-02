import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PrimaryButton } from './PrimaryButton';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { ProjectResponse } from '../../models/response/ProjectResponse';
import { projectApi } from '../../store/services/ProjectService';
import { UserResponse } from '../../models/response/UserResponse';

interface SearchUserInfoProps {
	name: string;
	surname: string;
	_id: string;
	post: string;
	avatar?: string;
	projects: ProjectResponse[];
}

const SearchUserInfo: FC<SearchUserInfoProps> = ({
	_id,
	post,
	surname,
	name,
	avatar,
	projects,
}) => {
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();
	const [update] = projectApi.useUpdateProjectMutation();
	const onUpdate = (
		userId: string,
		projectId: string,
		type: string,
		users: UserResponse[]
	) => {
		if (type === 'addAdmin') {
			const updatedAdmins = users.map((admin) => admin._id);
			update({ id: projectId, admins: [...updatedAdmins, userId] });
		}
		if (type === 'addWorker') {
			const updatedWorkers = users.map((worker) => worker._id);
			update({ id: projectId, workers: [...updatedWorkers, userId] });
		}
		if (type === 'removeWorker') {
			const updatedWorkers = users.map((worker) => worker._id);
			const filteredWorkers = updatedWorkers.filter(
				(workerId) => workerId !== userId
			);
			update({ id: projectId, workers: [...filteredWorkers] });
		}
		if (type === 'removeAdmin') {
			const updatedAdmins = users.map((worker) => worker._id);
			const filteredAdmins = updatedAdmins.filter(
				(workerId) => workerId !== userId
			);
			update({ id: projectId, admins: [...filteredAdmins] });
		}
	};
	const onClickAdd = () => {
		setModal(!modal);
	};
	return (
		<Wrapper>
			{modal && (
				<Modal
					onUpdate={onUpdate}
					onClick={onClickAdd}
					name={name}
					surname={surname}
					type={'project'}
					items={projects}
					userId={_id}
				/>
			)}
			<FullInfo onClick={() => navigate(`/account/${_id}`)}>
				<Avatar
					height={97}
					width={97}
					src={
						avatar
							? `${process.env.REACT_APP_SERVER_URL}/api/uploads/${avatar}`
							: `${process.env.REACT_APP_SERVER_URL}/api/uploads/user.png`
					}
					alt={'Peter'}
				/>
				<Info>
					<FullName>
						{name} {surname}
					</FullName>
					<Post>{post}</Post>
				</Info>
			</FullInfo>
			<PrimaryButton onClick={onClickAdd}>Add To Project</PrimaryButton>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${Colors.LIGHT};
	padding: 10px;
	border-radius: 10px;
`;

const Avatar = styled(LazyLoadImage)`
	border-radius: 100%;
`;

const FullInfo = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const Info = styled.div`
	margin-left: 20px;
	display: flex;
	flex-direction: column;
`;

const FullName = styled.h2`
	font-weight: 400;
	font-size: 28px;
	line-height: 33px;
	color: ${Colors.BLACK};
`;

const Post = styled.p`
	font-weight: 400;
	font-size: 28px;
	line-height: 33px;
	color: ${Colors.GRAY};
`;

export default SearchUserInfo;
