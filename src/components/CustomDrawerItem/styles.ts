import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
	flex-direction: row;
	height: ${RFValue(40)}px;
	margin-bottom: ${RFValue(13)}px;
	padding-horizontal: ${RFValue(15)}px;
	align-items: center;
	border-radius: ${RFValue(5)}px;
	background-color: ${({ theme }) => theme.colors.green_attention};
`; 

export const Icon = styled(MaterialIcons)`
	font-size: ${RFValue(16)}px;
	margin-right: ${RFValue(15)}px;
`;

export const PageName = styled.Text`
	font-size: ${RFValue(16)}px;
`;