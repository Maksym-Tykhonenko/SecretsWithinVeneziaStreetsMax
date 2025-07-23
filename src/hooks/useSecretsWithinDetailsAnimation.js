import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useSecretsWithinDetailsAnimation = () => {
  const secretsWithinDetailsOpacity = useRef(new Animated.Value(0)).current;
  const secretsWithinDetailsScale = useRef(new Animated.Value(0.8)).current;
  const secretsWithinDetailsSlide = useRef(new Animated.Value(100)).current;
  const secretsWithinListOpacity = useRef(new Animated.Value(1)).current;
  const secretsWithinListScale = useRef(new Animated.Value(1)).current;

  const secretsWithinOpenDetailsAnimation = (callback) => {
    // Hide list first
    Animated.parallel([
      Animated.timing(secretsWithinListOpacity, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(secretsWithinListScale, {
        toValue: 0.95,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      
      // Show details
      Animated.parallel([
        Animated.timing(secretsWithinDetailsOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(secretsWithinDetailsScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
        Animated.timing(secretsWithinDetailsSlide, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const secretsWithinCloseDetailsAnimation = (callback) => {
    // Hide details first
    Animated.parallel([
      Animated.timing(secretsWithinDetailsOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(secretsWithinDetailsScale, {
        toValue: 0.8,
        duration: 300,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(secretsWithinDetailsSlide, {
        toValue: 100,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      
      // Show list
      Animated.parallel([
        Animated.timing(secretsWithinListOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(secretsWithinListScale, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const secretsWithinResetAnimations = () => {
    secretsWithinDetailsOpacity.setValue(0);
    secretsWithinDetailsScale.setValue(0.8);
    secretsWithinDetailsSlide.setValue(100);
    secretsWithinListOpacity.setValue(1);
    secretsWithinListScale.setValue(1);
  };

  return {
    secretsWithinDetailsOpacity,
    secretsWithinDetailsScale,
    secretsWithinDetailsSlide,
    secretsWithinListOpacity,
    secretsWithinListScale,
    secretsWithinOpenDetailsAnimation,
    secretsWithinCloseDetailsAnimation,
    secretsWithinResetAnimations,
  };
};