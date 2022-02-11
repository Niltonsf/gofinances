import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../global/styles/theme';

export const LoadingContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background};
`;