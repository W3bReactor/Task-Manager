import React, { useEffect } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { loginValidate } from '../helpers/validation';
import FormInput from './UI/FormInput';
import { Colors } from '../styles';
import SimpleButton from './UI/SimpleButton';
import styled, { css } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setIsAuth, setUser } from '../store/auth';
import { authApi } from '../store/services/AuthService';

const Login = () => {
	const [login, { isSuccess, isError, data: loginData }] =
		authApi.useLoginMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess && loginData) {
			localStorage.setItem('token', loginData.accessToken);
			dispatch(setIsAuth(true));
			dispatch(setUser(loginData.user));
			navigate(`/account/${loginData.user.id}`);
		}
		if (isError) {
			alert('Неверная почта или пароль');
		}
	}, [isSuccess, isError]);
	return (
		<>
			<Formik
				initialValues={{ email: '', password: '' }}
				validate={(values) => loginValidate(values)}
				onSubmit={(values, { setSubmitting }) => {
					login({ email: values.email, password: values.password });
					setSubmitting(false);
				}}
			>
				{({ errors, touched, isSubmitting }) => (
					<LoginForm>
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
								Login
							</SimpleButton>
							<LoginLink to={'/register'}>Or Register</LoginLink>
						</Items>
					</LoginForm>
				)}
			</Formik>
		</>
	);
};
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
const LoginForm = styled(Form)`
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
export default Login;
