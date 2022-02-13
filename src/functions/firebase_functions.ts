import firestore from '@react-native-firebase/firestore';
import { DataListProps } from '../screens/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NewTransactionProps {
	id: string;
	name: string;
	amount: string;
	type: string;
	category: string;
	date: Date;
}

export interface UserSettingsProps {
	name: string;
	photo: string;
}

class FirebaseFunctions {	
	uid: string | undefined;	
	asyncStorageFinances = '@finances:firestore';
	asyncStorageSettings = '@finances:settings';
	asyncStorageFirstTime = '@finances:firstTime';

	constructor(uid: string | undefined) {
		this.uid = uid;
	}

	public async handleAddNewTransaction(newTransaction: NewTransactionProps[]): Promise<void> {
		if(this.uid === undefined) return;

		try {
			await firestore()
			.collection(this.uid)
			.doc('transactions')						
			.set({ finances: newTransaction });					
		} catch (err) {
			throw new Error(err as any);
		}
	}

	public async handleGetAllDatasFromUser(): Promise<void> {
		if(this.uid === undefined) return;	

		// GETTING TRANSACTIONS
		const documentSnapshot: any = await firestore()
			.collection(this.uid)
			.doc('transactions')						
			.get()
			.then(documentSnapshot => {								
				return documentSnapshot.data() === undefined ? { finances: [] } : documentSnapshot.data();
			});

		const data: DataListProps[] = documentSnapshot.finances;

		const filteredData = data.map((value: any) => {
			const newDate = {
				...value,
				date: typeof value.date === 'string' ? value.date : value.date.toDate()
			}
			return newDate;
		});

		// ADD TRANSACTION TO ASYNC STORAGE
		try {
			const jsonData = JSON.stringify(filteredData);
			await AsyncStorage.setItem(this.asyncStorageFinances, jsonData);
		} catch (err) {
			throw new Error(err as any);
		}

		const settingsSnapshot: any = await firestore()
			.collection(this.uid)
			.doc('settings')						
			.get()
			.then(documentSnapshot => {								
				return documentSnapshot.data() === undefined ? { name: 'Joe Doe' } : documentSnapshot.data();
			});

		try {
			const jsonData = JSON.stringify(settingsSnapshot);
			await AsyncStorage.setItem(this.asyncStorageSettings, jsonData);
		} catch (err) {
			throw new Error(err as any);
		}
	}

	async getCurrentDatasFromAsyncStorage(): Promise<any> {
		try {
			const jsonValue = await AsyncStorage.getItem(this.asyncStorageFinances);
			const currentDate = new Date();
			const currentMonth = currentDate.getMonth();
			const currentYear = currentDate.getFullYear();			
			const data = jsonValue !== null ? JSON.parse(jsonValue) : [];
			const filteredValues = data === [] ? [] : data.filter((value: any) => {				
				const newDate = typeof value.date === 'string' ? new Date(value.date) : value.date;
				return newDate.getMonth() === currentMonth && newDate.getFullYear() === currentYear ?  newDate : null;
			});
			return filteredValues;
		} catch(e) {
			throw new Error(e as any);
		}
	}

	async getAllDatasFromAsyncStorage(): Promise<any> {
		try {
			const jsonValue = await AsyncStorage.getItem(this.asyncStorageFinances);
			return jsonValue !== null ? JSON.parse(jsonValue) : [];
		} catch(e) {
			throw new Error(e as any);
		}
	}

	async insertDataIntoAsyncStorage(newData: NewTransactionProps): Promise<void> {
		// GETTING OLD DATA
		const jsonValue = await AsyncStorage.getItem(this.asyncStorageFinances);
		const oldData = jsonValue !== null ? JSON.parse(jsonValue) : [];

		// STORING OLD DATA
		const newFinances = [...oldData];

		// INSERTING NEW DATA
		newFinances.unshift(newData);	

		// INSERTING DATA INTO DATABASE
		await this.handleAddNewTransaction(newFinances);

		// UPDATING ASYNC STORAGE
		try {
			const jsonData = JSON.stringify(newFinances);
			await AsyncStorage.setItem(this.asyncStorageFinances, jsonData);
		} catch (err) {
			throw new Error(err as any);
		}
	}

	async getSettingsFromAsyncStorage(): Promise<UserSettingsProps> {
		try {
			const jsonValue = await AsyncStorage.getItem(this.asyncStorageSettings);
			return jsonValue !== null ? JSON.parse(jsonValue) : { name: 'Joe Doe', photo: 'No Photo' };
		} catch (err) {
			throw new Error(err as any);
		}
	}

	async firstTimeLogin(): Promise<void> {
		const firstTime = await AsyncStorage.getItem(this.asyncStorageFirstTime);

		if (firstTime) return;

		// SETTINGS DATA
		try {
			await this.handleGetAllDatasFromUser();
		} catch (err: any) {
			throw new Error(err);
		}

		// SETTING NOT FIRST TIME IN ASYNC STORAGE
		try {
			await AsyncStorage.setItem(this.asyncStorageFirstTime, 'false');
		} catch (err) {
			throw new Error(err as any);
		}
	}

	// async removeItemValue() {
  //   try {
  //       await AsyncStorage.removeItem(this.asyncStorageFinances);
  //       return true;
  //   }
  //   catch(exception) {
  //       return false;
  //   }
	// }
}

export default FirebaseFunctions;
