import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TextInputProps {
	error?: string;
}

export const Container = styled(TextInput).attrs<TextInputProps>(props => ({
	placeholder: props.error ? props.error : props.placeholder,
	placeholderTextColor: props.error ? 'rgba(232, 63, 91, 0.7)' : 'rgba(0,0,0, 0.3)'
}))`
	width: 100%;
	padding: 16px 18px;
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text_dark};
	background-color: ${({ theme }) => theme.colors.shapeColor};
	border-radius: 5px;
	margin-bottom: 8px;
`;