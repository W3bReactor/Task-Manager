import React, { useEffect } from 'react';
import search from '../assets/images/search.svg';
import { PrimaryButton } from './UI/PrimaryButton';
import plus from '../assets/images/plus.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import notice from '../assets/images/notice.svg';
import { setActiveMenu } from '../store/settings';
import HeaderMenu from './HeaderMenu';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from '../styles';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser, selectIsAuth } from '../store/auth/selectors';
import { userApi } from '../store/services/UserService';
import Loading from './UI/Loading';
import Search from './Search';

const HeaderAuth = () => {
	const dispatch = useAppDispatch();

	const isAuth = useAppSelector(selectIsAuth);
	const { id } = useAppSelector(selectAuthUser);
	const { data, isSuccess, isLoading, refetch } = userApi.useGetMeQuery();
	useEffect(() => {
		if (isAuth) {
			refetch();
		}
	}, [isAuth, isSuccess]);
	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<Search />
			<RightContent>
				<PrimaryButton type="link" to={'/project/add'}>
					<AddBtnIcon src={plus} width={15} height={15} />
					New Project
				</PrimaryButton>
				<NoticeBtn>
					<LazyLoadImage src={notice} width={24} height={24} />
				</NoticeBtn>
				<ProfileWrapper
					onClick={() => dispatch(setActiveMenu(999))}
					to={`/account/${id}`}
				>
					<LazyLoadImage
						effect="blur"
						src={
							data?.avatar
								? `http://localhost:7000/api/uploads/${data.avatar}`
								: 'http://localhost:7000/api/uploads/user.png'
						}
						height={48}
						width={48}
					/>
					<ProfileItem>
						<ProfileName>
							{data?.name} {data?.surname}
						</ProfileName>
						<ProfileProf>{data?.post}</ProfileProf>
					</ProfileItem>
				</ProfileWrapper>
				<HeaderMenu />
			</RightContent>
		</>
	);
};
const ProfileWrapper = styled(Link)`
	text-decoration: none;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const RightContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 466px;
`;

const AddBtnIcon = styled(LazyLoadImage)`
	margin-right: 8px;
`;

const NoticeBtn = styled.button`
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`;

const ProfileItem = styled.div`
	margin-left: 10px;
	display: flex;
	flex-direction: column;
`;

const ProfileName = styled.h2`
	font-family: 'Inter', sans-serif;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.BLACK};
`;

const ProfileProf = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.GRAY};
`;

export default HeaderAuth;
