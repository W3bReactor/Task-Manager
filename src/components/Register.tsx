import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import SimpleButton from './UI/SimpleButton';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormInput from './UI/FormInput';
import { Colors } from '../styles';
import { registerValidate } from '../helpers/validation';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setIsAuth } from '../store/auth';
import { authApi } from '../store/services/AuthService';

const Register = () => {
	const [register, { isSuccess, data }] = authApi.useRegisterMutation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setIsAuth(true));
			navigate('/verify');
		}
	}, [isSuccess]);
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				name: '',
				surname: '',
				post: '',
			}}
			validate={(values) => registerValidate(values)}
			onSubmit={async (values, { setSubmitting }) => {
				await register({
					email: values.email,
					password: values.password,
					surname: values.surname,
					name: values.name,
					post: values.post,
				});
				Register();
				setSubmitting(false);
			}}
		>
			{({ errors, touched, isSubmitting }) => (
				<RegisterForm>
					<Error name="name" component="div" />
					<FormInput
						styles={InputStyles}
						type="text"
						name="name"
						placeholder={'Name'}
						bordercolor={
							touched.name
								? errors.name
									? Colors.RED
									: Colors.LIME
								: Colors.BLACK
						}
					/>
					<Error name="surname" component="div" />
					<FormInput
						styles={InputStyles}
						type="text"
						name="surname"
						placeholder={'Surname'}
						bordercolor={
							touched.surname
								? errors.surname
									? Colors.RED
									: Colors.LIME
								: Colors.BLACK
						}
					/>
					<Error name="post" component="div" />
					<Select
						bordercolor={
							touched.post
								? errors.post
									? Colors.RED
									: Colors.LIME
								: Colors.BLACK
						}
						component="select"
						name="post"
					>
						<Option value="" hidden disabled selected>
							Post
						</Option>
						<Option value="Unemployed">Unemployed</Option>
						<Option value="Frontend">Frontend</Option>
						<Option value="Backend">Backend</Option>
						<Option value="Fullstack">Fullstack</Option>
						<Option value="Designer">Designer</Option>
						<Option value="Game Developer">Game Developer</Option>
						<Option value="Data Scientist">Data Scientist</Option>
						<Option value="Product Manager">Product Manager</Option>
						<Option value="Imposer">Imposer</Option>
						<Option value="Software Tester">Software Tester</Option>
						<Option value="System Administrator">System Administrator</Option>
						<Option value="System Engineer">System Engineer</Option>
					</Select>
					<Error name="email" component="div" />
					<FormInput
						styles={InputStyles}
						type="email"
						name="email"
						placeholder={'Email'}
						bordercolor={
							touched.email
								? errors.email
									? Colors.RED
									: Colors.LIME
								: Colors.BLACK
						}
					/>

					<Error name="password" component="div" />
					<FormInput
						styles={InputStyles}
						type="password"
						name="password"
						placeholder={'Password'}
						bordercolor={
							touched.password
								? errors.password
									? Colors.RED
									: Colors.LIME
								: Colors.BLACK
						}
					/>
					<Items>
						<SimpleButton
							type={'submit'}
							styles={ButtonStyles}
							disabled={isSubmitting}
						>
							Register
						</SimpleButton>
						<LoginLink to={'/login'}>Or Login</LoginLink>
					</Items>
				</RegisterForm>
			)}
		</Formik>
	);
};

const Select = styled(Field)<{ bordercolor?: Colors }>`
	border: 1px solid ${(props) => props.bordercolor};
	padding: 18px 20px;
	outline: none;
	border-radius: 10px;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	margin-bottom: 25px;
`;

const Option = styled.option`
	width: 100%;
	border-radius: 10px;
	font-weight: 400;
	line-height: 19px;
	font-size: 120%;
`;

const InputStyles = css`
	margin-bottom: 25px;
	width: 100%;
`;

const ButtonStyles = css`
	max-width: max-content;
`;

const Items = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const LoginLink = styled(Link)`
	margin-left: 30px;
	display: block;
	text-decoration: none;
	color: ${Colors.GRAY};
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
`;
const RegisterForm = styled(Form)`
	max-width: 349px;
	width: 100%;
	display: flex;
	flex-direction: column;
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

export default Register;
