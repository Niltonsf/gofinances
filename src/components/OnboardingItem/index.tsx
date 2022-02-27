import React, { useEffect } from 'react';
import { ImageSourcePropType } from 'react-native';
import { 
	Container,
	TitleContainer,
	Title,
	Description,
	Image,
	DoneButtonContainer,
	DoneButton,
	DoneButtonTitle
} from './styles';
import { useWindowDimensions } from 'react-native';

interface OnboardingItemProps{
	image: ImageSourcePropType;
	title: string;
	description: string;
	currentIndex: any;
	handleOnboarding: () => void;
}

export function OnboardingItem({ image, title, description, currentIndex, handleOnboarding }: OnboardingItemProps){ 
	const { width } = useWindowDimensions();	

	return (
		<Container style={{ width: width}}>
			{ currentIndex.toString() === '2' ? 
				<DoneButtonContainer>
					<DoneButton onPress={handleOnboarding}>
						<DoneButtonTitle>DONE</DoneButtonTitle>
					</DoneButton> 
				</DoneButtonContainer>
			: null }
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