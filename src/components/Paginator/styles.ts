import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Animated } from 'react-native';
import { default as ReanimatedAnimated } from 'react-native-reanimated';

export const Container = styled.View`
	flex-direction: row;
	height: ${RFValue(64)}px;
`;

export const CurrentSelectedPageIndicator = styled(Animated.View).attrs({
	shadowOffset: { width: 1, height: 3 }
})`
	shadow-color: ${({ theme }) => theme.colors.text_dark };
	elevation: 1;
  shadow-opacity: 0.3;
  shadow-radius: 1px;
	height: ${RFValue(10)}px;
	width: ${RFValue(10)}px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.blue };
	margin-horizontal: ${RFValue(8)}px;
`;

export const ButtonContainer = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	align-items: center;
	border-radius: 10px;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.blue };
`;

export const ButtonTitle = styled(ReanimatedAnimated.Text)`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.shapeColor};
`;