import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View.attrs({
	shadowOffset: { width: 1, height: 3 }
})`
	width: ${RFValue(50)}px;
	height: ${RFValue(50)}px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.background};
	elevation: 2;
	shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
	align-items: center;
	justify-content: center;
	margin-right: ${RFValue(10)}px;
`;

export const Text = styled.Text`
	font-size: ${RFValue(16)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text_dark};
`;