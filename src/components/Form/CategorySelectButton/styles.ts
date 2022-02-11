import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const TouchContainer = styled.TouchableOpacity``;

export const Container = styled.View.attrs({	
	shadowOffset: { width: 1, height: 3 }
})`
	elevation: 2;
	shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
	background-color: ${({ theme }) => theme.colors.background};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-radius: 10px;
	padding: 18px 16px;
`;

export const Category = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.texts}
`;