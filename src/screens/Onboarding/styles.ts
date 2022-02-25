import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding-horizontal: ${RFValue(2)}px;
	margin-top: ${getStatusBarHeight()}px;
	margin-bottom: ${getBottomSpace()}px;
`;

export const FlatListContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
