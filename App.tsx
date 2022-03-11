import React, { useEffect, useState, useLayoutEffect } from 'react';
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
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthProvider } from './src/hooks/auth';
import { AuthRoutes } from './src/routes/auth.routes';
import { DrawerRoutes } from './src/routes/drawer.routes';

//REDUX
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/stores/rootReducer';
import { Onboarding } from './src/screens/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

export default function App() {
	const [ fontsLoaded ] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold
	});
	const showOnboarding = '@finances:onboarding';
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
	const [onboarding, setOnboarding] = useState(true);

	async function handleCheckOnboarding() {		
		const getOnboarding = await AsyncStorage.getItem(showOnboarding);

		if (getOnboarding) { 
			setOnboarding(false);
			return;
		};
	}

	async function handleOnboarding() {
		setOnboarding(false);

		await AsyncStorage.setItem(showOnboarding, 'false');
	}

	useLayoutEffect(() => {		
		handleCheckOnboarding().then(() => {});
	}, []);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(setUser);
		return subscriber;
	}, []);

	if (!fontsLoaded) {
		return <AppLoading />;
	}

  return (
		<ThemeProvider theme={theme}>					
			{ 
				onboarding ? 
				<Onboarding handleOnboarding={handleOnboarding}/>
				:
				<Provider store={store}>
					<NavigationContainer>
						{ user ? 
							<AuthProvider>
								<StatusBar style="light"/>
								<DrawerRoutes /> 
							</AuthProvider>					
							:
							<>
								<StatusBar style="dark"/>
								<AuthRoutes />
							</>
						}				
					</NavigationContainer>	
				</Provider>
			}
		</ThemeProvider>
  );
}
