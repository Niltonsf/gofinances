import React from 'react';
import { Container, Error } from './styles';
import { Input } from '../Input';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { InputPrice } from '../../Form/InputPrice';

interface Props extends TextInputProps {
	control: Control;
	name: string;
	error?: any;
}

export function InputForm({ control, name, error, ...rest }: Props){
	return (
		<Container>
			<Controller
				control={control}
				render={({ field: { onChange, value }}) => (
					rest.placeholder === 'Price' ? 
					<InputPrice 
						value={value}
						onChangeValue={onChange}
						error={error}
						{...rest}
					/>
					:
					<Input											
						onChangeText={onChange}
						value={value}	
						error={error!}
						{...rest}
					/>
				)}
				name={name}
			/>
		</Container>
	);
}

/**
 * <CurrencyInput
						value={value}
						onChangeValue={onChange}
						prefix="R$"
						delimiter=","
						separator="."
						precision={2}
						style={{
							width: 100%;
							padding: 16px 18px;
							font-size: ${RFValue(14)}px;
							font-family: ${({ theme }) => theme.fonts.regular};
							color: ${({ theme }) => theme.colors.text_dark};
							background-color: ${({ theme }) => theme.colors.shapeColor};
							border-radius: 5px;
							margin-bottom: 8px;
						}}
					/>
 */