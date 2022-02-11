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
	ForgotText,
	Button,
	ButtonTitle
} from './styles';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components';
// FORM
import { InputForm } from '../../components/Form/InputForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import SignInLottie from '../../assets/signInLottie.json';
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
					<Header>
						<TitleWrapper>					
							<LottieView 
							source={SignInLottie} 
							style={{
								width: 180,
								height: 180,																	
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
								<InputForm 
									placeholder="Email" 
									name="email" 
									keyboardType="email-address" 
									control={control} 
									autoCapitalize='none'
									error={errors.email && errors.email.message}								
								/>		
								<Spacing height={15} />					
								<InputForm 
									placeholder="Password" 
									name="password" 
									secureTextEntry={true} 
									autoCapitalize='none'
									control={control} 
									error={errors.password && errors.password.message}
								/>
							</Fields>

							<Spacing height={15}/>

							<Button onPress={handleSubmit(handleLogin as any)}>
								<ButtonTitle>SIGN IN</ButtonTitle>
							</Button>

							<Spacing height={15}/>
							
							<Button onPress={() => navigation.navigate('SignUp')}>
								<ButtonTitle>SIGN UP</ButtonTitle>
							</Button>

						</Form>

						<Spacing height={15}/>

						<ForgotPassContainer>
							<ForgotText>Forgot password?</ForgotText>
						</ForgotPassContainer>

					</Footer>
			</Container>
		</DismissKeyboard>
		}
		</>
	);
}