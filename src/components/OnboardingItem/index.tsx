import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { 
	Container,
	TitleContainer,
	Title,
	Description,
	Image
} from './styles';
import { useWindowDimensions } from 'react-native';

interface OnboardingItemProps{
	image: ImageSourcePropType;
	title: string;
	description: string;
}

export function OnboardingItem({ image, title, description }: OnboardingItemProps){ 
	const { width } = useWindowDimensions();
	return (
		<Container style={{ width: width}}>
			<Image source={image} style={{
				width: width,
				resizeMode: 'contain'
			}}/>

			<TitleContainer>
				<Title>
					{title}
				</Title>

				<Description>
					{description}
				</Description>
			</TitleContainer>
		</Container>
	);
}