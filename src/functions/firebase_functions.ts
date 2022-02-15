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

	async firstTimeLogin(): Promise<any> {
		const firstTime = await AsyncStorage.getItem(this.asyncStorageFirstTime);
		
		if (firstTime !== this.uid) await this.removeItemValue();
		if (firstTime && firstTime === this.uid) return await this.getSettingsFromAsyncStorage();

		// SETTINGS DATA
		try {
			await this.handleGetAllDatasFromUser();			
		} catch (err: any) {
			throw new Error(err);
		}

		// SETTING UP FIRST TIME IN ASYNC STORAGE
		try {
			await AsyncStorage.setItem(this.asyncStorageFirstTime, this.uid!);
		} catch (err) {
			throw new Error(err as any);
		}

		const data = await this.getSettingsFromAsyncStorage();

		return data;
	}

	async removeItemValue() {
    try {
        await AsyncStorage.removeItem(this.asyncStorageFinances);
				await AsyncStorage.removeItem(this.asyncStorageSettings);
				await AsyncStorage.removeItem(this.asyncStorageFirstTime);
        return true;
    }
    catch(exception) {
        return false;
    }
	}

	// LOAD DATA
	private lastTotalTransationDate(lastTransactionEntries: string, lastTransactionOutcome: string): string {
		if (lastTransactionEntries !== 'NaN of Invalid Date') {
			return `from 01 to ${lastTransactionEntries}`;
		} else if (lastTransactionOutcome !== 'NaN of Invalid Date') {
			return `from 01 to ${lastTransactionOutcome}`;
		} else {
			return 'No transactions';
		}
	}

	private getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
		const lastTransaction = new Date(
			Math.max.apply(Math, collection
			.filter(transaction => transaction.type === type
			)
			.map(transaction => new Date(transaction.date).getTime()))
		);

		const day = lastTransaction.getDate();
		const month = lastTransaction.toLocaleString(`en-US`, {
			month: 'long'
		});
		return `${day} of ${month}`
	}

	async loadTransaction(): Promise<any> {
		let entriesSum = 0;
		let outcomeSum = 0;
		let totalValue = 0;

		const transactions: DataListProps[] = await this.getCurrentDatasFromAsyncStorage();

		const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

			item.type === 'positive' ? entriesSum += Number(item.amount) : outcomeSum += Number(item.amount);
			
			const amount = Number(item.amount).toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			});

			const date = Intl.DateTimeFormat('pt-BR',{
				day: '2-digit',
				month: '2-digit',
				year: '2-digit'
			}).format(new Date(item.date));

			return {
				id: item.id,
				name: item.name,
				amount,
				type: item.type,
				category: item.category,
				date
			}
		});

		totalValue = entriesSum - outcomeSum;

		const lastTransactionEntries = this.getLastTransactionDate(transactions, 'positive');
		const lastTransactionOutcome = this.getLastTransactionDate(transactions, 'negative');
		const totalInterval = this.lastTotalTransationDate(lastTransactionEntries, lastTransactionOutcome);

		const higlightData = {
			entries: {
				amount: entriesSum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: lastTransactionEntries === 'NaN of Invalid Date' ? 'No transactions' : `Last income was ${lastTransactionEntries}`
			},
			outcome: {
				amount: outcomeSum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: lastTransactionOutcome === 'NaN of Invalid Date' ? 'No transactions' : `Last outcome was ${lastTransactionOutcome}`
			},
			total: {
				amount: totalValue.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: totalInterval
			}
		};

		return {
			transactionsFormatted,
			higlightData
		}
	}
}

export default FirebaseFunctions;
