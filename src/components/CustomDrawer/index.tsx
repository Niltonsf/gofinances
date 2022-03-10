import React, { useEffect } from 'react';
import { Container } from './styles';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { Register } from '../../screens/Register';
import { CustomDrawerContent } from '../CustomDrawerContent';
import { Dashboard } from '../../screens/Dashboard';
import { Summary } from '../../screens/Summary';
//REDUX
import { connect } from 'react-redux';
import { setSelectedTab } from '../../stores/tab/tabActions';
import { Settings } from '../../screens/Settings';
import { useSharedValue, interpolate, useAnimatedStyle, Extrapolate, withTiming } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();

function CustomDrawer({ selectedTab, setSelectedTab }: any){

	function setDefaultOnlyOnce() {
		setSelectedTab('Dashboard');
	}

	let progress = useSharedValue(0);
	
	const scale: any = useAnimatedStyle(() => {
		return {
			transform: [{ 
				scale: interpolate(
					progress.value,
					[0, 1],
					[1, 0.8],
					Extrapolate.CLAMP
				)
			}]
		};
	})

	const borderRadius: any = useAnimatedStyle(() => {
		return {
			borderRadius: interpolate(
				progress.value,
				[0, 1],
				[0, 26],
				Extrapolate.CLAMP
			)
		};
	})

	const animatedStyle = [[ borderRadius, scale ]];

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
					width: '70%',
					paddingRight: 20,
					backgroundColor: 'transparent'
				}}
				initialRouteName="Dashboard"
				drawerContent={props => {
					setTimeout(() => {									
						progress.value = 0;							
						/*
						 	PREVIOUS VERSION:
							setProgress(props.progress as any); 
						*/
					}, 0);					

					return <CustomDrawerContent
						navigation={props.navigation}
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}				
					/>
				}}
			>
				<Drawer.Screen name="Dashboard">
					{props => <Dashboard drawerAnimationStyle={animatedStyle} />}
				</Drawer.Screen>

				<Drawer.Screen name="Register">
					{props => <Register drawerAnimationStyle={animatedStyle} setSelectedTab={setSelectedTab}/>}
				</Drawer.Screen>

				<Drawer.Screen name="Summary">
					{props => <Summary drawerAnimationStyle={animatedStyle}/>}
				</Drawer.Screen>

				<Drawer.Screen name="Settings">
					{props => <Settings drawerAnimationStyle={animatedStyle}/>}
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