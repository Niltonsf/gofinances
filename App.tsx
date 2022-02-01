import React, { useEffect, useState } from 'react';
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
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthProvider } from './src/hooks/auth';
import { AuthRoutes } from './src/routes/auth.routes';

export default function App() {

	const [ fontsLoaded ] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold
	});
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(setUser);
		return subscriber;
	}, []);

	if (!fontsLoaded) {
		return <AppLoading />;
	}

  return (
		<ThemeProvider theme={theme}>
			<StatusBar style="light"/>
			<NavigationContainer>

				{ user ? 
					<AuthProvider>
						<AppRoutes />
					</AuthProvider> 
					:
					<AuthRoutes />
				}
			
			</NavigationContainer>						
		</ThemeProvider>
  );
}
