import React from 'react';
import {ErrorMessage, Form, Formik, FormikValues} from "formik";
import emailjs from "emailjs-com";
import {settingsValidate} from "../helpers/validation";
import FormInput from "./UI/FormInput";
import {Colors} from "../styles";
import SimpleButton from "./UI/SimpleButton";
import styled, {css} from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";

const FeedbackForm = () => {
    function sendEmail(object: FormikValues) {
        emailjs.send('service_drthjag', 'template_ylwlrub', object, 'WG8okJXeNddhbGn_p')
            .then((result) => {
                window.location.reload()
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div>
            <Title>Feedback form</Title>
            <Formik
                initialValues={{ from_email: '', html_message: '' }}
                validate={(values) => settingsValidate(values)}
                onSubmit={(values, { setSubmitting, resetForm  }) => {
                    setSubmitting(false);
                    sendEmail(values)
                    resetForm()
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <SettingsForm>
                        <Error name="from_email" component="div" />
                        <FormInput
                            styles={InputStyles}
                            type="email"
                            name="from_email"
                            placeholder={'Email'}
                            bordercolor={
                                touched.from_email
                                    ? errors.from_email
                                        ? Colors.RED
                                        : Colors.LIME
                                    : Colors.BLACK
                            }
                        />
                        <Error name="html_message" component="div" />
                        <FormInput
                            styles={InputStyles}
                            as={'textarea'}
                            name="html_message"
                            placeholder={'Description'}
                            bordercolor={
                                touched.html_message
                                    ? errors.html_message
                                        ? Colors.RED
                                        : Colors.LIME
                                    : Colors.BLACK
                            }
                        />
                        <Captcha  sitekey="6Lfqd_EmAAAAAKJVqH4IExBc17PRiY3IiLqAxXLX" onChange={(value) => console.log(value)}/>
                        <SimpleButton
                            type={'submit'}
                            disabled={isSubmitting}
                        >
                            Send
                        </SimpleButton>
                    </SettingsForm>
                )}
            </Formik>
        </div>
    );
};
const InputStyles = css`
	margin-bottom: 25px;
	width: 100%;
`;

const Captcha = styled(ReCAPTCHA)`
  margin-bottom: 20px;
`

const Title = styled.h2`
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
	color: ${Colors.BLACK};
    margin-bottom: 46px;

`;


const SettingsForm = styled(Form)`
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


export default FeedbackForm;