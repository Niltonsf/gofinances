import firestore from '@react-native-firebase/firestore';
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
	
	 public async handleAddNewTransaction(newTransaction: NewTransactionProps) {
		if(this.uid === undefined) return;		
		try {
			await firestore().collection(this.uid).add(newTransaction);
		} catch (err) {
			throw new Error(err as any);
		}
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
		return newDoc;
	}
}

export default FirebaseFunctions;