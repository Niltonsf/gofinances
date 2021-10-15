import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dashboard } from './src/Dashboard';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
		<>
			<Dashboard />
			<StatusBar style="dark"/>
		</>
  );
}
