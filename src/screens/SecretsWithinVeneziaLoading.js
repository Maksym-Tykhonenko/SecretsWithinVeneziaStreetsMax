import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Dimensions,
  Animated,
  ImageBackground,
  Image,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loadUserData } from '../redux/userSlice';
import { UserContext } from '../context/UserContext';
import SecretsWithinVeneziaLoadingBar from '../components/SecretsWithinVeneziaLoadingBar';

const SecretsWithinVeneziaLoading = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const dimensions = Dimensions.get('window');

  const [isSecretsWithinLoadedUser, setIsSecretsWithinLoadedUser] =
    useState(false);
  const [
    isIsSecretsWithinLoadedOnboarding,
    setIsSecretsWithinLoadedOnboarding,
  ] = useState(false);

  // Simple professional exit animations
  const secretsWithinFadeOut = useRef(new Animated.Value(1)).current;
  const secretsWithinScaleDown = useRef(new Animated.Value(1)).current;
  const secretsWithinSlideUp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const secretsWithinUserLoading = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const isSecretsWithinUserLoadBefY = await AsyncStorage.getItem(
          'isSecretsWithinUserLoadBefY',
        );
        const storedSecretsWithinUser = await AsyncStorage.getItem(storageKey);

        if (storedSecretsWithinUser) {
          setUser(JSON.parse(storedSecretsWithinUser));
          setIsSecretsWithinLoadedUser(false);
        } else if (isSecretsWithinUserLoadBefY) {
          setIsSecretsWithinLoadedUser(false);
        } else {
          setIsSecretsWithinLoadedUser(true);
          await AsyncStorage.setItem('isSecretsWithinUserLoadBefY', 'true');
        }
      } catch (error) {
        console.error('Secrets Within Venezia error: ', error);
      } finally {
        setIsSecretsWithinLoadedOnboarding(true);
      }
    };

    secretsWithinUserLoading();
  }, [setUser]);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    if (isIsSecretsWithinLoadedOnboarding) {
      const secretsWithinExitTimer = setTimeout(() => {
        // Simple professional exit animation
        Animated.parallel([
          Animated.timing(secretsWithinFadeOut, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(secretsWithinScaleDown, {
            toValue: 0.95,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(secretsWithinSlideUp, {
            toValue: -50,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }, 7500);

      return () => clearTimeout(secretsWithinExitTimer);
    }
  }, [
    isIsSecretsWithinLoadedOnboarding,
    isSecretsWithinLoadedUser,
    navigation,
  ]);
  {
    /**() => {
          const secretsWithinNavigateTo = isSecretsWithinLoadedUser ? 'SecretsWithinOnboarding' : 'SecretsWithinHome';
          navigation.replace(secretsWithinNavigateTo);
        } */
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: dimensions.width,
          height: dimensions.height,
          opacity: secretsWithinFadeOut,
          transform: [
            { scale: secretsWithinScaleDown },
            { translateY: secretsWithinSlideUp },
          ],
        }}
      >
        <ImageBackground
          source={require('../assets/images/loadingVeneziaBg.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.View
        style={{
          alignSelf: 'center',
          opacity: secretsWithinFadeOut,
          transform: [
            { scale: secretsWithinScaleDown },
            { translateY: secretsWithinSlideUp },
          ],
        }}
      >
        <SecretsWithinVeneziaLoadingBar />
      </Animated.View>
    </View>
  );
};

export default SecretsWithinVeneziaLoading;
