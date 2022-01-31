import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

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
	font-size: ${RFValue(25)}px;
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

export const LoadingContainer = styled(LinearGradient).attrs({
	colors: ['#5636D3', '#000000'],
	locations: [0.8, 0.1],
	style: {
		flex:1, 
	}
})`
	flex: 1;
	justify-content: center;
	align-items: center;
`;