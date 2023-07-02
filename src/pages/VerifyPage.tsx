import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import { userApi } from '../store/services/UserService';
import NotFound from './NotFound';
import Loading from '../components/UI/Loading';

const VerifyPage = () => {
	const { data, isLoading, isError } = userApi.useGetMeQuery();
	if (isLoading) {
		return <Loading />;
	}
	return (
		<Section>
			{data && data.isActivated ? (
				<>
					<Title>Nice!</Title>
					<Desc>Your email has been verified.</Desc>
				</>
			) : (
				<>
					<Title>Good!</Title>
					<SubTitle>Verify your mail</SubTitle>
					<Desc>
						You received a message in the mail, follow the link to confirm the
						mail
					</Desc>
				</>
			)}
			{isError && <NotFound />}
		</Section>
	);
};

const Section = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 80vh;
`;

const Title = styled.h2`
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
	color: ${Colors.BLACK};
`;

const SubTitle = styled.h3`
	font-weight: 400;
	font-size: 32px;
	line-height: 38px;

	color: ${Colors.BLACK};
`;

const Desc = styled.p`
	max-width: 444px;
	font-weight: 400;
	font-size: 28px;
	line-height: 33px;
	text-align: center;
	color: ${Colors.BLACK};
`;

export default VerifyPage;
