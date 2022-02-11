import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
	align-items: center;
	justify-content: center;
`;

export const Text = styled.Text`
	font-size: ${RFValue(20)}px;
	color:${({ theme }) => theme.colors.blue};
	font-family: ${({ theme }) => theme.fonts.regular}
`;