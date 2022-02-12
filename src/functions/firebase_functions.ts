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
	asyncStorageName = '@data_from_firestore'; 

	constructor(uid: string | undefined) {
		this.uid = uid;
	}

	private getCurrentDocToFetch(): string {
		const currentDate = new Date();
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();
		const documentName = String(month) + String(year);
		return documentName;
	}

	public async handleAddNewTransaction(newTransaction: NewTransactionProps) {
		if(this.uid === undefined) return;
		
		const docName = this.getCurrentDocToFetch();

		// READ THE CURRENT DATA INSIDE THE ARRAY
		const documentSnapshot: any = await firestore()
			.collection(this.uid)
			.doc(docName)						
			.get()
			.then(documentSnapshot => {								
				return documentSnapshot.data() === undefined ? { finances: [] } : documentSnapshot.data();
			});
		const oldFinances = documentSnapshot.finances;
		// GET THE CONTENT FROM THE FIELD
		const newFinances = [...oldFinances];
		newFinances.unshift(newTransaction);
		// INSERT THE CONTENT INSIDE AN ARRAY
		try {
			await firestore()
			.collection(this.uid)
			.doc(docName)						
			.set({ finances: newFinances });		
		} catch (err) {
			throw new Error(err as any);
		}
	}

	public async handleGetAllTransactions(): Promise<DataListProps[]> {
		if(this.uid === undefined) return [];	

		const docName = this.getCurrentDocToFetch();

		const documentSnapshot: any = await firestore()
			.collection(this.uid)
			.doc(docName)						
			.get()
			.then(documentSnapshot => {								
				return documentSnapshot.data() === undefined ? { finances: [] } : documentSnapshot.data();
			});

		const data: DataListProps[] = documentSnapshot.finances;

		const newDataWithFormattedDate = data.map((value: any) => {
			const newValue: any = {
				...value,
				date: value.date.toDate()
			};
			return newValue;
		});

		// Storing in database
		try {
			const jsonData = JSON.stringify(newDataWithFormattedDate);
			await AsyncStorage.setItem(this.asyncStorageName, jsonData);
		} catch (err) {
			throw new Error(err as any);
		}

		return newDataWithFormattedDate;
	}

	async getDataFromAsyncStorage(): Promise<any> {
		try {
			const jsonValue = await AsyncStorage.getItem(this.asyncStorageName);
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch(e) {
			throw new Error(e as any);
		}
	}
}

export default FirebaseFunctions;
