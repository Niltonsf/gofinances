import styled, {css} from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import theme from '../../../global/styles/theme';

interface ContainerProps {
	isActive: boolean;
	type: 'up' | 'down';
}

interface IconProps {
	type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
	width: 48%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border: 1.5px solid ${({ theme }) => theme.colors.texts};
	padding: 16px;
	border-radius: 5px;

	${({ isActive, type }) => isActive && type === 'up' && css`
		background-color: ${({ theme }) => theme.colors.green_attention}
		border-width: 0px;
	`};

	${({ isActive, type }) => isActive && type === 'down' && css`
		background-color: ${({ theme }) => theme.colors.red_attention}
		border-width: 0px;
	`};
`;

export const Title = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
	font-size: ${RFValue(24)}px;
	margin-right: 12px;
	color:${({ theme, type }) => 
		type === 'up' ?
		theme.colors.green :
		theme.colors.red
	};
`;