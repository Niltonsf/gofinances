import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TextInputProps {
	error?: string;
}

export const Container = styled(TextInput).attrs<TextInputProps>(props => ({
	placeholder: props.error ? props.error : props.placeholder,
	placeholderTextColor: props.error ? 'rgba(232, 63, 91, 0.7)' : 'rgba(0,0,0, 0.3)',
	shadowOffset: { width: 1, height: 3 }
}))`
	elevation: 2;
	shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
	width: 100%;
	padding: 17px 15px;
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text_dark};
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 10px;	
`;