import React from 'react';
import { 
	TouchContainer,
	Container,
	Category,
	Icon
} from './styles';

interface CategorySelectProps {
	title: string;
	onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: CategorySelectProps){
	return (
		<TouchContainer onPress={onPress}>
			<Container>
				<Category>
					{title}
				</Category>
				<Icon name="chevron-down"/>
			</Container>
		</TouchContainer>
	);
}