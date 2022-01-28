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
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { SignIn } from './src/screens/SignIn';

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
				<StatusBar style="light"/>
				<SignIn />
			</NavigationContainer>
		</ThemeProvider>
  );
}
