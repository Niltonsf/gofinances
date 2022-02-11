import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface SpacingProps {
	height: number;
}

export const Container = styled.View`
	flex: 1;
	margin-top: ${RFValue(10)}px;
	padding-horizontal: ${RFValue(30)}px;
`;

export const Header = styled.View`
	width: 100%;
	height: 40%;
	margin-bottom: ${RFValue(35)}px;
	justify-content: flex-end;
	align-items: center;
`;

export const TitleWrapper = styled.View`
	align-items: center;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme}) => theme.colors.text_dark};
	font-size: ${RFValue(25)}px;
	text-align: center;
	margin-top: ${RFValue(35)}px;
`;

export const Footer = styled.View`
	margin-top: ${RFValue(10)}px;
	width: 100%;
	height: 55%;
`;

export const Form = styled.View`
	width: 100%;
`;

export const Fields = styled.View``;

export const Spacing = styled.View<SpacingProps>`
	margin-bottom: ${({ height }) => RFValue(height)}px;
`;

export const ForgotPassContainer = styled.View`
	width: 100%;
	align-items: center;
	justify-content: center;
`;

export const ForgotText = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: 'rgba(0, 0, 0, 0.6)';
`;


export const Button = styled.TouchableOpacity`
	width: 100%;
	height: ${RFValue(50)}px;
	background-color: ${({ theme }) => theme.colors.blue};
	border-radius: 10px;
	align-items: center;
	justify-content: center;	
`;

export const ButtonTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.shapeColor};
`;