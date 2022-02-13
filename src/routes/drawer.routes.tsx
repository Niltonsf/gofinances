import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from '../components/CustomDrawer';
import { useAuth } from '../hooks/auth';

const { Navigator, Screen } = createStackNavigator();

export function DrawerRoutes(){

	const { firebaseFunctions } = useAuth();

	useEffect(() => {
		// GETTING DATA IF USERS FIRST TIME
		async function firstTime() {
			await firebaseFunctions.firstTimeLogin();			
		}
		firstTime();
	}, []);
	
	return (
		<Navigator
			screenOptions={{
				headerShown: false,				
			}}			
			initialRouteName={'Drawer'}
		>
			<Screen 
				name="Drawer"
				component={CustomDrawer}
			/>
			
		</Navigator>
	);
}