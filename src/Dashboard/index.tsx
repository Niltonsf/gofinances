import React from 'react';
import { View, Text } from 'react-native';

interface HomeProps {
	title: string;
}

export function Dashboard({ title }: HomeProps) {
	return (
		<View>
			<Text>{title}</Text>
		</View>
	);
}