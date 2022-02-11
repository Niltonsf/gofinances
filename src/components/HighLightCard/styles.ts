import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
	type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
	background-color: ${({ theme, type }) => 
	type === 'total' ? theme.colors.orange : theme.colors.shapeColor};
	width: ${RFValue(300)}px;
	border-radius: 10px;
	padding: 19px 23px;	
	margin-right: 16px;
`;

export const Header = styled.View`
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme, type }) => type === 'total' ? theme.colors.shapeColor : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<TypeProps>`
	font-size: ${RFValue(40)}px;

	${({ type }) => type === 'up' && css`
		color: ${({ theme }) => theme.colors.green};
	`};
	${({ type }) => type === 'down' && css`
		color: ${({ theme }) => theme.colors.red};
	`};
	${({ type }) => type === 'total' && css`
		color: ${({ theme }) => theme.colors.shapeColor};
	`};

`;

export const Content = styled.View`
`;

export const Amount = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(32)}px;
	color: ${({ theme, type }) => 
	type === 'total' ? theme.colors.shapeColor : theme.colors.text_dark};
	margin-top: 38px;
`;

export const LastTransactions = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(12)}px;
	color: ${({ theme, type }) => type === 'total' ? theme.colors.shapeColor : theme.colors.texts};
`;