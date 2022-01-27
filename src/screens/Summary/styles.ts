import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
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

export const Content = styled.ScrollView.attrs({
	contentContainerStyle: { flex: 1, padding: 24 }
})`
	
`;