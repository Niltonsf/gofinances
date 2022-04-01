import React, { useEffect } from 'react';
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
	LogOutText,
	ClickableImage
} from './styles';
import { DrawerContentScrollView } from '@react-navigation/drawer'; 
import { Image, TouchableOpacity } from 'react-native';
import { CustomDrawerItem } from '../CustomDrawerItem';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from 'react-native-image-picker';


export function CustomDrawerContent({ navigation, selectedTab, setSelectedTab }: any){
	const { userSettings, firebaseFunctions } = useAuth();

	async function logOut() {
		try {
			auth().signOut();
			await firebaseFunctions.removeItemValue();
		} catch(err) {
			console.log(err);
		}
	}

	async function handleProfileImage() {
    const result = await ImagePicker.launchImageLibrary({mediaType: 'photo'});

    // if (status == 'granted') {
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     aspect: [4, 4],
    //     quality: 1,
    //   });

    //   if (!result.cancelled) {
    //     //setImage(result.uri);
    //   }
    // }
  };

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
					<ClickableImage onPress={handleProfileImage}>
						<Image style={{ width: 50, height: 50, borderRadius: 50}} source={require('../../assets/defaultProfile.png')} />
					</ClickableImage>
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