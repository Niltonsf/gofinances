import React from 'react';

import {
	View, 
	Text
} from 'react-native';

interface DividerProps {
	text: string;
}

export function Divider({ text }: DividerProps){
	return (
		<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15, marginTop: 15}}>
			<View style={{flex: 1, height: 1, backgroundColor: 'rgba(0,0,0, 0.4)'}} />
			<View>
				<Text style={{width: 50, textAlign: 'center', color: 'rgba(0,0,0, 0.4)'}}>{text}</Text>
			</View>
			<View style={{flex: 1, height: 1, backgroundColor: 'rgba(0,0,0, 0.4)'}} />
		</View>
	);
}