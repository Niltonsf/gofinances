import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import FirebaseFunctions from '../functions/firebase_functions';
import { UserSettingsProps, FirebaseFunctionsProps } from '../functions/firebase_functions';

interface AuthProviderProps {
	children: ReactNode;
}
interface AuthDataProps {
	uid: string | undefined;
	userSettings: UserSettingsProps;
	firebaseFunctions: FirebaseFunctionsProps;
}

const AuthContext = createContext({} as AuthDataProps);

function AuthProvider({ children }: AuthProviderProps) {
	const [ userSettings, setUserSettings ] = useState({} as UserSettingsProps);
	const uid = auth().currentUser?.uid;
	const firebaseFunctions = new FirebaseFunctions(uid);
	
	async function handleUserSettings() {
		// GETTING DATA IF USERS FIRST TIME
		const data = await firebaseFunctions.fetchUserProfile();     
		
		setUserSettings({
				name: data.name,
				photo: data.photo,
		});
	}

	useEffect(() => {
		handleUserSettings().then(() => {});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				uid,
				userSettings,
				firebaseFunctions
			}}
		>
			{ children }
		</AuthContext.Provider>
	);
}

function useAuth() {
	const ctx = useContext(AuthContext);
	
	return ctx;
}

export { AuthProvider, useAuth };