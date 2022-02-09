import React from 'react';
import { 
	Container,
	Icon,
	PageName
} from './styles';
interface CustomDrawerItemProps {
	label: string;
	icon: string;
	onPress: () => void;
	isSelected: boolean;
}

export function CustomDrawerItem({ label, icon, onPress, isSelected }: CustomDrawerItemProps){
	return (
		<Container onPress={onPress} isSelected={isSelected}>
			<Icon name={icon} isSelected={isSelected}/>
			<PageName isSelected={isSelected}>{label}</PageName>
		</Container>
	);
}