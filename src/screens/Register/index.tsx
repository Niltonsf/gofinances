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
	TransactionTypes
} from './styles';
import { CategorySelect } from '../CategorySelect'; 
import { InputForm } from '../../components/Form/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
 
interface FormProps {
	name: string;
	amount: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required('Name is required.'),
	amount: Yup.number().typeError('Insert numeric value').positive('Only positive values.')
});

export function Register() {

	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Category',
	});
	const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

	function handleTransactionType(type: 'up' | 'down') {
		setTransactionType(type);
	}

	function handleCloseSelectCategory() {
		setCategoryModalOpen(false);
	}

	function handleOpenSelectCategory() {
		setCategoryModalOpen(true);
	}

	function handleRegister(form: FormProps) {
		if(!transactionType) return Alert.alert('Select a transaction type.');
		if(category.key === 'category') return Alert.alert('Select a category.');

		const data = {
			name: form.name,
			amount: form.amount,
			transactionType,
			category: category.key
		}
		console.log(data);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header>
					<Title>Register</Title>
				</Header>
				<Form>
					<Fields>
						<InputForm placeholder="Name" name="name" control={control} autoCapitalize="sentences" autoCorrect={false} error={errors.name && errors.name.message}/>
						<InputForm placeholder="Price" name="amount" control={control} keyboardType="numeric" error={errors.amount && errors.amount.message}/>
						<TransactionTypes>
							<TransactionTypeButton type="up" title="Income" onPress={() => handleTransactionType('up')}
								isActive={transactionType === 'up'}
							/>
							<TransactionTypeButton type="down" title="Outcome" onPress={() => handleTransactionType('down')}
								isActive={transactionType === 'down'}
							/>
						</TransactionTypes>
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
	);
}