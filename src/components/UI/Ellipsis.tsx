import React, { FC, useState } from 'react';
import ellipsis from '../../assets/images/ellipsis.svg';
import styled, { css } from 'styled-components';
import MenuList from './MenuList';
import { Colors } from '../../styles';
import { Link } from 'react-router-dom';
import { projectApi } from '../../store/services/ProjectService';

interface EllipsisProps {
	isAdmin: boolean;
	projectId: string;
	status: string;
}

const statuses = ['waiting', 'in progress', 'completed'];

const Ellipsis: FC<EllipsisProps> = ({ isAdmin, projectId, status }) => {
	const [deleteProject] = projectApi.useDeleteProjectMutation();
	const [changeStatus] = projectApi.useUpdateProjectMutation();
	const [menuOpen, setMenuOpen] = useState(false);
	const [statusIsChange, setStatusIsChange] = useState(false);

	const onClickOverlay = () => {
		setMenuOpen(false);
	};
	const onClickEllipsis = () => {
		setMenuOpen(!menuOpen);
	};
	const onClickDelete = () => {
		deleteProject(projectId);
	};
	const onChangeStatus = () => {
		changeStatus({
			id: projectId,
			status:
				statuses[
					statuses.indexOf(status) === statuses.length - 1
						? 0
						: statuses.indexOf(status) + 1
				],
		});
		setMenuOpen(!menuOpen);
	};
	return (
		<>
			{menuOpen && <Overlay onClick={onClickOverlay} />}
			<Wrapper>
				<Button onClick={onClickEllipsis}>
					<img src={ellipsis} alt="Подробнее" />
				</Button>
				{menuOpen && (
					<MenuList>
						<MenuItem id={'ellipsisItem'}>
							<MenuLink
								id={'ellipsisItem'}
								to={`/project/${projectId}/task/add`}
							>
								Add task
							</MenuLink>
						</MenuItem>
						{/*Ниже Только если админ*/}
						{isAdmin && (
							<>
								<MenuItem id={'ellipsisItem'}>
									<MenuLink
										to={`/project/${projectId}/update`}
										id={'ellipsisItem'}
									>
										Edit Project
									</MenuLink>
								</MenuItem>
								<MenuItem id={'ellipsisItem'}>
									<MenuButton onClick={onChangeStatus} id={'ellipsisItem'}>
										Change Status
									</MenuButton>
								</MenuItem>
								<MenuItem id={'ellipsisItem'}>
									<MenuButton
										onClick={onClickDelete}
										id={'ellipsisItem'}
										textColor={Colors.RED}
									>
										Delete Project
									</MenuButton>
								</MenuItem>
							</>
						)}
					</MenuList>
				)}
			</Wrapper>
		</>
	);
};
const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Wrapper = styled.div`
	position: relative;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
	margin-left: 15px;
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
	padding: 10px 0;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.BLACK};
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-radius: 5px;
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

export default Ellipsis;
