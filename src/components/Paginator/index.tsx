import React, { useEffect } from 'react';
import {
  Container,
  CurrentSelectedPageIndicator,
  ButtonContainer,
  ButtonTitle,
} from './styles';
import { useWindowDimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
interface PaginatorProps {
  data: any;
  scrollX: any;
	currentIndex: any;
}

const inactiveSize = RFValue(10);
const activeSize = RFValue(20);

export function Paginator({ data, scrollX, currentIndex }: PaginatorProps) {
  const { width } = useWindowDimensions();

	useEffect(() => { console.log('here')}, [currentIndex]);

  return (
    <Container>
      {data.map((_: any, index: any) => {
        const inputRange = Array(data.length)
          .fill(0)
          .map((_, i) => i * width);
        const isLastElement = index === data.length - 1;
        const widthRange = Array(data.length)
          .fill(inactiveSize)
          .map((v, i) => {
            if (i === data.length - 1) {
              if (isLastElement) return width;
              return 0;
            }
            if (i === index) return activeSize;
            return v;
          });        
        let height = inactiveSize;
        let buttonOpacity = 0;
				
        let dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: widthRange,
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: widthRange.map((v) => ( v? v >= activeSize ? 1 : 0.3: 0)),
          extrapolate: 'clamp',
        });

        if (isLastElement) {					
          dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [11, 11, 330],
            extrapolate: 'clamp',
          });
          height = dotWidth.interpolate({
            inputRange: [inactiveSize, width],
            outputRange: [10, RFValue(50)],
            extrapolate: 'clamp',
          });
          buttonOpacity = dotWidth.interpolate({
            inputRange: [inactiveSize, width],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });														
        }
        const marginHorizontal = dotWidth.interpolate({
          inputRange: [0, inactiveSize],
          outputRange: [0, RFValue(8)],
          extrapolate: 'clamp',
        });							
				
        return (
          <CurrentSelectedPageIndicator
            key={index.toString()}
            style={{ width: dotWidth, opacity, marginHorizontal, height}}>
            {isLastElement && (
              <ButtonContainer
								disabled={currentIndex !== 2 ? true : false}
								onPress={() => {
									
								}}
                style={{ opacity: buttonOpacity }}>
                <ButtonTitle style={currentIndex === 2 ? { opacity: 1 } : { opacity: 0 }}>LET'S BUILD THE FUTURE</ButtonTitle>
              </ButtonContainer>
            )}
          </CurrentSelectedPageIndicator>
        );
      })}
    </Container>
  );
}