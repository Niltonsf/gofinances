import React from 'react';
import { 
	Container,
	Icon,
	PageName
} from './styles';

interface CustomDrawerItemProps {
	label: string;
	icon: string;
	onPress?: () => void
}

export function CustomDrawerItem({ label, icon, onPress }: CustomDrawerItemProps){
	return (
		<Container onPress={onPress}>
			<Icon name={icon} />
			<PageName>{label}</PageName>
		</Container>
	);
}