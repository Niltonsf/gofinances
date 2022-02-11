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
import LoadingCard from './src/components/LoadingCard';

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
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(setUser);
		return subscriber;
	}, []);

	if (!fontsLoaded) {
		return <LoadingCard />;
	}

  return (
		<ThemeProvider theme={theme}>					
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
		</ThemeProvider>
  );
}
