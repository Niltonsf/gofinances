import React from 'react';
import { 
	Container,
	Header,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	UserWrapper,
	Icon,
	HighLightCards
} from './styles';
import { HighLightCard } from '../../components/HighLightCard';

export function Dashboard() {
	return (
		<Container>
      <Header>
				<UserWrapper>
					<UserInfo>
						<Photo source={{ uri: 'http://github.com/niltonsf.png'}}/>
						<User>
							<UserGreeting>Ola,</UserGreeting>
							<UserName>Nilton</UserName>
						</User>
					</UserInfo>

					<Icon name="power"/>
				</UserWrapper>
			</Header>

			<HighLightCards>
				<HighLightCard />
				<HighLightCard />
			</HighLightCards>
    </Container>
	);
}