import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import {
	Container,
	Header,
	Title,
	Form,
	Fields,
	TransactionTypes,
	DrawerContainer,
	Icon,
	Spacing
} from './styles';
import { CategorySelect } from '../CategorySelect'; 
import { InputForm } from '../../components/Form/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native'
import Animated from 'react-native-reanimated';
import { useAuth } from '../../hooks/auth';

interface FormProps {
	name: string;
	amount: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required('Name is required.'),
	amount: Yup.number().typeError('Insert numeric value').positive('Only positive values.').required('Amount is required.')
});

export function Register({ drawerAnimationStyle, setSelectedTab }: any) {
	const { firebaseFunctions } = useAuth();

	const navigation: any = useNavigation();
	
	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Category',
	});

	const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

	function handleTransactionType(type: 'positive' | 'negative') {
		setTransactionType(type);
	}

	function handleCloseSelectCategory() {
		setCategoryModalOpen(false);
	}

	function handleOpenSelectCategory() {
		setCategoryModalOpen(true);
	}

	async function handleRegister(form: FormProps) {
		if(!transactionType) return Alert.alert('Select a transaction type.');
		
		if(category.key === 'category') return Alert.alert('Select a category.');

		const newTransaction = {
			id: String(uuid.v4()),
			name: form.name,
			amount: form.amount,
			type: transactionType,
			category: category.key,
			date: new Date()
		}

		try {
			await firebaseFunctions.insertDataIntoAsyncStorage(newTransaction);
			
			// RESETING FIELDS
			setTransactionType('');
			setCategory(
				{
					key: 'category',
					name: 'Category',
				}
			);
			reset();
			setSelectedTab("Dashboard");
			navigation.navigate("Dashboard"as any);
		} catch (e) {
			console.log(e);
			Alert.alert("Something went wrong on saving!");
		}
	}

	return (
		<Animated.View style={{ flex: 1, ...drawerAnimationStyle}}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<DrawerContainer onPress={() => navigation.openDrawer()}>
							<Icon name="menu" />
						</DrawerContainer>
						<Title>Register</Title>
					</Header>
					<Form>
						<Fields>
							<InputForm placeholder="Name" name="name" control={control} autoCapitalize="sentences" autoCorrect={false} error={errors.name && errors.name.message}/>
							<Spacing height={10}/>
							<InputForm placeholder="Price" name="amount" control={control} keyboardType="numeric" error={errors.amount && errors.amount.message} />												
							<Spacing height={10}/>
							<TransactionTypes>
								<TransactionTypeButton type="up" title="Income" onPress={() => handleTransactionType('positive')}
									isActive={transactionType === 'positive'}
								/>
								<TransactionTypeButton type="down" title="Outcome" onPress={() => handleTransactionType('negative')}
									isActive={transactionType === 'negative'}
								/>
							</TransactionTypes>
							<Spacing height={10}/>
							<CategorySelectButton title={category.name} onPress={handleOpenSelectCategory}/>
						</Fields>
						<Button title="Send" onPress={handleSubmit(handleRegister as any)}/>
					</Form>

					<Modal visible={categoryModalOpen}>
						<CategorySelect 
							category={category}
							setCategory={setCategory}
							closeSelectCategory={handleCloseSelectCategory}
						/>
					</Modal>
				</Container>
			</TouchableWithoutFeedback>
		</Animated.View>
	);
}