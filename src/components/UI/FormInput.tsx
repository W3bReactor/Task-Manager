import React, { FC } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { Colors } from '../../styles';
import { Field, useField } from 'formik';

interface FormInput {
	bordercolor?: Colors;
	placeholder: string;
	type?: string;
	name: string;
	value?: string;
	styles?: FlattenSimpleInterpolation;
	as?: 'textarea' | 'input';
	[x: string]: any;
}

const FormInput: FC<FormInput> = ({
	bordercolor,
	placeholder,
	name,
	type,
	value,
	styles,
	as,
	...props
}) => {
	const [field, meta, helpers] = useField(name);
	return (
		<>
			{as ? (
				<Input
					styles={styles}
					as={as}
					value={meta.value}
					type={type}
					onBlur={() => helpers.setTouched(meta.value, true)}
					onChange={field.onChange}
					name={name}
					placeholder={placeholder}
					bordercolor={bordercolor}
					{...props}
				/>
			) : (
				<Input
					styles={styles}
					type={type}
					name={name}
					value={value}
					placeholder={placeholder}
					bordercolor={bordercolor}
				/>
			)}
		</>
	);
};

const Input = styled(Field)<{
	bordercolor?: Colors;
	styles?: FlattenSimpleInterpolation;
}>`
	border: 1px solid ${(props) => props.bordercolor};
	padding: 18px 20px;
	outline: none;
	border-radius: 10px;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	::placeholder {
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: ${Colors.GRAY};
	}
	${(props) => props.styles}
`;

export default FormInput;
