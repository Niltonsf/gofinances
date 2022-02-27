import React from 'react';
import { 
	Container,
	CurrentSelectedPageIndicator
} from './styles';
import { useWindowDimensions } from 'react-native';

interface PaginatorProps {
	data: any;
	scrollX: any;
}

export function Paginator({ data, scrollX }: PaginatorProps){

	const { width } = useWindowDimensions();

	return (
		<Container>
			{data.map((_: any, index: any) => {
				const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

				let dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp'
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: 'clamp'
				});		


				return (
					<CurrentSelectedPageIndicator key={index.toString()} style={{ 
						width: dotWidth,  
						opacity,					
					}} />
				);
			})}
		</Container>
	);
}