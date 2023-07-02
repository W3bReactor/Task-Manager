import React, { FC } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Colors } from '../../styles';

interface CommentProps {
	avatar?: string;
	name: string;
	surname: string;
	text: string;
}

const Comment: FC<CommentProps> = ({ avatar, text, surname, name }) => {
	return (
		<CommentWrapper>
			<Avatar
				width={48}
				height={48}
				src={
					avatar
						? `${process.env.REACT_APP_SERVER_URL}/api/uploads/${avatar}`
						: `${process.env.REACT_APP_SERVER_URL}/api/uploads/user.png`
				}
			/>
			<CommentInfo>
				<Name>
					{name} {surname}
				</Name>
				<Text>{text}</Text>
			</CommentInfo>
		</CommentWrapper>
	);
};

const CommentWrapper = styled.div`
	display: flex;
	align-items: flex-start;
`;

const CommentInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const Avatar = styled(LazyLoadImage)`
	border-radius: 100%;
	margin-right: 10px;
`;

const Name = styled.h5`
	font-family: 'Inter', serif;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	margin-bottom: 5px;
`;

const Text = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.BLACK};
`;
export default Comment;
