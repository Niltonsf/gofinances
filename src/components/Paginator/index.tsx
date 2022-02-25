import React, { useEffect } from 'react';
import { 
	Container,
	CurrentSelectedPageIndicator
} from './styles';
import { useWindowDimensions } from 'react-native';
import { Button } from '../Form/Button';

interface PaginatorProps {
	data: any;
	scrollX: any;
	currentIndex: any;
}

export function Paginator({ data, scrollX, currentIndex }: PaginatorProps){

	const { width } = useWindowDimensions();

	return (
		<Container>
			{data.map((_: any, index: any) => {
				const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp'
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: 'clamp'
				});

				if(currentIndex.toString() === '2') console.log('certo');

				return currentIndex.toString() === '2' ? 
				<Button title="Let's build the future" onPress={() => {}} key={index.toString()} /> 
				: 
				<CurrentSelectedPageIndicator key={index.toString()} style={{ width: dotWidth, opacity }} />;
			})}
		</Container>
	);
}