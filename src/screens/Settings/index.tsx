import React, { useEffect, useState } from 'react';
import { 
	Header,
	DrawerContainer,
	Icon,
	Title,
	Container,
	ClickableImage,
	Form
} from './styles';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from 'react-native-image-picker';
import { ActivityIndicator, Image } from 'react-native';
import { useTheme } from 'styled-components';
import { InputForm } from '../../components/Form/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
	name: Yup.string().required('Name is required.'),
	amount: Yup.number().typeError('Insert numeric value').positive('Only positive values.').required('Amount is required.')
});

export function Settings({ drawerAnimationStyle }: any){
	const { firebaseFunctions, userSettings } = useAuth();
	const theme = useTheme();
	const navigation: any = useNavigation();
	const [name, setName] = useState(userSettings.name);

	// Managing form
	const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

	async function handleProfileImage() {
    const { assets } = await ImagePicker.launchImageLibrary({mediaType: 'photo'});

		if (!assets) return;
		
		await firebaseFunctions.handleProfileUpload(assets![0].uri as any);
  };

	return (
		<Animated.View style={[{ flex: 1, overflow: 'hidden' }, [drawerAnimationStyle]]}>
			<Header>
				<DrawerContainer onPress={() => navigation.openDrawer()}>
					<Icon name="menu" />
				</DrawerContainer>
				<Title>Settings</Title>
			</Header>
			<Container>
				<ClickableImage onPress={handleProfileImage}>					
						<Image																	
							source={require('../../assets/defaultProfile.png')}
							style={{width: 100, height: 100, borderRadius: 50}}  
						/> 									
				</ClickableImage>
				<Form>
					<InputForm placeholder="Name" name="name" value={name} control={control} autoCorrect={false} error={errors.name && errors.name.message}  onChangeText={newName => setName(newName)}/>
				</Form>
			</Container>
		</Animated.View>
	);
}