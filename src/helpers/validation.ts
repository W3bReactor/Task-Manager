import { FormikValues } from 'formik';

export const registerValidate = (values: FormikValues) => {
	const errors: {
		email?: string;
		password?: string;
		name?: string;
		surname?: string;
		post?: string;
	} = {};

	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length <= 8) {
		errors.password = 'Size less than password 8 characters';
	}
	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length >= 255) {
		errors.name = 'Name cannot be more than 255 characters';
	}
	if (!values.surname) {
		errors.surname = 'Required';
	} else if (values.surname.length >= 255) {
		errors.surname = 'Surname cannot be more than 255 characters';
	}
	if (values.post === 'Post' || !values.post) {
		errors.post = 'Required';
	}
	return errors;
};
export const loginValidate = (values: FormikValues) => {
	const errors: {
		email?: string;
		password?: string;
	} = {};

	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length <= 8) {
		errors.password = 'Size less than password 8 characters';
	}
	return errors;
};

export const projectValidate = (values: FormikValues, tags: string[]) => {
	const errors: {
		title?: string;
		description?: string;
		tags?: string;
	} = {};
	if (!values.title) {
		errors.title = 'Required';
	} else if (values.title.length > 50) {
		errors.title = 'Title cannot exceed 50 characters';
	}
	if (!values.description) {
		errors.description = 'Required';
	} else if (values.description.length > 255) {
		errors.description = 'Description cannot exceed 255 characters';
	}
	if (values.tags.length > 10) {
		errors.tags = 'Tag cannot be more than 10 characters';
	}
	if (tags.length > 5) {
		errors.tags = 'The number of tags cannot be more than 5';
	}
	if (tags.includes(values.tags.trim())) {
		errors.tags = 'This tag already exists';
	}
	return errors;
};

export const taskValidate = (values: FormikValues, tags: string[]) => {
	const errors: {
		title?: string;
		description?: string;
		tags?: string;
		date?: string;
		timer?: string;
	} = {};
	if (!values.title) {
		errors.title = 'Required';
	} else if (values.title.length > 50) {
		errors.title = 'Title cannot exceed 50 characters';
	}
	if (!values.description) {
		errors.description = 'Required';
	} else if (values.description.length > 255) {
		errors.description = 'Description cannot exceed 255 characters';
	}
	if (values.tags.length > 10) {
		errors.tags = 'Tag cannot be more than 10 characters';
	}
	if (tags.length > 5) {
		errors.tags = 'The number of tags cannot be more than 5';
	}
	if (tags.includes(values.tags.trim())) {
		errors.tags = 'This tag already exists';
	}
	if (values.date < new Date().toLocaleDateString('fr-CA')) {
		errors.date = 'Date earlier than today';
	}
	if (values.timer === '00:00') {
		errors.timer = 'Timer cannot be set to 0 minutes';
	}

	return errors;
};

export const commentValidate = (values: FormikValues) => {
	const errors: {
		comment?: string;
	} = {};
	if (!values.comment) {
		errors.comment = 'Required';
	} else if (values.comment.length > 255) {
		errors.comment = 'Comment cannot exceed 255 characters';
	}

	return errors;
};

export const predictionValidate = (values: FormikValues) => {
	const errors: {
		prediction?: string;
	} = {};
	if (!values.prediction) {
		errors.prediction = 'Required';
	} else if (!Number.isInteger(Number(values.prediction))) {
		errors.prediction = 'Prediction must be a number';
	} else if (values.prediction < 0) {
		errors.prediction = 'Prediction cannot be negative';
	}

	return errors;
};
