import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
	flex: 1;
	padding-horizontal: ${RFValue(25)}px;
	margin-bottom: ${RFValue(30)}px;
	margin-top: ${RFValue(30)}px;
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

export const ClickableImage = styled.TouchableOpacity`

`;

export const UsernameContainer = styled.View`
	margin-left: ${RFValue(8)}px;
`;

export const Gretting = styled.Text`
	font-size: ${RFValue(13)}px;
	margin-bottom: ${RFValue(1)}px;
	font-family: ${({ theme }) => theme.fonts.regular}
`;

export const Username = styled.Text`
	font-size: ${RFValue(13)}px;
	font-family: ${({ theme }) => theme.fonts.regular}
`;

export const DrawerItems = styled.View`
	flex: 1;
	margin-top: ${RFValue(80)}px;
`;

export const LogOutButton = styled.TouchableOpacity`
	height: ${RFValue(40)}px;
	margin-bottom: ${RFValue(13)}px;
	flex-direction: row;
	align-items: center;
	padding-horizontal: ${RFValue(15)}px;
`;

export const LogOutIcon = styled(MaterialIcons)`
	color: ${({ theme }) => theme.colors.text_dark };
	font-size: ${RFValue(16)}px;
	margin-right: ${RFValue(15)}px;
`;

export const LogOutText = styled.Text`
	color: ${({ theme }) => theme.colors.text_dark };
	font-size: ${RFValue(16)}px;
`;

/*flex-direction: row;
	height: ${RFValue(40)}px;
	margin-bottom: ${RFValue(13)}px;
	padding-horizontal: ${RFValue(15)}px;
	align-items: center;
	border-radius: ${RFValue(5)}px;
	background-color: 'rbga(0,0,0,0)'; */