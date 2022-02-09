import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Register } from '../screens/Register';
import { CustomDrawer } from '../components/CustomDrawer';

const Stack = createStackNavigator();

export function DrawerRoutes(){
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
			initialRouteName={'Home'}
		>
			<Stack.Screen 
				name="Home"
				component={CustomDrawer}
			/>

		</Stack.Navigator>
	);
}