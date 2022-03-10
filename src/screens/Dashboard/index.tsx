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
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components'
import LottieView from 'lottie-react-native';
import NoTransactionLottie from '../../assets/no_transactions.json';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import FirebaseFunctions from '../../functions/firebase_functions';

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
	const uid = auth().currentUser?.uid;
	const firebaseFunctions: any = new FirebaseFunctions(uid);

	const navigation: any = useNavigation();
	const isFocused = useIsFocused();

	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<DataListProps[]>([]);
	const [higlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps);
	const theme = useTheme();

	async function loadTransaction(): Promise<any> {		
		await firebaseFunctions.fetchUserTransations();
		
		const data = await firebaseFunctions.loadTransaction();

		setTransactions(data.transactionsFormatted);

		setHighlightData(data.higlightData);

		setIsLoading(false);
	}

	useEffect(() => {
		if (isFocused) {
			loadTransaction().then(() => {});
		}
	}, [isFocused]);


	return (
		<Animated.View style={[{ flex: 1, overflow: 'hidden' }, [drawerAnimationStyle]]}>			
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
									keyExtractor={(item: { id: any }) => item.id}
									renderItem={({ item }: any) => <TransactionCard  data={item}/>}
								/>
							}
						</Transactions>
					</>
				}
			</Container>
		</Animated.View>
	);
}