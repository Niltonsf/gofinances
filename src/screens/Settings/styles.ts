import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const DrawerContainer = styled.TouchableOpacity`
	width: 100%;
	margin-left: ${RFValue(40)}px;
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(25)}px;
	color: ${({ theme }) => theme.colors.shapeColor};
	margin-top: 10px;
`;

export const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.blue};
	width: 100%;
	height: ${RFValue(113)}px;
	align-items: center;
	justify-content: flex-end;	
	padding-bottom: 19px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.shapeColor};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(18)}px;
`;

export const Container = styled.View`
	flex: 1;
	align-items: center;
	margin-top: ${RFValue(30)}px;
`;

export const ClickableImage = styled.TouchableOpacity``;

export const Form = styled.View`
	flex: 1;
	width: 100%;
	padding: 24px;
	justify-content: space-between;
`;