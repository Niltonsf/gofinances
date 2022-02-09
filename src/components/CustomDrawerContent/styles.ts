import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
	flex: 1;
	padding-horizontal: ${RFValue(15)}px;
	margin-bottom: ${RFValue(30)}px;
`;

export const IconContainer = styled.View`
	align-items: flex-start;
	justify-content: center;
`;

export const CloseIcon = styled(MaterialIcons)`
	font-size: ${RFValue(25)}px;
	color: ${({ theme }) => theme.colors.text_dark}
`;

export const ProfileContainer = styled.View`
	flex-direction: row;
	margin-top: ${RFValue(20)}px;
	align-items: center;
`;

export const UsernameContainer = styled.View`
	margin-left: ${RFValue(8)}px;
`;

export const Gretting = styled.Text`
	font-size: ${RFValue(13)}px;
	margin-bottom: ${RFValue(2)}px;
	font-family: ${({ theme }) => theme.fonts.regular}
`;

export const Username = styled.Text`
	font-size: ${RFValue(13)}px;
	font-family: ${({ theme }) => theme.fonts.regular}
`;

export const DrawerItems = styled.View`
	flex: 1;
	margin-top: ${RFValue(30)}px;
`;