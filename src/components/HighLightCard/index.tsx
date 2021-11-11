import React from 'react';
import { 
	Container,
	Header,
	Title,
	Icon,
	Content,
	Amount,
	LastTransactions
} from './styles';

export function HighLightCard(){
	return (
		<Container>
			<Header>
				<Title>Entrada</Title>
				<Icon name="arrow-up-circle"/>
			</Header>

			<Content>
				<Amount>
					R$ 14.400,00
				</Amount>	
				<LastTransactions>Ultima transação dia 13 de abril</LastTransactions>
			</Content>
		</Container>
	);
}