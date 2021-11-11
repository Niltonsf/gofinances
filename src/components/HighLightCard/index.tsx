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

interface HighLightCardProps {
	title: string;
	amount: string;
	lastTransaction: string;
	type: 'up' | 'down' | 'total';
}

const icon = {
	up: 'arrow-up-circle',
	down: 'arrow-down-circle',
	total: 'dollar-sign'
}

export function HighLightCard({ title, amount, lastTransaction, type }: HighLightCardProps){
	return (
		<Container type={type}>
			<Header>
				<Title type={type}>{title}</Title>
				<Icon name={icon[type]} type={type}/>
			</Header>

			<Content>
				<Amount type={type}>
					{amount}
				</Amount>	
				<LastTransactions type={type}>{lastTransaction}</LastTransactions>
			</Content>
		</Container>
	);
}