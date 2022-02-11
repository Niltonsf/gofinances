import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface SpacingProps {
	height: number;
}

export const Container = styled.View`
	flex: 1;
	padding-horizontal: ${RFValue(30)}px;
`;

export const Header = styled.View`
	width: 100%;
	height: 30%;
	justify-content: center;
	align-items: center;
`;

export const Footer = styled.View`
	width: 100%;
	height: 100%;
`;

export const Form = styled.View`
	width: 100%;
`;

export const Spacing = styled.View<SpacingProps>`
	margin-bottom: ${({ height }) => RFValue(height)}px;
`;

export const ReturnToLoginContainer = styled.View`
	flex-direction: row;
	width: 100%;
	align-items: center;
	justify-content: center;
	margin-top: ${RFValue(30)}px;
`;

export const NormalText = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.texts}
`;

export const ReturnOpcaity = styled.TouchableOpacity``;

export const LoginInTitle = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.blue}
`;