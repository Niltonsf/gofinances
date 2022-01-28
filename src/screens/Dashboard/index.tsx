import React, { useState, useEffect, useCallback } from 'react';
import { 
	Container,
	Header,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	UserWrapper,
	Icon,
	HighLightCards,
	Transactions,
	Title,
	TransactionsList,
	LogoutButton,
	LoadingContainer
} from './styles';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components'
import { StringLocale } from 'yup/lib/locale';

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

export function Dashboard() {
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

		const dataKey = '@gofinance:transactions';
		const response = await AsyncStorage.getItem(dataKey);
		const transactions = response ? JSON.parse(response) : [];

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

		setTransactions(transactionsFormatted);

		const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
		const lastTransactionOutcome = getLastTransactionDate(transactions, 'negative');
		const totalInterval = `from 01 to ${lastTransactionEntries}`;

	
		setHighlightData({
			entries: {
				amount: entriesSum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: `Last income was ${lastTransactionEntries}`
			},
			outcome: {
				amount: outcomeSum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: `Last outcome was ${lastTransactionOutcome}`
			},
			total: {
				amount: totalValue.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: totalInterval
			}
		})

		setIsLoading(false);
	}

	useEffect(() => {
		loadTransaction();
	}, []);

	useFocusEffect(useCallback(() => {
		loadTransaction();
	}, []))

	return (
		<Container>
      {
				isLoading ? 
				<LoadingContainer>
					<ActivityIndicator color={theme.colors.orange} size='large'/>
				</LoadingContainer>
				:
				<>
					<Header>
						<UserWrapper>
							<UserInfo>
								<Photo source={{ uri: 'http://github.com/niltonsf.png'}}/>
								<User>
									<UserGreeting>Ola,</UserGreeting>
									<UserName>Nilton</UserName>
								</User>
							</UserInfo>

							<LogoutButton onPress={() => {}}>
								<Icon name="power"/>
							</LogoutButton>
						</UserWrapper>
					</Header>

					<HighLightCards>
						<HighLightCard type="up" title="Income" amount={higlightData.entries.amount} lastTransaction={higlightData.entries.lastTransaction}/>
						<HighLightCard type="down"title="Outcome" amount={higlightData.outcome.amount}lastTransaction={higlightData.outcome.lastTransaction}/>
						<HighLightCard type="total" title="Total" amount={higlightData.total.amount} lastTransaction={higlightData.total.lastTransaction}/>
					</HighLightCards>

					<Transactions>
						<Title>Listagem</Title>

						<TransactionsList
							data={transactions}
							inverted={true}
							keyExtractor={item => item.id}
							renderItem={({ item }) => <TransactionCard  data={item}/>}
						/>
					</Transactions>
				</>
			}
    </Container>
	);
}