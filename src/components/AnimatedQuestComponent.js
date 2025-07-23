import React from 'react';
import { Animated } from 'react-native';
import QuestComponent from './QuestComponent';

const AnimatedQuestComponent = ({
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
      <QuestComponent
        place={place}
        dimensions={dimensions}
        styles={styles}
        setIsDetailsOfPlaceVisible={setIsDetailsOfPlaceVisible}
        setSelectedPlace={setSelectedPlace}
      />
    </Animated.View>
  );
};

export default AnimatedQuestComponent;