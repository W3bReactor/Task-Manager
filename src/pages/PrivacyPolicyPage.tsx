import React from 'react';
import styled from "styled-components";
import {Colors} from "../styles";
import FeedbackForm from "../components/FeedbackForm";

const PrivacyPolicyPage = () => {
    return (
        <Wrapper>
            <Title>Privacy and Policy</Title>

            <Desc>
                We never sell personal data and we carry out all processing operations in strict compliance with the EU General Data Protection Regulation (GDPR).

                Cookies are stored on your individual device and you have full control over their use. You may deactivate or restrict the transmission of cookies by changing the settings of your web browser. Cookies data that are already stored may be deleted (only if you are a registered user or provide us with the full cookie identificator) at any time by appealing to our support team — vaironfor@mail.ru.

                If you visit web-tasks site with cookies deactivated, you may possibly not be able to use all of the functions of our site to the full extent. You will not be able to opt-out of any cookies or other technologies that are “strictly necessary” for the functioning of our website and services.

                You can exercise any of the rights mentioned in this Privacy Policy in your Account and/or by contact with Web-Tasks team: vaironfor@mail.ru. In the event of questions or comments relating to the use of Personal Data you may also contact Web-Tasks team: vaironfor@mail.ru.

                Where you have provided consent, you may withdraw it at any time, without affecting the lawfulness of the processing that was carried out prior to withdrawing it. Whenever you withdraw consent, you acknowledge and accept that this may have a negative influence on the quality of the Web-Tasks Site and/or Services. You further agree that Web-Tasks shall not be held liable with respect to any loss and/or damage to your Personal Data if you choose to withdraw consent.

                Where Personal Data is processed for the above purposes on the basis of Web-Tasks legitimate interests, under the GDPR, you may object to such processing at any time. To do so please contact: vaironfor@mail.ru.

                You may opt-out from having Web-Tasks collect your information when visiting an Web-Tasks Enabled Site at any time by contact with Web-Tasks Enabled Site support team or Web-Tasks support team: vaironfor@mail.ru.
            </Desc>
            <SubTitle>Who are we?</SubTitle>
            <Desc>Our website address - <a rel={'noreferrer'} target={'_blank'} href='https://web-tasks.netlify.app/'>https://web-tasks.netlify.app/</a></Desc>
            <SubTitle>Rights of data subjects.</SubTitle>
            <Desc>Link to contacts for sending a request for data: <a href="mailto:vaironfor@mail.ru">vaironfor@mail.ru</a>. Or you can use our feedback form.</Desc>
            <SubTitle>What personal data we collect and for what purpose</SubTitle>
            <SubSubTitle>Projects</SubSubTitle>
            <Desc>If a visitor creates a project on the site, we collect the data indicated in the project form. This data can be seen by any registered user. This is done in order to provide our services.</Desc>
            <SubSubTitle>Tasks</SubSubTitle>
            <Desc>If a visitor creates a task on the site, we collect the data indicated in the task form. This data can only be seen by those who are in the same project. This is done in order to provide our services.</Desc>
            <SubSubTitle>Comments</SubSubTitle>
            <Desc>If a visitor creates a comment on the site, we collect the data indicated in the comment form. This data can only be seen by those who are in the same task. This is done in order to provide our services.</Desc>
            <SubSubTitle>Tags</SubSubTitle>
            <Desc>If a visitor creates a tag on the site, we collect the data specified in the tag form. This data can be seen by any registered user. This is done in order to provide our services.</Desc>
            <SubSubTitle>Predictions</SubSubTitle>
            <Desc>If a visitor creates a prediction on the site, we collect the data indicated in the prediction form. This data can be seen by any registered user. This is done in order to provide our services. This is done in order to provide our services.</Desc>
            <SubSubTitle>Cookie</SubSubTitle>
            <Desc>Cookies are small files that a site or its service provider transfers to your computers hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information.</Desc>
            <Desc>When you sign in to your account, we set a cookie with your login information. Login cookies are stored for seven days. This is done for your convenience, so as not to fill in the data again when you re-enter the site. When you log out of your account, the login cookies will be deleted.</Desc>
            <SubSubTitle>Feedback</SubSubTitle>
            <Desc>The feedback on this site is created through the EmailJs service. Data is sent from the feedback form to email vaironfor@mail.ru. This service may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with embedded content, including interaction tracking.</Desc>
            <SubTitle>How long do we keep your data</SubTitle>
            <Desc>If you create a project, task, comment, forecast, or tag, then the project, task, comment, forecast, or tag remains indefinitely. This is done in order to be able to provide our services.</Desc>
            <SubTitle>Where do we send your data</SubTitle>
            <Desc>User data, comments, tasks, projects, forecasts, tags are sent to MongoDB servers and EmailJs servers.</Desc>
            <Feedback>
                <FeedbackForm/>
            </Feedback>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  min-height: 80vh;
`

const Feedback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 30px; 
`

const Title = styled.h2`
	margin-bottom: 28px;
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
	color: ${Colors.BLACK};
`;
const SubTitle = styled.h3`
	margin-bottom: 14px;
	margin-top: 14px;
	font-weight: 400;
    font-size: 28px;
    line-height: 33px;
	color: ${Colors.BLACK};
`;
const SubSubTitle = styled.h4`
	margin-bottom: 14px;
	margin-top: 14px;
	font-weight: 400;
    font-size: 24px;
    line-height: 28px;
	color: ${Colors.BLACK};
`;
const Desc = styled.p`
	font-size: 20px;
	font-weight: 400;
	line-height: 23px;
	color: ${Colors.BLACK};
`;

export default PrivacyPolicyPage;