import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface AuthProviderProps {
	children: ReactNode;
}

interface UserSettingsProps {
	name: string;
	photo: string;
}

interface AuthDataProps {
	uid: string | undefined;
	userSettings: UserSettingsProps;
}

const AuthContext = createContext({} as AuthDataProps);

function AuthProvider({ children }: AuthProviderProps) {
	const [ userSettings, setUserSettings ] = useState({} as UserSettingsProps);
	const uid = auth().currentUser?.uid;
	
	useEffect(() => {
		async function handleUserSettings() {
			const userSettings = await firestore().collection(uid!).doc('settings').get();
			const filteredSettings = userSettings.data();
			setUserSettings({
				name: filteredSettings!.name,
				photo: filteredSettings!.photo,
			});
		}

		handleUserSettings();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				uid,
				userSettings
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