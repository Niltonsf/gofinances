import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	align-items: center;
`;

export const Image = styled.Image`
	flex: 0.8;
`

export const TitleContainer = styled.View`
	margin-top: ${RFValue(35)}px;
	justify-content: center;
	align-items: center;
	padding-horizontal: ${RFValue(30)}px;
`;

export const Title =  styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium}
	font-size: ${RFValue(25)}px;
	text-align: center;
`;

export const Description = styled.Text`
	text-align: center;
	margin-top: ${RFValue(15)}px;
	font-family: ${({ theme }) => theme.fonts.regular}
	font-size: ${RFValue(15)}px;
`;