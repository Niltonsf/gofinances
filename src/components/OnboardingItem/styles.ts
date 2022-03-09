import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
	flex: 1;
	align-items: center;
	position: relative;
`;

export const Image = styled.Image`
	flex: 0.8;
`

export const TitleContainer = styled.View`
	margin-top: ${RFValue(35)}px;
	justify-content: center;
	align-items: center;
	padding-horizontal: ${RFValue(30)}px;
`;

export const Title =  styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium}
	font-size: ${RFValue(25)}px;
	text-align: center;
`;

export const Description = styled.Text`
	text-align: center;
	margin-top: ${RFValue(15)}px;
	font-family: ${({ theme }) => theme.fonts.regular}
	font-size: ${RFValue(15)}px;
`;

export const DoneButtonContainer = styled.View`
	top: 100px;
	position: absolute;
	align-items: flex-end;
	padding-horizontal: ${RFValue(40)}px;
	justify-content: flex-end;
`;

export const DoneButton = styled.TouchableOpacity`
	position: absolute;
	top: 10px;
	right: 0px;
	width: ${RFValue(60)}px;
	height: ${RFValue(30)}px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.blue};
	margin-top: ${getStatusBarHeight()}px;
	align-items: center;
	justify-content: center;
`;

export const DoneButtonTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular}
	color: ${({ theme }) => theme.colors.shapeColor};
	font-size: ${RFValue(15)}px;
	text-align: center;
	padding: ${RFValue(5)}px;
`;