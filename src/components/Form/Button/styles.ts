import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
	width: 100%;
	height: ${RFValue(50)}px;
	background-color: ${({ theme }) => theme.colors.blue};
	border-radius: 10px;
	align-items: center;
	justify-content: center;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.shapeColor};
`;