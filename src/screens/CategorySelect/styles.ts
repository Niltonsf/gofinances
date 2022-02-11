import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { getBottomSpace } from 'react-native-iphone-x-helper';
 
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

export const CategoryTouch = styled.TouchableOpacity`
	width: 44%;
	margin-top: 1px;
	margin-horizontal: ${RFValue(10)}px;
	margin-bottom: ${RFValue(10)}px;
`;

export const Category = styled.View.attrs<CategoryProps>({
	shadowOffset: { width: 1, height: 3 }
})`
	padding: ${RFValue(15)}px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	elevation: 2;
	shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;

	background-color: ${({ isActive, theme }) => 
		isActive ? 'rgba(86, 54, 211, 0.9)' :
		theme.colors.background
	}
`;

export const Icon = styled(FontAwesome5)<CategoryProps>`
	font-size: ${RFValue(20)}px;
	color: ${({ isActive, theme }) => 
		isActive ? theme.colors.background : theme.colors.text_dark
	};
	margin-bottom: ${RFValue(5)}px;
`;

export const Name = styled.Text<CategoryProps>`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ isActive, theme }) => 
		isActive ? theme.colors.background : theme.colors.text_dark
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
	margin-bottom: ${getBottomSpace()}px;
`;