import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FirebaseFunctions from '../functions/firebase_functions';
import { NewTransactionProps } from '../functions/firebase_functions';
import { DataListProps } from '../screens/Dashboard';

interface AuthProviderProps {
	children: ReactNode;
}

interface UserSettingsProps {
	name: string;
	photo: string;
}

interface FirebaseFunctionsProps {	
	handleAddNewTransaction(data: NewTransactionProps): void;
	handleGetAllTransactions(): Promise<DataListProps[]>;
	getCurrentDatasFromAsyncStorage(): Promise<any>;
	getAllDatasFromAsyncStorage(): Promise<any>;
	insertDataIntoAsyncStorage(data: NewTransactionProps): any;
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