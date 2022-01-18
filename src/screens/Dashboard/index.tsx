import React from 'react';
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
import { TransactionCard } from '../../components/TransactionCard';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { CardsData } from '../CardData';

export function Dashboard() {
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
					data={CardsData}
					renderItem={({ item }) => <TransactionCard  data={item}/>}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: getBottomSpace()
					}}
				/>
			</Transactions>
    </Container>
	);
}