import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

interface Selection {
	isSelected: boolean;
}

export const Container = styled.TouchableOpacity<Selection>`
	flex-direction: row;
	height: ${RFValue(40)}px;
	margin-bottom: ${RFValue(13)}px;
	padding-horizontal: ${RFValue(15)}px;
	align-items: center;
	border-radius: ${RFValue(5)}px;
	background-color: ${({ theme, isSelected }) => isSelected ? theme.colors.orange : theme.colors.shapeColor };
`; 

export const Icon = styled(MaterialIcons)<Selection>`
	color: ${({ theme, isSelected}) => isSelected ? theme.colors.shapeColor : theme.colors.text_dark};
	font-size: ${RFValue(16)}px;
	margin-right: ${RFValue(15)}px;
`;

export const PageName = styled.Text<Selection>`
	color: ${({ theme, isSelected}) => isSelected ? theme.colors.shapeColor : theme.colors.text_dark};
	font-size: ${RFValue(16)}px;
`;

/**color: ${({ theme }) => currentlySelected === 'Yes' ? theme.colors.shapeColor : theme.colors.text_dark} */