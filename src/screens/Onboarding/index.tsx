import React, { useState, useRef } from 'react';
import { 
	Container,
	FlatListContainer
} from './styles';
import {
	FlatList,
	Animated
} from 'react-native'
import OnboardingData from '../../utils/onboarding';
import { OnboardingItem } from '../../components/OnboardingItem';
import { Paginator } from '../../components/Paginator';

export function Onboarding(){

	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const onboardingDataRef = useRef(null);

	const viewableItemsChanged = useRef(({ viewableItems }: any) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	return (
		<Container>
			<FlatListContainer>
				<FlatList 
					data={OnboardingData} 
					renderItem={({ item }) => <OnboardingItem image={item.image} title={item.title} description={item.description}/>}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled={true}
					bounces={false}
					keyExtractor={(item) => String(item.id)}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } }}], {
						useNativeDriver: false
					})}
					scrollEventThrottle={32}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					ref={onboardingDataRef}
				/>
			</FlatListContainer>

			<Paginator data={OnboardingData} scrollX={scrollX} currentIndex={currentIndex}/>
		</Container>
	);
}