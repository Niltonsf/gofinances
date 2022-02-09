import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from '../components/CustomDrawer';

const { Navigator, Screen } = createStackNavigator();

export function DrawerRoutes(){
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