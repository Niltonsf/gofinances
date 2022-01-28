import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	width: 100%;
	height: 45%;
	margin-bottom: 25px;
	justify-content: flex-end;
	align-items: center;
`;

export const TitleWrapper = styled.View`
	align-items: center;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	color: ${({ theme}) => theme.colors.shapeColor};
	font-size: ${RFValue(30)}px;
	text-align: center;
	margin-top: 45px;
`;

export const Footer = styled.View`
	width: 100%;
	height: 55%;
	padding: 24px;
`;

export const Form = styled.View`
	width: 100%;
	
`;

export const Fields = styled.View`
	margin-bottom: 10px;
`;

export const Spacing = styled.View`
	margin-bottom: 10px;
`;