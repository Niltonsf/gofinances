import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

export function AuthRoutes() {

	const { Navigator, Screen } = createStackNavigator();

	return (
		<Navigator
			screenOptions={{
				headerShown: false,			
			}}
		>
			<Screen 
				key="SingIn"
				name="SignIn"
				component={SignIn}
			/>
			<Screen 
				key="SingUp"
				name="SignUp"
				component={SignUp}
			/>
		</Navigator>
	);
}