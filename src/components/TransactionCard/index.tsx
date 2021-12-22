import React from 'react';
import { 
	Container,
	Title,
	Amount,
	Footer,
	Category,
	Icon,
	CategoryName,
	Date,
	AmountContainer
} from './styles';

interface TransactionCardProps {
	data: { 
		title: string;
		amount: string;
		category: {
			name: string;
			icon: string;
		};
		date: string;
	}
}

export function TransactionCard({ data }: TransactionCardProps){
	return (
		<Container>
			<Title>{data.title}</Title>
			<AmountContainer>
				<Amount>{data.amount}</Amount>
			</AmountContainer>
			<Footer>
				<Category>
					<Icon name='dollar-sign'/>
					<CategoryName>{data.category.name}</CategoryName>
				</Category>
				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
}