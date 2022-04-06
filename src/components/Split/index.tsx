import React from 'react';
import { Container, Text } from './styles';

interface SplitProps {
	split_text: string;
}

export function Split({ split_text }: SplitProps){
	return (
		<Container>
			<Text>
				{split_text}
			</Text>
		</Container>
	);
}