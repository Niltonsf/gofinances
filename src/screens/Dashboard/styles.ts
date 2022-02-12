import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { DataListProps } from '.';
import { FlatList } from 'react-native';

export const DrawerContainer = styled.TouchableOpacity`
	width: 100%;
	margin-left: ${RFValue(40)}px;
	margin-bottom: ${RFValue(10)}px;
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(25)}px;
	color: ${({ theme }) => theme.colors.shapeColor};
`;

export const Container = styled.View`
	flex: 1;
	background-Color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFPercentage(40)}px;
	padding-top: ${getStatusBarHeight() + RFValue(25)}px ;
	background-color: ${({ theme }) => theme.colors.blue};
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const HighLightCards = styled.ScrollView.attrs({
	horizontal: true,
	showsHorizontalScrollIndicator: false,
	contentContainerStyle: { paddingHorizontal: 24 }
})`
	width: 100%;
	margin-bottom: ${RFValue(15)}px;
`;

export const Transactions = styled.View`
	flex: 1;
	padding: 0 25px;
	margin-top: ${RFPercentage(5)}px;
`;

export const Title = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	margin-bottom: 16px;
`;

export const TransactionsList = styled(
	FlatList as new () => FlatList<DataListProps[]>
	).attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		paddingBottom: getBottomSpace(),
	},
})`	
	padding-top: ${RFValue(5)}px;
	padding-horizontal: ${RFValue(2)}px;
`;

export const LoadingContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const NoTransaction = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;