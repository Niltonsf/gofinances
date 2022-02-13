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

class FirebaseFunctions {	
	uid: string | undefined;	
	asyncStorageName = '@finances:firestore'; 

	constructor(uid: string | undefined) {
		this.uid = uid;
	}

	public async handleAddNewTransaction(newTransaction: NewTransactionProps[]) {
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

	public async handleGetAllTransactions(): Promise<DataListProps[]> {
		if(this.uid === undefined) return [];	

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

		// Add into asyncStorage
		try {
			const jsonData = JSON.stringify(filteredData);
			await AsyncStorage.setItem(this.asyncStorageName, jsonData);
		} catch (err) {
			throw new Error(err as any);
		}

		return filteredData;
	}

	async getCurrentDatasFromAsyncStorage(): Promise<any> {
		try {
			const jsonValue = await AsyncStorage.getItem(this.asyncStorageName);
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
			const jsonValue = await AsyncStorage.getItem(this.asyncStorageName);
			return jsonValue !== null ? JSON.parse(jsonValue) : [];
		} catch(e) {
			throw new Error(e as any);
		}
	}

	async insertDataIntoAsyncStorage(newData: NewTransactionProps) {
		// GETTING OLD DATA
		const jsonValue = await AsyncStorage.getItem(this.asyncStorageName);
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
			await AsyncStorage.setItem(this.asyncStorageName, jsonData);
		} catch (err) {
			throw new Error(err as any);
		}
	}

	async removeItemValue() {
    try {
        await AsyncStorage.removeItem(this.asyncStorageName);
        return true;
    }
    catch(exception) {
        return false;
    }
	}
}

export default FirebaseFunctions;
