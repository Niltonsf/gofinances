import React, { useEffect } from 'react';
import { Container, Text } from './styles';
import Animated from 'react-native-reanimated';
import { useAuth } from '../../hooks/auth';

export function Settings({ drawerAnimationStyle}: any){
	const { firebaseFunctions } = useAuth();

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