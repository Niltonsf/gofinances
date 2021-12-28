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
		type: 'positive' | 'negative';
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
				<Amount type={data.type}>
					{data.type === 'negative' && '- '}
					{data.amount}
				</Amount>
			</AmountContainer>
			<Footer>
				<Category>
					<Icon name={data.category.icon}/>
					<CategoryName>{data.category.name}</CategoryName>
				</Category>
				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
}