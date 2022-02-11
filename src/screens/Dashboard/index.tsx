import React, { useState, useEffect, useCallback } from 'react';
import { 
	Container,
	Header,
	HighLightCards,
	Transactions,
	Title,
	TransactionsList,
	LoadingContainer,
	NoTransaction,
	DrawerContainer,
	Icon
} from './styles';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components'
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
import NoTransactionLottie from '../../assets/no_transactions.json';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export interface DataListProps extends TransactionCardProps {
	id: string;
}

interface PropsHighLight {
	amount: string;
	lastTransaction: string;
}
interface HighlightDataProps {
	entries: PropsHighLight;
	outcome: PropsHighLight;
	total: PropsHighLight;
}

export function Dashboard({ drawerAnimationStyle }: any) {
	const navigation = useNavigation();
	const { uid } = useAuth();

	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<DataListProps[]>([]);
	const [higlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps);
	const theme = useTheme();

	function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
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

	async function loadTransaction() {
		let entriesSum = 0;
		let outcomeSum = 0;
		let totalValue = 0;

		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		const transactions: DataListProps[] = [];

		await firestore()
		.collection(uid!)
		.orderBy('date')
		.get().then(querySnapshot => {
			querySnapshot.forEach(documentsSnapshot => {
				const documentData = documentsSnapshot.data();
				const newDocument: any = {
					...documentData,
					date: documentData.date.toDate()
				}
				transactions.unshift(newDocument);
			});
		});

		// Filtering current month transacations
		const filteredTransactions = transactions.filter((item: DataListProps) => {
			const itemYear = new Date(item.date).getFullYear();
			const itemMonth = new Date(item.date).getMonth(); // 0 a 11
			if (itemYear === currentYear && itemMonth === currentMonth) return item;
		});

		const transactionsFormatted: DataListProps[] = filteredTransactions.map((item: DataListProps) => {

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

		setTransactions(transactionsFormatted);

		const lastTransactionEntries = getLastTransactionDate(filteredTransactions, 'positive');
		const lastTransactionOutcome = getLastTransactionDate(filteredTransactions, 'negative');
		const totalInterval = lastTransactionEntries === 'NaN of Invalid Date' ? 'No transactions' : `from 01 to ${lastTransactionEntries}`;

		setHighlightData({
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
		});

		setIsLoading(false);
	}

	useEffect(() => {
		loadTransaction();
	}, []);

	useFocusEffect(useCallback(() => {
		loadTransaction();
	}, []))

	return (
		<Animated.View style={{ flex: 1, ...drawerAnimationStyle}}>
			<Container>
				{
					isLoading ? 
					<LoadingContainer>
						<ActivityIndicator color={theme.colors.blue} size='large'/>
					</LoadingContainer>
					:
					<>
						<Header>							
							<DrawerContainer onPress={() => navigation.openDrawer()}>
								<Icon name="menu" />
							</DrawerContainer>
							<HighLightCards>
								<HighLightCard type="up" title="Income" amount={higlightData.entries.amount} lastTransaction={higlightData.entries.lastTransaction}/>
								<HighLightCard type="down"title="Outcome" amount={higlightData.outcome.amount}lastTransaction={higlightData.outcome.lastTransaction}/>
								<HighLightCard type="total" title="Total" amount={higlightData.total.amount} lastTransaction={higlightData.total.lastTransaction}/>
							</HighLightCards>
						</Header>						

						<Transactions>
							<Title>Transactions</Title>
							{
								transactions.length <= 0 ?
								<NoTransaction>
									<LottieView 
										source={NoTransactionLottie}
										style={{
											width: 100,
											height: 100,																	
										}}
										autoPlay
										loop
										resizeMode='contain'
									/>
								</NoTransaction>
								:
								<TransactionsList
									data={transactions}						
									keyExtractor={item => item.id}
									renderItem={({ item }) => <TransactionCard  data={item}/>}
								/>
							}
						</Transactions>
					</>
				}
			</Container>
		</Animated.View>
	);
}