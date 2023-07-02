import React, { FC, useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { projectValidate } from '../helpers/validation';
import FormInput from './UI/FormInput';
import { Colors } from '../styles';
import styled, { css } from 'styled-components';
import { PrimaryButton } from './UI/PrimaryButton';
import { projectApi } from '../store/services/ProjectService';
import { useNavigate } from 'react-router-dom';
import TagsInput from './TagsInput';
import { tagsApi } from '../store/services/TagsService';

interface AddProjectProps {
	title?: string;
	description?: string;
	initialTags?: string[];
	type?: 'update' | 'add';
	projectId?: string;
}

const AddProject: FC<AddProjectProps> = ({
	title,
	initialTags = [],
	description = '',
	type = 'add',
	projectId,
}) => {
	const [add, { data, isSuccess }] = projectApi.useAddProjectMutation();
	const [update, { isSuccess: updateIsSuccess }] =
		projectApi.useUpdateProjectMutation();
	const [addTag] = tagsApi.useAddTagMutation();
	const navigate = useNavigate();
	const [tags, setTags] = useState<string[]>(initialTags);
	useEffect(() => {
		if (isSuccess && data) {
			navigate(`/project/${data._id}`);
		}
		if (updateIsSuccess) {
			navigate(`/project/${projectId}`);
		}
	}, [isSuccess, updateIsSuccess]);
	const addProject = async (values: FormikValues) => {
		try {
			const promises = tags.map((tag) => addTag({ value: tag }).unwrap());
			const results = await Promise.all(promises);
			if (results) {
				if (type === 'add') {
					await add({
						title: values.title,
						description: values.description,
						tags: tags,
					});
				} else if (type === 'update') {
					await update({
						id: projectId || '',
						title: values.title,
						description: values.description,
						tags: tags,
					});
				}
			}
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Formik
			initialValues={{ title: title, description: description, tags: '' }}
			validate={(values) => projectValidate(values, tags)}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				await addProject(values);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ values, errors, touched, isSubmitting, setValues }) => (
				<ProjectForm>
					<Error name="title" component="div" />
					<FormInput
						styles={InputStyles}
						as={'input'}
						type="text"
						name="title"
						placeholder={'Title'}
						bordercolor={
							touched.title
								? errors.title
									? Colors.RED
									: Colors.LIME
								: Colors.BLACK
						}
					/>
					<Error name="description" component="div" />
					<FormInput
						styles={InputStyles}
						as={'textarea'}
						name="description"
						placeholder={'Description'}
						bordercolor={
							touched.description
								? errors.description
									? Colors.RED
									: Colors.LIME
								: Colors.BLACK
						}
					/>
					<TagsInput
						tags={tags}
						setTags={(el) => setTags(el)}
						errors={errors}
						touched={touched}
						values={values}
					/>
					<Item>
						<PrimaryButton styles={PrimaryButtonStyles} disabled={isSubmitting}>
							{type} Project
						</PrimaryButton>
					</Item>
				</ProjectForm>
			)}
		</Formik>
	);
};

const PrimaryButtonStyles = css`
	text-transform: capitalize;
`;

const InputStyles = css`
	width: 100%;
	margin-bottom: 25px;
`;

const ProjectForm = styled(Form)`
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

const Item = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default AddProject;
