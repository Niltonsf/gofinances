import React from 'react';
import { Dashboard } from './src/screens/Dashboard';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import theme from './src/global/styles/theme';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {

	const [ fontsLoaded ] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

  return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<AppRoutes />
			</NavigationContainer>
			<StatusBar style="light"/>
		</ThemeProvider>
  );
}
