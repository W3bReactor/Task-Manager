import React from 'react';
import AccountInfo from '../components/AccountInfo';
import Contacts from '../components/Contacts';
import { Goal, TaskCount, TaskTarget, TopEmploy } from '../components';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { userApi } from '../store/services/UserService';
import Loading from '../components/UI/Loading';
import NotFound from './NotFound';

const AccountPage = () => {
	const { id } = useParams();
	const { data, isLoading, isError, isSuccess } = userApi.useGetUserQuery(
		String(id)
	);
	if (isLoading) {
		return <Loading />;
	}
	if (isSuccess) {
		return (
			<div>
				<AccountInfo
					id={data.id}
					avatar={data.avatar ? data.avatar : ''}
					name={data.name}
					post={data.post}
					surname={data.surname}
				/>
				{Object.keys(data.contacts).length > 0 && (
					<Contacts contacts={data.contacts} />
				)}
				<Info>
					<TaskCount />
					<TaskTarget />
					<Goal />
					<TopEmploy />
				</Info>
			</div>
		);
	}
	return <NotFound />;
};

const Info = styled.div`
	margin-top: 32px;
	max-width: 1000px;
	display: flex;
	flex-wrap: wrap;
	gap: 30px;
`;

export default AccountPage;
