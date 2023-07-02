import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchUserInfo from '../components/UI/SearchUserInfo';
import { useParams } from 'react-router-dom';
import { userApi } from '../store/services/UserService';
import Loading from '../components/UI/Loading';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';
import { projectApi } from '../store/services/ProjectService';
import { Colors } from '../styles';

const SearchPage = () => {
	const { query } = useParams();
	const user = useAppSelector(selectAuthUser);
	const [search, { data, isLoading }] = userApi.useLazyGetUsersQuery();
	const { data: projects } = projectApi.useGetAdminProjectsQuery();

	useEffect(() => {
		search({ search: query?.replace(':', '') || '', exclude: user.id });
	}, [query]);
	if (isLoading) {
		return <Loading />;
	}
	return (
		<Users>
			{projects && data && data.length > 0 ? (
				data.map((user) => (
					<User key={user._id}>
						<SearchUserInfo
							_id={user._id}
							surname={user.surname}
							name={user.name}
							avatar={user.avatar}
							post={user.post}
							projects={projects}
						/>
					</User>
				))
			) : (
				<Title>Not Found :(</Title>
			)}
		</Users>
	);
};

const Users = styled.ul`
	list-style: none;
`;
const User = styled.li`
	:not(:last-child) {
		margin-bottom: 20px;
	}
`;

const Title = styled.h2`
	font-weight: 500;
	font-size: 48px;
	line-height: 56px;
	color: ${Colors.BLACK};
	text-align: center;
`;

export default SearchPage;
