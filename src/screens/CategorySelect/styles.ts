import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import theme from '../../global/styles/theme';
 
interface CategoryProps {
	isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;
	background-color: ${({ theme }) => theme.colors.blue};
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 19px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.shapeColor};
	font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
	width: 44%;
	padding: ${RFValue(15)}px;
	margin: ${RFValue(10)}px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	elevation: 1;
	shadowColor: 'rgba(0,0,0, 0.6)';
	shadowRadius: 10px;	
	shadowOpacity: 1;

	background-color: ${({ isActive, theme }) => 
		isActive ? theme.colors.orange_attention :
		'rgba(86, 54, 211, 0.9)'
	}
`;

export const Icon = styled(Feather)<CategoryProps>`
	font-size: ${RFValue(20)}px;
	color: ${({ isActive }) => 
		isActive ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
	};
	margin-bottom: ${RFValue(5)}px;
`;

export const Name = styled.Text<CategoryProps>`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ isActive }) => 
		isActive ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
	}
`;

export const Separator = styled.View`
	height: 1px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.texts};
`;

export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`;