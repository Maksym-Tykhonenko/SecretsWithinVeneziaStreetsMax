import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export const useStaggeredAnimation = (itemCount, baseDelay = 0) => {
  const animatedValues = useRef(
    Array.from({ length: itemCount }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(50),
      scale: new Animated.Value(0.8),
    }))
  ).current;

  const startAnimation = () => {
    const animations = animatedValues.map((animatedValue, index) => {
      return Animated.parallel([
        Animated.timing(animatedValue.opacity, {
          toValue: 1,
          duration: 600,
          delay: baseDelay + index * 100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.translateY, {
          toValue: 0,
          duration: 600,
          delay: baseDelay + index * 100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.scale, {
          toValue: 1,
          duration: 600,
          delay: baseDelay + index * 100,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(50, animations).start();
  };

  const resetAnimation = () => {
    animatedValues.forEach(animatedValue => {
      animatedValue.opacity.setValue(0);
      animatedValue.translateY.setValue(50);
      animatedValue.scale.setValue(0.8);
    });
  };

  return {
    animatedValues,
    startAnimation,
    resetAnimation,
  };
};