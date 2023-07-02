import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { commentValidate } from '../helpers/validation';
import { Colors } from '../styles';
import styled, { css } from 'styled-components';
import BlackButton from './UI/BlackButton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { selectAuthUser } from '../store/auth/selectors';
import { useAppSelector } from '../hooks/useAppSelector';
import { commentApi } from '../store/services/CommentService';
import { useParams } from 'react-router-dom';

const AddComment: FC = () => {
	const [add] = commentApi.useAddCommentMutation();
	const user = useAppSelector(selectAuthUser);
	const { projectId, taskId } = useParams();
	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.style.height = String(0);
		e.target.style.height = e.target.scrollHeight + 'px';
	};
	const addComment = async (values: FormikValues) => {
		await add({
			text: values.comment,
			projectId: projectId || '',
			taskId: taskId || '',
		});
	};
	return (
		<Formik
			initialValues={{ comment: '' }}
			validate={(values) => commentValidate(values)}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				addComment(values);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ errors, touched }) => (
				<CommentForm>
					<CommentWrapper>
						<Avatar
							width={48}
							height={48}
							src={
								user.avatar
									? `${process.env.REACT_APP_SERVER_URL}/api/uploads/${user.avatar}`
									: `${process.env.REACT_APP_SERVER_URL}/api/uploads/user.png`
							}
						/>
						<CommentInput
							onInput={onInput}
							name="comment"
							forwardedAs={'textarea'}
							placeholder={'Enter a comment'}
							bordercolor={
								touched.comment
									? errors.comment
										? Colors.RED
										: Colors.BLACK
									: Colors.BLACK
							}
						/>
					</CommentWrapper>
					<CommentWrapper>
						<ErrorMessage name="comment" component="div" />
						<BlackButton styles={BlackButtonStyles} type={'submit'}>
							Send
						</BlackButton>
					</CommentWrapper>
				</CommentForm>
			)}
		</Formik>
	);
};

const BlackButtonStyles = css`
	margin-left: auto;
`;

const CommentWrapper = styled.div`
	margin-top: 10px;
	display: flex;
`;

const Avatar = styled(LazyLoadImage)`
	margin-right: 5px;
	border-radius: 100%;
`;

const CommentForm = styled(Form)`
	max-width: 463px;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const CommentInput = styled(Field)<{ height?: number; bordercolor?: Colors }>`
	margin-top: 10px;
	width: 100%;
	background-color: transparent;
	height: ${(props) => (props.height ? `${props.height}px` : '25px')};
	overflow-y: hidden;
	outline: none;
	border: none;
	border-bottom: 1px solid
		${(props) => (props.bordercolor ? props.bordercolor : Colors.BLACK)};
	margin-bottom: 20px;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	padding-bottom: 5px;
	resize: none;
	color: ${(props) => (props.bordercolor ? props.bordercolor : Colors.BLACK)};

	::placeholder {
		color: ${Colors.GRAY};
	}
`;

export default AddComment;
