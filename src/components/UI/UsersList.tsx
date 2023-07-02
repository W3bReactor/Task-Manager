import React, { FC, useEffect, useState } from 'react';
import ProfileShortInfo from './ProfileShortInfo';
import styled from 'styled-components';
import { Colors } from '../../styles';
import { UserResponse } from '../../models/response/UserResponse';
import Modal from '../Modal';
import { taskApi } from '../../store/services/TaskService';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAuthUser } from '../../store/auth/selectors';
interface UsersListProps {
	admins: UserResponse[];
	workers: UserResponse[];
	type?: string;
	projectId: string;
}

const UsersList: FC<UsersListProps> = ({
	admins,
	workers,
	type = '',
	projectId,
}) => {
	const [openModal, setOpenModal] = useState(false);
	const user = useAppSelector(selectAuthUser);
	const isAdmin = admins.some((admin) => admin._id === user.id);
	const [get, { data }] = taskApi.useLazyGetAdminTasksQuery();
	const [update] = taskApi.useUpdateTaskMutation();
	const [info, setInfo] = useState<{
		userId: string;
		name: string;
		surname: string;
	}>({ userId: '', name: '', surname: '' });
	useEffect(() => {
		if (type === 'task') {
			get(projectId);
		}
	}, []);
	const onOpenModal = () => {
		setOpenModal(!openModal);
	};

	const onUpdate = (
		userId: string,
		id: string,
		type: string,
		users: UserResponse[]
	) => {
		if (type === 'addAdmin') {
			const updatedAdmins = users.map((admin) => admin._id);
			update({ id, admins: [...updatedAdmins, userId], projectId });
		}
		if (type === 'addWorker') {
			const updatedWorkers = users.map((worker) => worker._id);
			update({
				projectId,
				workers: [...updatedWorkers, userId],
				id,
			});
		}
		if (type === 'removeWorker') {
			const updatedWorkers = users.map((worker) => worker._id);
			const filteredWorkers = updatedWorkers.filter(
				(workerId) => workerId !== userId
			);
			update({ projectId, workers: [...filteredWorkers], id });
		}
		if (type === 'removeAdmin') {
			const updatedAdmins = users.map((worker) => worker._id);
			const filteredAdmins = updatedAdmins.filter(
				(workerId) => workerId !== userId
			);
			console.log(filteredAdmins);
			update({ projectId, admins: [...filteredAdmins], id });
		}
	};
	return (
		<>
			{data && openModal && (
				<Modal
					onClick={onOpenModal}
					name={info.name}
					surname={info.surname}
					type={type}
					items={data}
					userId={info.userId}
					onUpdate={onUpdate}
				/>
			)}
			<Users>
				<UserTitle>Admins:</UserTitle>
				<UserList>
					{admins.map((admin) => (
						<UserItem key={admin._id}>
							<ProfileShortInfo
								isAdmin={isAdmin}
								setInfo={setInfo}
								setOpenModal={setOpenModal}
								userId={admin._id}
								name={admin.name}
								surname={admin.surname}
								post={admin.post}
								avatar={admin.avatar}
								type={type}
							/>
						</UserItem>
					))}
				</UserList>
			</Users>
			<Users>
				<UserTitle>Workers:</UserTitle>
				<UserList>
					{workers.map((worker) => (
						<UserItem key={worker._id}>
							<ProfileShortInfo
								isAdmin={isAdmin}
								setInfo={setInfo}
								userId={worker._id}
								name={worker.name}
								setOpenModal={setOpenModal}
								surname={worker.surname}
								post={worker.post}
								avatar={worker.avatar}
								type={type}
							/>
						</UserItem>
					))}
				</UserList>
			</Users>
		</>
	);
};

const Users = styled.div`
	display: flex;
	flex-direction: column;
`;

const UserTitle = styled.h2`
	color: ${Colors.BLACK};
	font-weight: 500;
	font-size: 28px;
	line-height: 33px;
	margin-bottom: 25px;
`;

const UserList = styled.ul`
	margin-bottom: 20px;
	list-style: none;
`;
const UserItem = styled.li`
	:not(:last-child) {
		margin-bottom: 35px;
	}
`;

export default UsersList;
