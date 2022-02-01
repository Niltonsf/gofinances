import React from 'react';
import { FlatList } from 'react-native';
import { 
	Container,
	Header,
	Title,
	Category,
	Icon,
	Name,
	Separator,
	Footer
} from './styles';
import {categories} from '../../utils/categories';
import { Button } from '../../components/Form/Button';

interface Category {
	key: string;
	name: string;
}

interface CategorySelectProps {
	category: Category;
	setCategory: (category: Category) => void;
	closeSelectCategory: () => void;
}

export function CategorySelect({
	category,
	setCategory,
	closeSelectCategory
}: CategorySelectProps){

	function handleCategorySelect(category: Category) {
		setCategory(category);
	}

	return (
		<Container>
			<Header>
				<Title>Categoria</Title>
			</Header>

			<FlatList 
				data={categories}
				style={{flex:1, width: '100%'}}
				numColumns={2}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Category 
						onPress={() => handleCategorySelect(item)}
						isActive={category.key === item.key}
					>
						<Icon name={item.icon} isActive={category.key === item.key} />
						<Name isActive={category.key === item.key}>{item.name}</Name>
					</Category>
				)}		
			/>

			<Footer>
				<Button title="Select" onPress={closeSelectCategory}/>
			</Footer>
		</Container>
	);
}