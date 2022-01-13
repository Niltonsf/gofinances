import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
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

export function Register() {

	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria',
	});

	function handleTransactionType(type: 'up' | 'down') {
		setTransactionType(type);
	}

	function handleCloseSelectCategory() {
		setCategoryModalOpen(false);
	}

	function handleOpenSelectCategory() {
		setCategoryModalOpen(true);
	}

	return (
		<Container>
			<Header>
				<Title>Cadastro</Title>
			</Header>
			<Form>
				<Fields>
					<Input placeholder="Nome"/>
					<Input placeholder="Preço"/>
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
				<Button title="Enviar"/>
			</Form>

			<Modal visible={categoryModalOpen}>
				<CategorySelect 
					category={category}
					setCategory={setCategory}
					closeSelectCategory={handleCloseSelectCategory}
				/>
			</Modal>
		</Container>
	);
}