import React from 'react';
import { 
	Container,
	Title,
	Icon 
} from './styles';
import { TouchableOpacityProps } from 'react-native';

const icons = {
	up: 'arrow-up-circle',
	down: 'arrow-down-circle',
}

interface TransactionTypeButtonProps extends TouchableOpacityProps {
	title: string;
	type: 'up' | 'down';
	isActive: boolean;
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: TransactionTypeButtonProps){
	return (
		<Container {...rest} isActive={isActive} type={type}>
			<Icon 
				name={icons[type]}
				type={type}
			/>
			<Title>
				{title}
			</Title>
		</Container>
	);
}