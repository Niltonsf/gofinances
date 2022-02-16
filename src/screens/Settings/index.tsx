import React, { useEffect } from 'react';
import { Container, Text } from './styles';
import Animated from 'react-native-reanimated';
import { NubankApi } from "nubank-api"; 
import uuid from 'react-native-uuid';

export function Settings({ drawerAnimationStyle}: any){
	const CPF: string = "10711444994";
	const PASSWORD: string = "Nil316165";
	const AUTH_CODE: string = String(uuid.v4());

	// async function Nubank(): Promise<any> {
	// 	try {
	// 		await NubankApi.auth.authenticateWithQrCode(CPF, PASSWORD, AUTH_CODE);
	// 		console.log("You are authenticated!");
	// 		console.log(api.authState);				
	// 		process.exit(0);
	// 	} catch (e) {
	// 		console.log(e);
	// 	}	
	// }

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