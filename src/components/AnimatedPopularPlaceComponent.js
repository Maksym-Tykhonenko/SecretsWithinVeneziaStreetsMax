import React from 'react';
import { Animated } from 'react-native';
import PopularPlaceComponent from './PopularPlaceComponent';

const AnimatedPopularPlaceComponent = ({
  place,
  dimensions,
  styles,
  setIsDetailsOfPlaceVisible,
  setSelectedPlace,
  animatedValue,
  index,
}) => {
  return (
    <Animated.View
      style={{
        opacity: animatedValue.opacity,
        transform: [
          { translateY: animatedValue.translateY },
          { scale: animatedValue.scale },
        ],
      }}
    >
      <PopularPlaceComponent
        place={place}
        dimensions={dimensions}
        styles={styles}
        setIsDetailsOfPlaceVisible={setIsDetailsOfPlaceVisible}
        setSelectedPlace={setSelectedPlace}
      />
    </Animated.View>
  );
};

export default AnimatedPopularPlaceComponent;