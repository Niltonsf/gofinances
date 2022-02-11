import React from 'react';
import { FlatList } from 'react-native';
import { 
	Container,
	Header,
	Title,
	Category,
	Icon,
	Name,
	Footer,
	CategoryTouch
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
				<Title>Catergory Select</Title>
			</Header>

			<FlatList 
				data={categories}
				style={{					
					flex:1, 
					width: '100%',
					paddingHorizontal: 15,
					marginTop: 23
				}}
				numColumns={2}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<CategoryTouch onPress={() => handleCategorySelect(item)}>
						<Category 							
							isActive={category.key === item.key}
						>
							<Icon name={item.icon} isActive={category.key === item.key} />
							<Name isActive={category.key === item.key}>{item.name}</Name>
						</Category>
					</CategoryTouch>
				)}		
			/>

			<Footer>
				<Button title="Select" onPress={closeSelectCategory}/>
			</Footer>
		</Container>
	);
}