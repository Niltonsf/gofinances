import React from 'react';
import { 
	Container,
	CloseIcon,
	ProfileContainer,
	Username,
	IconContainer,
	UsernameContainer,
	Gretting,
	DrawerItems,
	LogOutButton,
	LogOutIcon,
	LogOutText
} from './styles';
import { DrawerContentScrollView } from '@react-navigation/drawer'; 
import { Image, TouchableOpacity } from 'react-native';
import { CustomDrawerItem } from '../CustomDrawerItem';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../hooks/auth';


export function CustomDrawerContent({ navigation, selectedTab, setSelectedTab }: any){
	const { userSettings } = useAuth();

	function logOut() {
		auth().signOut();
	}

	return (
		<DrawerContentScrollView
			scrollEnabled={false}
			contentContainerStyle={{ flex: 1}}
		>
			<Container>
				<IconContainer>
					<TouchableOpacity onPress={() => navigation.closeDrawer()}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<CloseIcon name="close" />
					</TouchableOpacity>
				</IconContainer>
				
				<ProfileContainer>
					<Image style={{ width: 60, height: 60, borderRadius: 10}} source={{ uri: "https://github.com/niltonsf.png"}} />
					<UsernameContainer>
						<Gretting>Hello,</Gretting>
						<Username>{userSettings.name}</Username>
					</UsernameContainer>
				</ProfileContainer>

				<DrawerItems>
						<CustomDrawerItem label="Dashboard" icon="person" isSelected={selectedTab === 'Dashboard'}
							onPress={() => {
								setSelectedTab("Dashboard");
								navigation.navigate("Dashboard");
							}} 
						/>
						<CustomDrawerItem label="Register" icon="book" isSelected={selectedTab === 'Register'}
							onPress={() => {
								setSelectedTab("Register");
								navigation.navigate("Register");
							}}  
						/>
						<CustomDrawerItem label="Summary" icon="pie-chart" isSelected={selectedTab === 'Summary'}
							onPress={() => {
								setSelectedTab("Summary");
								navigation.navigate("Summary");
							}} 
						/>
						<CustomDrawerItem label="Settings" icon="settings" isSelected={selectedTab === 'Settings'}
							onPress={() => {
								setSelectedTab("Settings");
								navigation.navigate("Settings");
							}} 
						/>
				</DrawerItems>

				<LogOutButton onPress={logOut}>
					<LogOutIcon name="logout" />
					<LogOutText>Logout</LogOutText>
				</LogOutButton>
			</Container>
		</DrawerContentScrollView>
	);
}