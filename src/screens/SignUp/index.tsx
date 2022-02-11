import React, { useState } from 'react';
import { 
	Container,
	Header,
	Footer,
	Form,
	Spacing,
	ReturnToLoginContainer,
	NormalText,
	ReturnOpcaity,
	LoginInTitle
} from './styles';
import DismissKeyboard from '../../components/DismissKeyboard';
import { useTheme } from 'styled-components';
import signUpLottie from '../../assets/signUpLottie.json';
import LottieView from 'lottie-react-native';
import { InputForm } from '../../components/Form/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Form/Button';
import { Divider } from '../../components/Divider';
import { Alert } from 'react-native';
import LoadingCard from '../../components/LoadingCard';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface RegisterProps {
	firstName: string;
	email: string;
	password: string;
	passwordConfirm: string;
}

const schema = Yup.object().shape({
	firstName: Yup.string().required('Name is required.'),
	email: Yup.string().required('Email is required.'),
	password: Yup.string().required('Password is required.'),
	passwordConfirm: Yup.string().required('Password confirmation is required.'),
});


export function SignUp({ navigation }: any) {
	const [isLoading, setIsLoading] = useState(false);
	const theme = useTheme();

	const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)});

	function handleRegister(form: RegisterProps) {
		setIsLoading(true);

		if(form.password !== form.passwordConfirm) {
			setIsLoading(false);
			return Alert.alert(`Passwords doesn't match`);
		};
		
		auth().createUserWithEmailAndPassword(form.email, form.password)
		.then((data) => {
			const currentUser = data.user;
			firestore().collection(currentUser.uid).doc('settings').set({
				name: form.firstName,
			});
		})
		.catch((error) => {
			console.log(error);
			Alert.alert(`Error signing up!`);
			setIsLoading(false);
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
						<LottieView 
							source={signUpLottie} 
							style={{
								width: 130,
								height: 130,																	
							}}
							autoPlay
							loop
							resizeMode='contain'
						/>
					</Header>

					<Footer>
							<Form>
								<InputForm 
									placeholder={errors.firstName && errors.firstName.message ? errors.firstName.message : 'Name'}
									name="firstName" 								
									control={control} 
									error={errors.firstName && errors.firstName.message}								
								/>
								<Spacing height={20} />
								<InputForm 
									placeholder="Email" 
									name="email" 
									keyboardType="email-address" 
									autoCapitalize='none'
									control={control} 
									error={errors.email && errors.email.message}
								/>
								<Spacing height={20} />
								<InputForm 
									placeholder="Password" 
									name="password" 									 
									control={control} 
									autoCapitalize='none'
									secureTextEntry={true} 
									error={errors.password && errors.password.message}
								/>
								<Spacing height={20} />
								<InputForm 
									placeholder="Confirm password" 
									name="passwordConfirm" 				
									secureTextEntry={true} 
									autoCapitalize='none'		
									control={control} 
									error={errors.passwordConfirm && errors.passwordConfirm.message}									
								/>
								<Spacing height={20} />

								<Button title="SIGN UP" onPress={handleSubmit(handleRegister as any)} />															

								<ReturnToLoginContainer>
									<NormalText>Back to </NormalText>
									<ReturnOpcaity onPress={() => navigation.navigate('SignIn')}>
										<LoginInTitle>sign in.</LoginInTitle>
									</ReturnOpcaity>
								</ReturnToLoginContainer>
							</Form>
					</Footer>				
				</Container>
			</DismissKeyboard>
		}
		</>
	);
}