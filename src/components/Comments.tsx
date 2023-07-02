import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import AddComment from './AddComment';
import Comment from './UI/Comment';
import { commentApi } from '../store/services/CommentService';
import { useParams } from 'react-router-dom';
import Loading from './UI/Loading';
import NotFound from '../pages/NotFound';

const Comments = () => {
	const { projectId, taskId } = useParams();
	const { data, isLoading } = commentApi.useGetCommentsQuery({
		projectId: projectId || '',
		taskId: taskId || '',
	});
	if (isLoading) {
		return <Loading />;
	}
	return (
		<Wrapper>
			<Title>Comments:</Title>
			<AddComment />
			{data && data.length > 0 ? (
				<CommentsList>
					{data.map((comment) => (
						<CommentItem key={comment._id}>
							<Comment
								avatar={comment.user.avatar}
								name={comment.user.name}
								surname={comment.user.surname}
								text={comment.text}
							/>
						</CommentItem>
					))}
				</CommentsList>
			) : (
				<NotFoundComment>No comments found :(</NotFoundComment>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-top: auto;
`;

const NotFoundComment = styled.p`
	font-weight: 400;
	font-size: 28px;
	line-height: 33px;
	color: ${Colors.BLACK};
	margin-left: 100px;
	margin-top: 20px;
`;

const Title = styled.h4`
	font-weight: 400;
	font-size: 28px;
	line-height: 33px;
	color: ${Colors.BLACK};
	margin-bottom: 15px;
`;

const CommentsList = styled.ul`
	list-style: none;
`;
const CommentItem = styled.li`
	:not(:last-child) {
		margin-bottom: 30px;
	}
`;
export default Comments;
