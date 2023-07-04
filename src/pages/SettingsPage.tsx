import React, {FormEvent} from 'react';
import {ErrorMessage, Form, Formik, FormikState, FormikValues} from "formik";
import {loginValidate, settingsValidate} from "../helpers/validation";
import FormInput from "../components/UI/FormInput";
import {Colors} from "../styles";
import SimpleButton from "../components/UI/SimpleButton";
import styled, {css} from "styled-components";
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";
import FeedbackForm from "../components/FeedbackForm";
import {Link} from "react-router-dom";

const SettingsPage = () => {

    return (
        <>
            <Feedback>
                <FeedbackForm/>
            </Feedback>
            <Privacy to={'/privacy'}>Privacy Policy</Privacy>
        </>
    );
};


const Privacy = styled(Link)`
	font-size: 20px;
	font-weight: 400;
	line-height: 23px;
	color: ${Colors.BLACK};
`;
const Feedback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 80vh;
`



export default SettingsPage;