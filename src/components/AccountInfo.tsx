import React, { FC, useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled, { css } from 'styled-components';
import { Colors } from '../styles';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuthUser } from '../store/auth/selectors';
import upload from '../assets/images/upload.svg';
import { userApi } from '../store/services/UserService';
import FormInput from './UI/FormInput';
import { ErrorMessage, Form, Formik } from 'formik';
import { predictionValidate } from '../helpers/validation';
import SimpleButton from './UI/SimpleButton';
import { predictionApi } from '../store/services/PredictionService';

interface AccountInfoProps {
	avatar: string;
	name: string;
	surname: string;
	post: string;
	id: string;
}

const AccountInfo: FC<AccountInfoProps> = ({
	avatar,
	name,
	surname,
	post,
	id,
}) => {
	const [openOverlay, setOpenOverlay] = useState(false);
	const ref = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [uploadAvatar] = userApi.useUploadMutation();
	const [createPrediction] = predictionApi.useAddPredictionMutation();
	const { data } = predictionApi.useGetPredictionQuery({ id });
	useEffect(() => {
		if (file) {
			const data = new FormData();
			data.append('avatar', file);
			uploadAvatar(data);
		}
	}, [file]);

	const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null) {
			setFile(e.target.files[0]);
		}
	};
	const user = useAppSelector(selectAuthUser);
	const isOwner = id === user.id;
	return (
		<Section>
			<ImageWrapper
				onMouseOut={() => setOpenOverlay(false)}
				onMouseOver={() => setOpenOverlay(true)}
			>
				{isOwner && (
					<>
						<Overlay openOverlay={openOverlay} />
						<Icon openOverlay={openOverlay} src={upload} />
						<File ref={ref} type="file" onChange={onUpload} />
					</>
				)}

				<LazyLoadImage
					src={
						avatar
							? `http://localhost:7000/api/uploads/${avatar}`
							: 'http://localhost:7000/api/uploads/user.png'
					}
					height={233}
					width={233}
				></LazyLoadImage>
			</ImageWrapper>
			<Info>
				<ProfileInfo>
					Name: <span>{name}</span>
				</ProfileInfo>
				<ProfileInfo>
					Surname: <span>{surname}</span>
				</ProfileInfo>
				<ProfileInfo>
					Post: <span>{post}</span>
				</ProfileInfo>
				{data && (
					<ProfileInfo>
						Prediction: <span>{data.count} Tasks</span>
					</ProfileInfo>
				)}
				{isOwner && !data && (
					<Formik
						initialValues={{
							prediction: '',
						}}
						validate={(values) => predictionValidate(values)}
						onSubmit={async (values, { setSubmitting }) => {
							await createPrediction({
								count: Number(values.prediction),
							});
							setSubmitting(false);
						}}
					>
						{({ errors, touched, isSubmitting }) => (
							<PredictionForm>
								<Error name="prediction" component="div" />
								<FormInput
									type="text"
									name="prediction"
									placeholder={'Prediction tasks'}
									bordercolor={
										touched.prediction
											? errors.prediction
												? Colors.RED
												: Colors.LIME
											: Colors.BLACK
									}
								/>

								<SimpleButton
									styles={SimpleButtonStyles}
									type={'submit'}
									disabled={isSubmitting}
								>
									Save
								</SimpleButton>
							</PredictionForm>
						)}
					</Formik>
				)}
			</Info>
		</Section>
	);
};

const SimpleButtonStyles = css`
	margin-left: 15px;
`;

const PredictionForm = styled(Form)`
	margin-top: 20px;
`;

const Section = styled.section`
	display: flex;
`;
const ImageWrapper = styled.div`
	position: relative;
	overflow: hidden;
`;

const File = styled.input`
	position: absolute;
	height: 100%;
	width: 100%;
	opacity: 0;
	cursor: pointer;
`;

const Icon = styled.img<{ openOverlay: boolean }>`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 48px;
	height: 48px;
	cursor: pointer;
	opacity: ${(props) => (props.openOverlay ? 1 : 0)};
	object-fit: cover;
	transition: all 0.3s;
`;
const Overlay = styled.div<{ openOverlay: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: ${(props) => (props.openOverlay ? 0.5 : 0)};
	background-color: ${Colors.BLACK};
	transition: all 0.3s;
`;

const Error = styled(ErrorMessage)`
	width: max-content;
	margin-bottom: 10px;
	background-color: ${Colors.LIGHT};
	color: ${Colors.RED};
	border: 1px solid #000000;
	border-radius: 5px;
	padding: 6px 11px;
`;

const Info = styled.div`
	margin-left: 31px;
	flex-direction: column;
`;

const ProfileInfo = styled.p`
	font-weight: 400;
	font-size: 28px;
	line-height: 33px;
	color: ${Colors.GRAY};

	span {
		color: ${Colors.BLACK};
	}

	:not(:first-child) {
		margin-top: 12px;
	}
`;

export default AccountInfo;
