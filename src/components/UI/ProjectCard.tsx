import React, { FC } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { Colors } from '../../styles';
import copy from '../../assets/images/copy.svg';
import { Tag } from './Tag';
import Ellipsis from './Ellipsis';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAuthUser } from '../../store/auth/selectors';
import { UserResponse } from '../../models/response/UserResponse';

interface ProjectCardProps {
	title: string;
	description: string;
	tags: string[];
	workers: UserResponse[];
	id: string;
	admins: UserResponse[];
	status: string;
}

export const ProjectCard: FC<ProjectCardProps> = ({
	title,
	description,
	tags,
	workers,
	id,
	admins,
	status,
}) => {
	const user = useAppSelector(selectAuthUser);
	const maxWorkers = workers.slice(0, 3);
	const desc =
		description.length > 100 ? `${description.slice(0, 100)}...` : description;
	const isAdmin = admins.some((el) => el._id === user.id);
	return (
		<Wrapper>
			<Top>
				<TitleLink to={`/project/${id}`}>
					<Title>{title}</Title>
				</TitleLink>
				<Ellipsis status={status} projectId={id} isAdmin={isAdmin} />
			</Top>
			<Desc>{desc}</Desc>
			{tags && tags.length > 0 && (
				<Tags>
					{tags.map((tag) => (
						<TagItem key={tag}>
							<Tag>{tag}</Tag>
						</TagItem>
					))}
				</Tags>
			)}
			<Bottom>
				<Content>
					<Button
						onClick={() =>
							navigator.clipboard.writeText(
								`https://web-tasks.netlify.app/#/project/${id}`
							)
						}
					>
						<img src={copy} alt="Скопировать" />
					</Button>
					{/*<Button styles={ButtonStyles}>*/}
					{/*	<Count>3</Count>*/}
					{/*	<SvgIcon name={'small_message'} size={14} />*/}
					{/*</Button>*/}
				</Content>
				<List>
					{maxWorkers.map((worker) => (
						<Item key={worker._id}>
							<Image
								src={
									worker.avatar
										? `${process.env.REACT_APP_SERVER_URL}/api/uploads/${worker.avatar}`
										: `${process.env.REACT_APP_SERVER_URL}/api/uploads/user.png`
								}
								alt={worker.name}
							/>
						</Item>
					))}
				</List>
			</Bottom>
		</Wrapper>
	);
};

// const ButtonStyles = css`
// 	margin-left: 24px;
// `;

const Wrapper = styled.div`
	background-color: ${Colors.LIGHT};
	border-radius: 10px;
	padding: 19px;
`;

const Top = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
`;

const TitleLink = styled(Link)`
	text-decoration: none;
`;

const Title = styled.h3`
	font-size: 19px;
	font-weight: 500;
	line-height: 22px;
	color: ${Colors.BLACK};
`;

const Button = styled.button<{ styles?: FlattenSimpleInterpolation }>`
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
	display: flex;
	${(props) => props.styles}
`;

const Desc = styled.p`
	font-size: 14px;
	font-weight: 400;
	line-height: 17px;
	color: ${Colors.GRAY};
	margin-bottom: 17px;
`;

const Tags = styled.ul`
	list-style: none;
`;

const TagItem = styled.li`
	display: inline-block;
	margin-bottom: 19px;

	:not(:last-child) {
		margin-right: 5px;
	}
`;

const Bottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Count = styled.p`
	font-size: 14px;
	font-weight: 400;
	line-height: 17px;
	color: ${Colors.GRAY};
	margin-right: 3px;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
`;

const List = styled.ul`
	position: relative;
	list-style: none;
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
`;
const Item = styled.li`
	position: relative;
	width: 22px;
	height: 31px;
`;

const Image = styled.img`
	width: 31px;
	height: 31px;
	position: absolute;

	border: 1px solid ${Colors.LIGHT};
	border-radius: 100%;
`;
