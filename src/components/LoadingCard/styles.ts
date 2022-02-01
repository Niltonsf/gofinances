import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const LoadingContainer = styled(LinearGradient).attrs({
	colors: ['#FFFFFF', '#5636D3'],
	locations: [0.8, 0.1],
	style: {
		flex:1, 
	}
})`
	flex: 1;
	justify-content: center;
	align-items: center;
`;