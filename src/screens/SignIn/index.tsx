import React from 'react';
import {
	Container,
	Header,
	TitleWrapper,
	Title,
	Footer,
	Form,
	Fields,
	Spacing
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

	const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)});

	function handleLogin(form: LoginProps) {
		console.log(form);
	}

	return (
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
							<Button title="Register" onPress={() => {}}/>
						</Form>

					</Footer>

				</LinearGradient>
			</Container>
		</DismissKeyboard>
	);
}