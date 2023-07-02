import React, { FC, useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { taskValidate } from '../helpers/validation';
import FormInput from './UI/FormInput';
import { Colors } from '../styles';
import TagsInput from './TagsInput';
import { PrimaryButton } from './UI/PrimaryButton';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { tagsApi } from '../store/services/TagsService';
import { taskApi } from '../store/services/TaskService';
import { getTime } from '../helpers/getTime';

interface AddTaskProps {
	title?: string;
	description?: string;
	initialTags?: string[];
	type?: 'update' | 'add';
	projectId: string;
	taskId?: string;
	timer?: number;
	dueDate?: Date;
}

const AddTask: FC<AddTaskProps> = ({
	title,
	initialTags = [],
	timer,
	description = '',
	type = 'add',
	projectId,
	taskId,
	dueDate,
}) => {
	const [add, { isSuccess, data }] = taskApi.useAddTaskMutation();
	const [update, { isSuccess: updateIsSuccess }] =
		taskApi.useUpdateTaskMutation();

	const [addTag] = tagsApi.useAddTagMutation();
	const navigate = useNavigate();
	const [tags, setTags] = useState<string[]>(initialTags);
	const [withTimer, setWithTimer] = useState(timer ? !!timer : false);
	useEffect(() => {
		if (isSuccess && data) {
			navigate(`/project/${projectId}/task/${data._id}`);
		}
		if (updateIsSuccess) {
			navigate(`/project/${projectId}/task/${taskId}`);
		}
	}, [isSuccess, updateIsSuccess]);

	const addTask = async (values: FormikValues) => {
		try {
			const promises = tags.map((tag) => addTag({ value: tag }).unwrap());
			const times = values.timer.split(':');
			const timer = withTimer
				? Number(times[0]) * 60 + Number(times[1])
				: undefined;

			const results = await Promise.all(promises);
			if (results) {
				if (type === 'add') {
					await add({
						title: values.title,
						description: values.description,
						tags: tags,
						projectId,
						timer: timer,
						dueDate: values.date,
					});
				} else if (type === 'update') {
					await update({
						dueDate: values.date,
						id: taskId || '',
						title: values.title,
						description: values.description,
						projectId,
						tags: tags,
						timer: timer || 0,
					});
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Formik
			initialValues={{
				title: title,
				description: description,
				tags: '',
				date: dueDate
					? new Date(dueDate).toLocaleDateString('fr-CA')
					: new Date().toLocaleDateString('fr-CA'),
				timer: timer ? getTime(timer) : '00:01',
			}}
			validate={(values) => taskValidate(values, tags)}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				await addTask(values);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ values, errors, touched, isSubmitting }) => (
				<TaskForm>
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
					<Error name="date" component="div" />
					<Label htmlFor="date">Due Date:</Label>
					<FormInput
						styles={InputStyles}
						as={'input'}
						type="date"
						name="date"
						placeholder={'Date'}
						bordercolor={
							touched.date
								? errors.date
									? Colors.RED
									: Colors.LIME
								: Colors.BLACK
						}
						min={new Date().toLocaleDateString('fr-CA')}
					/>
					<Error name="timer" component="div" />
					<Legend>
						<Checkbox
							defaultChecked={!!timer}
							id={'checkbox'}
							type="checkbox"
							onClick={() => setWithTimer(!withTimer)}
						/>
						<Label htmlFor={'checkbox'}>Timer{withTimer && ':'}</Label>
					</Legend>
					{withTimer && (
						<FormInput
							styles={InputStyles}
							as={'input'}
							type="time"
							name="timer"
							placeholder={'Timer'}
							bordercolor={
								touched.timer
									? errors.timer
										? Colors.RED
										: Colors.LIME
									: Colors.BLACK
							}
							min={'00:01'}
						/>
					)}
					<Item>
						<PrimaryButton styles={PrimaryButtonStyles} disabled={isSubmitting}>
							{type} Task
						</PrimaryButton>
					</Item>
				</TaskForm>
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

const Legend = styled.div`
	display: flex;
	align-items: center;
`;

const Checkbox = styled.input`
	width: max-content;
	margin-bottom: 5px;
	margin-right: 10px;
`;

const TaskForm = styled(Form)`
	max-width: 349px;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${Colors.GRAY};
	margin-bottom: 5px;
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

export default AddTask;
