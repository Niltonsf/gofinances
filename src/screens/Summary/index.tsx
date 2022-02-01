import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { 
	Container, 
	Header, 
	Title,
	Content,
	ChartContainer,
	MonthSelect,
	MonthSelectButton,
	MonthSelectIcon,
	Month,
	LoadingContainer,
} from './styles';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../hooks/auth';

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
	total: number;
	totalFormatted: string;
	color: string;
	percent: string;
}


export function Summary(){
	const { uid } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
	const theme = useTheme();

	function handleChangeDate(action: 'next' | 'prev') {
		if(action === 'next') {
			setSelectedDate(addMonths(selectedDate, 1));
		} else {
			setSelectedDate(subMonths(selectedDate, 1));
		}
	}

	async function loadData() {
		setIsLoading(true);
		const totalByCategory: CategoryData[] = [];
		const responseFormatted: any = [];

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
				responseFormatted.push(newDocument);
			});
		});

		const outcomes = responseFormatted
		.filter((outcome: TransactionData) => 
			outcome.type === 'negative' && 
			new Date(outcome.date).getMonth() ===  selectedDate.getMonth() &&
			new Date(outcome.date).getFullYear() === selectedDate.getFullYear()
		);

		const outcomeTotal = outcomes.reduce((acc: number, outcome: TransactionData) => {
			return acc + Number(outcome.amount);
		}, 0);

		categories.forEach(category => {
			let categorySum = 0;

			outcomes.forEach((outcome: TransactionData) => {
				if(outcome.category === category.key) {
					categorySum += Number(outcome.amount);
				}
			});

			if(categorySum > 0) {
				const totalFormatted = categorySum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				});

				const percent = `${(categorySum / outcomeTotal * 100).toFixed(0)}%`;

				totalByCategory.push({
					key: category.key,
					name: category.name,
					color: category.color,
					total: categorySum,
					totalFormatted: totalFormatted,
					percent
				});
			}
		});

		setTotalByCategories(totalByCategory);

		setIsLoading(false);
	}

	useFocusEffect(useCallback(() => {
		loadData();
	}, [selectedDate]))

	return (
		<Container>
			<Header>
				<Title>Summary by category</Title>
			</Header>
			{
				isLoading ? 
					<LoadingContainer>
						<ActivityIndicator color={theme.colors.orange} size='large'/>
					</LoadingContainer> 
					
					:
					
					<Content
						contentContainerStyle= {{ 
							paddingHorizontal: 24,
							paddingBottom: useBottomTabBarHeight() 
						}}
						showsVerticalScrollIndicator={false}
					>
						<MonthSelect>
							<MonthSelectButton onPress={() => handleChangeDate('prev')}>
								<MonthSelectIcon name="chevron-left"/>
							</MonthSelectButton>

							<Month>
								{ format(selectedDate, 'MMMM, yyyy') }
							</Month>

							<MonthSelectButton onPress={() => handleChangeDate('next')}>
								<MonthSelectIcon name="chevron-right"/>
							</MonthSelectButton>
						</MonthSelect>

						<ChartContainer>
							<VictoryPie 
								data={totalByCategories}
								colorScale={totalByCategories.map(category => category.color)}
								style={{
									labels: { 
										fontSize: RFValue(18),
										fontWeight: 'bold',
										fill: theme.colors.shapeColor
									}
								}}
								labelRadius={50}
								x="percent"
								y="total"
							/>
						</ChartContainer>
						
						{
							totalByCategories.map(item => (
								<HistoryCard
									key={item.key}
									title={item.name} 
									amount={item.totalFormatted} 
									color={item.color}
								/>
							))
						}
					</Content>
			}
		</Container>
	);
}