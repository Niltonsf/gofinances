import React, { useState, useEffect } from 'react';
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
	LogoutButton
} from './styles';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataListProps extends TransactionCardProps {
	id: string;
}

export function Dashboard() {
	const [data, setData] = useState<DataListProps[]>([]);

	async function loadTransaction() {
		const dataKey = '@gofinance:transactions';
		const response = await AsyncStorage.getItem(dataKey);

		const transactions = response ? JSON.parse(response) : [];

		const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
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
	
		setData(transactionsFormatted);
	}

	useEffect(() => {
		loadTransaction();
	}, []);

	return (
		<Container>
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
				<HighLightCard type="up" title="Entrada" amount="R$ 14.000,00" lastTransaction="Ultima entrada em 14 de abril"/>
				<HighLightCard type="down"title="Saidas" amount="R$ 1.253,50" lastTransaction="Ultima saida em 2 de abril"/>
				<HighLightCard type="total" title="Total" amount="R$ 12.647,50" lastTransaction="01 a 30 de abril"/>
			</HighLightCards>

			<Transactions>
				<Title>Listagem</Title>

				<TransactionsList
					data={data}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <TransactionCard  data={item}/>}
				/>
			</Transactions>
    </Container>
	);
}