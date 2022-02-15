import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import FirebaseFunctions from '../functions/firebase_functions';
import { NewTransactionProps } from '../functions/firebase_functions';
import { UserSettingsProps } from '../functions/firebase_functions';

interface AuthProviderProps {
	children: ReactNode;
}

interface FirebaseFunctionsProps {	
	handleAddNewTransaction(data: NewTransactionProps[]): Promise<void>;
	handleGetAllDatasFromUser(): Promise<void>;
	getCurrentDatasFromAsyncStorage(): Promise<any>;
	getAllDatasFromAsyncStorage(): Promise<any>;
	insertDataIntoAsyncStorage(newData: NewTransactionProps): Promise<void>;
	getSettingsFromAsyncStorage(): Promise<UserSettingsProps>;
	firstTimeLogin(): Promise<any>;
	loadTransaction(): Promise<any>;
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
	const firebaseFunctions: FirebaseFunctionsProps = new FirebaseFunctions(uid);
	
	async function handleUserSettings() {
		// GETTING DATA IF USERS FIRST TIME
		const data = await firebaseFunctions.firstTimeLogin();   
		console.log(data);         
		
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