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

	private getCurrentDocToFetch(): string {
		const currentDate = new Date();
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();
		const documentName = String(month) + String(year);
		return documentName;
	}

	public async handleAddNewTransaction(newTransaction: NewTransactionProps[]) {
		if(this.uid === undefined) return;
		
		// GETTING THE CURRENT DOCUMENT TO INSERT DAT
		const docName = this.getCurrentDocToFetch();

		try {
			await firestore()
			.collection(this.uid)
			.doc(docName)						
			.set({ finances: newTransaction });					
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

		const filteredData = data.map((value: any) => {
			const newDate = {
				...value,
				date: typeof value.date === 'string' ? value.date : value.date.toDate()
			}
			return newDate;
		});

		return filteredData;
	}

	async getDataFromAsyncStorage(): Promise<any> {
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
