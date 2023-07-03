import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { PrimaryButton } from './UI/PrimaryButton';
import plus from '../assets/images/plus.svg';
import copy from '../assets/images/copy.svg';
import Ellipsis from './UI/Ellipsis';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';
import { UserResponse } from '../models/response/UserResponse';
import UsersList from './UI/UsersList';
import SimpleButton from './UI/SimpleButton';
import { Colors } from '../styles';
import { projectApi } from '../store/services/ProjectService';
import { useNavigate } from 'react-router-dom';

interface ProjectParamsProps {
	admins: UserResponse[];
	workers: UserResponse[];
	projectId: string;
	status: string;
}

const ProjectParams: FC<ProjectParamsProps> = ({
	admins,
	workers,
	projectId,
	status,
}) => {
	const { id } = useAppSelector(selectAuthUser);
	const [leave] = projectApi.useLeaveProjectMutation();
	const isWorker = workers.some((el) => el._id === id);
	const isAdmin = admins.some((el) => el._id === id);
	const navigate = useNavigate();
	const onLeave = () => {
		leave({ id: projectId });
		navigate('/projects');
	};
	const showLeave = (isAdmin && admins.length > 1) || (isWorker && !isAdmin);
	return (
		<Wrapper>
			<Top>
				<Button
					onClick={() =>
						navigator.clipboard.writeText(
							`https://web-tasks.netlify.app/#/project/${projectId}`
						)
					}
				>
					<img src={copy} alt="Скопировать" />
				</Button>
				{isWorker && (
					<Ellipsis status={status} projectId={projectId} isAdmin={isAdmin} />
				)}
				<PrimaryButton
					styles={PrimaryButtonStyles}
					type={'link'}
					to={'/project/add'}
				>
					<img src={plus} alt="Добавить проект" />
				</PrimaryButton>
			</Top>
			<UsersList
				type={'task'}
				projectId={projectId}
				admins={admins}
				workers={workers}
			/>
			{showLeave && (
				<ButtonWrapper>
					<SimpleButton
						onClick={onLeave}
						styles={SimpleButtonStyles}
						type={'button'}
					>
						Leave
					</SimpleButton>
				</ButtonWrapper>
			)}
		</Wrapper>
	);
};

const SimpleButtonStyles = css`
	color: ${Colors.RED};
	transition: all 0.3s linear;
	position: relative;
	:hover {
		background-color: ${Colors.LIGHT_GRAY};
	}
`;

const PrimaryButtonStyles = css`
	margin-left: 30px;
`;
const Wrapper = styled.div`
	grid-column: 5 span;
	display: flex;
	flex-direction: column;
`;

const ButtonWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	margin-top: auto;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
	margin-right: 30px;
	height: 14px;
`;

export default ProjectParams;
