import React, { useState } from 'react';
import { SvgIcon } from './UI/SvgIcon';
import { Colors } from '../styles';
import styled, { css } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../store/services/UserService';
import { setIsAuth } from '../store/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';
import Loading from './UI/Loading';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';
import { authApi } from '../store/services/AuthService';
import { setActiveMenu } from '../store/settings';
import { projectApi } from '../store/services/ProjectService';
import MenuList from './UI/MenuList';

const HeaderMenu = () => {
	const dispatch = useAppDispatch();
	const [logout] = authApi.useLogoutMutation();
	const [deleteAccount] = authApi.useDeleteMutation();

	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const Logout = async () => {
		await logout();
		localStorage.removeItem('token');
		dispatch(setIsAuth(false));
		navigate('/register');
		setMenuOpen(false);
		dispatch(projectApi.util.resetApiState());
	};
	const Delete = async () => {
		await deleteAccount();
		localStorage.removeItem('token');
		dispatch(setIsAuth(false));
		navigate('/register');
		setMenuOpen(false);
		dispatch(projectApi.util.resetApiState());

	}
	const { id } = useAppSelector(selectAuthUser);
	const { data, isLoading } = userApi.useGetUserQuery(String(id));

	const onClickProfile = () => {
		dispatch(setActiveMenu(999));
		setMenuOpen(false);
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<MenuWrapper>
			<SvgIcon
				onClick={() => setMenuOpen(!menuOpen)}
				styles={menuOpen ? SvgOpen : SvgStyles}
				name={'arrow-down'}
				size={15}
			/>
			{menuOpen && (
				<MenuList>
					<MenuItem>
						<MenuLink
							onClick={() => onClickProfile()}
							to={`/account/${data?.id}`}
						>
							Profile
						</MenuLink>
					</MenuItem>
					<MenuItem>
						<MenuLink onClick={() => setMenuOpen(false)} to={'/settings'}>
							Settings
						</MenuLink>
					</MenuItem>
					<MenuItem>
						<MenuButton onClick={() => Logout()} textColor={Colors.RED}>
							Logout
						</MenuButton>
					</MenuItem>
					<MenuItem>
						<MenuButton onClick={() => Delete()} textColor={Colors.RED}>
							Delete
						</MenuButton>
					</MenuItem>
				</MenuList>
			)}
		</MenuWrapper>
	);
};

const SvgStyles = css`
	margin-left: 15px;
	position: relative;
	cursor: pointer;
`;

const SvgOpen = css`
	margin-left: 15px;
	position: relative;
	z-index: 1000;
	cursor: pointer;
	transform: rotate(180deg);
`;

const MenuWrapper = styled.div`
	position: relative;
`;
const MenuItem = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	:not(:last-child) {
		border-bottom: 1px solid ${Colors.BLACK};
	}
`;

const MenuTextStyles = css`
	padding: 9px 73px;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.BLACK};
`;

const MenuLink = styled(Link)`
	${MenuTextStyles};
	text-decoration: none;
`;

const MenuButton = styled.button<{ textColor?: Colors }>`
	${MenuTextStyles};
	cursor: pointer;
	background-color: ${Colors.LIGHT};
	border: none;
	color: ${(props) => (props.textColor ? props.textColor : Colors.BLACK)};
`;

export default HeaderMenu;
