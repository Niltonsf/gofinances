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
	LoadingContainer
} from './styles';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components';
// FORM
import { InputForm } from '../../components/Form/InputForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Button } from '../../components/Form/Button';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface LoginProps {
	email: string;
	password: string;
}

const schema = Yup.object().shape({
	email: Yup.string().required('Email is required.'),
	password: Yup.string().required('Password is required.'),
});

const DismissKeyboard = ({ children }: any) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

export function SignIn(){
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
		})
	}

	function handleRegister(form: LoginProps) {
		setIsLoading(true);
		
		auth().createUserWithEmailAndPassword(form.email, form.password)
		.then((user) => {
			Alert.alert('User successfully registered');
		})
		.catch((error) => {
			setIsLoading(false);
			console.log(error.message);
		});
	}

	return (
		<>
		{
			isLoading ?
			<LoadingContainer>
				<ActivityIndicator color={theme.colors.orange} size='large'/>
			</LoadingContainer>
			:
			<DismissKeyboard>
			<Container>
				<LinearGradient
					colors={[`${theme.colors.blue}`, `${theme.colors.text_dark}`]}
					locations={[0.8, 0.1]}
					style={{
						flex:1, 
					}}
				>
					<Header>

						<TitleWrapper>
							<LogoSvg
								width={RFValue(120)}
								height={RFValue(68)}
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
										error={errors.email && errors.email.message}
									/>
								</Spacing>
								<InputForm 
									placeholder="Password" 
									name="password" 
									secureTextEntry={true} 
									control={control} 
									error={errors.password && errors.password.message}
								/>
							</Fields>

							<Spacing>
								<Button title="Login" onPress={handleSubmit(handleLogin as any)}/>
							</Spacing>		
							<Button title="Register" onPress={handleSubmit(handleRegister as any)}/>
						</Form>

					</Footer>

				</LinearGradient>
			</Container>
		</DismissKeyboard>
		}
		</>
	);
}