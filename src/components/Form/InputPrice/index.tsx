import React from 'react';
import CurrencyInput from 'react-native-currency-input';
import { TextInputProps } from 'react-native'
import { Container } from './styles';

type InputProps = TextInputProps;

interface ErrorProps extends InputProps {
	value: any;
	onChangeValue: (value: any) => void;
	error?: any;
}

export function InputPrice({value, onChangeValue, error, ...rest} : ErrorProps) {
	return (
		<Container
			value={value}
			onChangeValue={onChangeValue}
			error={error!}
			{...rest}
		/>
	);
}