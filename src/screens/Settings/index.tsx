import React from 'react';
import { Container, Text } from './styles';
import Animated from 'react-native-reanimated';

export function Settings({ drawerAnimationStyle}: any){

	return (
		<Animated.View 
			style={{
				flex: 1,
				...drawerAnimationStyle
			}}
		>
			<Container>
				<Text>Comming soon!</Text>
			</Container>
		</Animated.View>
	);
}