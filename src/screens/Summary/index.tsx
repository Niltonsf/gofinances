import React, { useEffect, useState } from 'react';
import { 
	Container, 
	Header, 
	Title,
	Content
} from './styles';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';

interface TransactionData {
	type: 'positive' | 'negative';
	name: string;
	amount: string;
	category: string;
	date: string;
}

interface CategoryData {
	key: string;
	name: string;
	total: string;
	color: string;
}


export function Summary(){

	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

	async function loadData() {
		const totalByCategory: CategoryData[] = [];

		const dataKey = '@gofinance:transactions';
		const response = await AsyncStorage.getItem(dataKey);
		const responseFormatted = response ? JSON.parse(response) : [];

		const outcomes = responseFormatted
		.filter((outcome: TransactionData) => outcome.type === 'negative');


		categories.forEach(category => {
			let categorySum = 0;

			outcomes.forEach((outcome: TransactionData) => {
				if(outcome.category === category.key) {
					categorySum += Number(outcome.amount);
				}
			});

			if(categorySum > 0) {
				const total = categorySum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				});
				totalByCategory.push({
					key: category.key,
					name: category.name,
					color: category.color,
					total,
				});
			}
		});

		setTotalByCategories(totalByCategory);
	}
	useEffect(()=> {
		loadData();
	},[]);

	return (
		<Container>
			<Header>
				<Title>Summary by category</Title>
			</Header>

			<Content>
				{
					totalByCategories.map(item => (
						<HistoryCard
							key={item.key}
							title={item.name} 
							amount={item.total} 
							color={item.color}
						/>
					))
				}
			</Content>
		</Container>
	);
}