import React from 'react';
import { 
	LoadingContainer,
} from './styles';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export default function LoadingCard() {
	const theme = useTheme();

	return (
		<LoadingContainer>
			<ActivityIndicator color={theme.colors.blue} size='large'/>
		</LoadingContainer>
	);
}