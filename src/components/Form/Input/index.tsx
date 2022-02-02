import React from 'react';
import { TextInputProps } from 'react-native'
import { Container } from './styles';

type InputProps = TextInputProps;

interface ErrorProps extends InputProps {
	error?: any;
}

export function Input({...rest} : ErrorProps){
	return (
		<Container {...rest} error={rest.error!}/>
	);
}