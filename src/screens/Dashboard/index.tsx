import React from 'react';
import { View, Text } from 'react-native';
import { 
	Container,
	Header,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	UserWrapper
} from './styles';

export function Dashboard() {
	return (
		<Container>
      <Header>
				<UserWrapper>
					<UserInfo>
						<Photo source={{ uri: 'http://github.com/niltonsf.png'}}/>
						<User>
							<UserGreeting>Ola,</UserGreeting>
							<UserName>NIlton</UserName>
						</User>
					</UserInfo>
				</UserWrapper>
			</Header>
    </Container>
	);
}