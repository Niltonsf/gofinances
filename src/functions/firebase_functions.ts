import firestore from '@react-native-firebase/firestore';
import { DataListProps } from '../screens/Dashboard';
import auth from '@react-native-firebase/auth';

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

		// const formattedDate = data.forEach((value: DataListProps) => {
		// 	console.log(value);
		// })

		return data;
	}

	public async handleAllTransactions(): Promise<any> {
		if(this.uid === undefined) return;		
		
		const newDoc: any = [];

		await firestore()
		.collection(this.uid)
		.orderBy('date')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(documentsSnapshot => {
				const documentData = documentsSnapshot.data();
				const newDocument: any = {
					...documentData,
					date: documentData.date.toDate()
				}										
				newDoc.unshift(newDocument);
			});
		});			
		console.log(newDoc);
		return newDoc;
	}
}

export default FirebaseFunctions;
