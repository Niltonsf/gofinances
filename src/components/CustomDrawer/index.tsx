import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { Register } from '../../screens/Register';
import { CustomDrawerContent } from '../CustomDrawerContent';
import Animated from 'react-native-reanimated';
import { Dashboard } from '../../screens/Dashboard';
import { Summary } from '../../screens/Summary';
//REDUX
import { connect } from 'react-redux';
import { setSelectedTab } from '../../stores/tab/tabActions';

const Drawer = createDrawerNavigator();

function CustomDrawer({ selectedTab, setSelectedTab }: any){

	function setDefaultOnlyOnce() {
		setSelectedTab('Dashboard');
	}

	const [progress, setProgress] = useState(new Animated.Value(0));

	const scale: any = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [1, 0.8]
	});

	const borderRadius: any = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [0, 26]
	});

	const animatedStyle = { borderRadius, transform: [{ scale }], overflow: 'hidden' };

	useEffect(() => {
		setDefaultOnlyOnce();
	}, [])

	return (
		<Container>
			<Drawer.Navigator
				drawerType='slide'
				overlayColor='transparent'
				drawerStyle={{
					flex: 1,
					width: '65%',
					paddingRight: 20,
					backgroundColor: 'transparent'
				}}
				initialRouteName="Da"
				drawerContent={props => {
					setTimeout(() => {
						setProgress(props.progress as any);
					}, 0);					

					return <CustomDrawerContent
						navigation={props.navigation}
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}				
					/>
				}}
			>
				<Drawer.Screen name="Dashboard">
					{props => <Dashboard drawerAnimationStyle={animatedStyle}/>}
				</Drawer.Screen>

				<Drawer.Screen name="Register">
					{props => <Register drawerAnimationStyle={animatedStyle}/>}
				</Drawer.Screen>

				<Drawer.Screen name="Summary">
					{props => <Summary drawerAnimationStyle={animatedStyle}/>}
				</Drawer.Screen>

			</Drawer.Navigator>
		</Container>
	);
}

function mapStateToProps(state: any) {
	return {
		selectedTab: state.tabReducer.selectedTab
	}
}

function mapDispatchToProps(dispatch: any) {
	return {
		setSelectedTab: (selectedTab: any) => { return dispatch(setSelectedTab(selectedTab)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);