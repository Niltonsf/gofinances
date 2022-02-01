import React, { useState } from 'react';
import {
	Container,
	Header,
	TitleWrapper,
	Title,
	Footer,
	Form,
	Fields,
	Spacing,
	ForgotPassContainer,
	ForgotText
} from './styles';
import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components';
// FORM
import { InputForm } from '../../components/Form/InputForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Button } from '../../components/Form/Button';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import LogoImage from '../../assets/lottieLogo.json';
import { Divider } from '../../components/Divider';
import DismissKeyboard from '../../components/DismissKeyboard';
import LoadingCard from '../../components/LoadingCard';

interface LoginProps {
	email: string;
	password: string;
}

const schema = Yup.object().shape({
	email: Yup.string().required('Email is required.'),
	password: Yup.string().required('Password is required.'),
});

export function SignIn({ navigation }: any){
	const theme = useTheme();
	const [isLoading, setIsLoading] = useState(false);

	const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)});

	function handleLogin(form: LoginProps) {
		setIsLoading(true);

		auth().signInWithEmailAndPassword(form.email, form.password)
		.then(() => {})
		.catch((error) => {
			setIsLoading(false);
			Alert.alert(error.message)
		});
	}

	return (
		<>
		{
			isLoading ?
			<LoadingCard />
			:
			<DismissKeyboard>
			<Container>
				<LinearGradient
					colors={[`${theme.colors.shapeColor}`, `${theme.colors.blue}`]}
					locations={[0.8, 0.1]}
					style={{
						flex:1, 
					}}
				>
					<Header>
						<TitleWrapper>					
							<LottieView 
							source={LogoImage} 
							style={{
								width: 150,
								height: 150,																	
							}}
							autoPlay
							loop
							resizeMode='contain'
							/>
							<Title>
								Control you finances {'\n'}in a simple way.
							</Title>
						</TitleWrapper>
					</Header>

					<Footer>
						<Form>
							<Fields>
								<Spacing>
									<InputForm 
										placeholder="Email" 
										name="email" 
										keyboardType="email-address" 
										control={control} 
										autoCapitalize='none'
										error={errors.email && errors.email.message}								
									/>
								</Spacing>
								<InputForm 
									placeholder="Password" 
									name="password" 
									secureTextEntry={true} 
									autoCapitalize='none'
									control={control} 
									error={errors.password && errors.password.message}
								/>
							</Fields>

							<ForgotPassContainer>
								<ForgotText>Forgot password?</ForgotText>
							</ForgotPassContainer>

							<Spacing>
								<Button title="Login" onPress={handleSubmit(handleLogin as any)}/>
							</Spacing>		

							<Divider text='OR' />

							<Button title="SignUp" onPress={() => navigation.navigate('SignUp')}/>
						</Form>

					</Footer>

				</LinearGradient>
			</Container>
		</DismissKeyboard>
		}
		</>
	);
}