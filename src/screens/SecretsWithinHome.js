import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Easing,
  TouchableOpacity,
  Animated,
  Platform,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { fonts } from '../assets/fonts';
import SecretsWithinFactOfVenezia from './SecretsWithinFactOfVenezia';
import SecretsWithinPopularPlaces from './SecretsWithinPopularPlaces';
import LinearGradient from 'react-native-linear-gradient';
import SecretsWithinSavedPopularPlaces from './SecretsWithinSavedPopularPlaces';
import SecretsWithinQuestAndMemory from './SecretsWithinQuestAndMemory';

const secretsWithinTouchables = [
  {
    id: 1,
    secretsWithinTouchableTitle: 'Fact of Venezia',
  },
  {
    id: 2,
    secretsWithinTouchableTitle: 'Popular places',
  },
  {
    id: 3,
    secretsWithinTouchableTitle: 'Quest and memory',
  },
  {
    id: 4,
    secretsWithinTouchableTitle: 'Saved',
  },
];

const SecretsWithinHome = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [secretsWithinPage, setSecretsWithinPage] = useState('Secrets Within Home');
  const styles = secretsWithinStyles(dimensions);
  const pagesTopElementStyles = secretsWithinTopElementStyles(dimensions);

  const secretsWithinFadeAnim = useRef(new Animated.Value(1)).current;
  const secretsWithinSlideAnim = useRef(new Animated.Value(0)).current;
  const secretsWithinScaleAnim = useRef(new Animated.Value(1)).current;
  const secretsWithinOpacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };
    const dimensionListener = Dimensions.addEventListener('change', onChange);
    return () => {
      dimensionListener.remove();
    };
  }, []);

  const secretsWithinTransitionAnimationScreens = (newScreen) => {
    Animated.parallel([
      Animated.timing(secretsWithinFadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(secretsWithinSlideAnim, {
        toValue: -50,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(secretsWithinScaleAnim, {
        toValue: 0.95,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(secretsWithinOpacityAnim, {
        toValue: 0.7,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSecretsWithinPage(newScreen);

      // Reset values for fade in
      secretsWithinFadeAnim.setValue(0);
      secretsWithinSlideAnim.setValue(50);
      secretsWithinScaleAnim.setValue(1.05);
      secretsWithinOpacityAnim.setValue(0.7);

      // Simple fade in transition
      Animated.parallel([
        Animated.timing(secretsWithinFadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(secretsWithinSlideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(secretsWithinScaleAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(secretsWithinOpacityAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const renderSecretsWithinAnimatedScreen = (screen) => {
    return (
      <Animated.View
        style={[
          { flex: 1 },
          {
            opacity: secretsWithinFadeAnim,
            transform: [
              { translateY: secretsWithinSlideAnim },
              { scale: secretsWithinScaleAnim },
            ],
          },
        ]}
      >
        <Animated.View
          style={{
            flex: 1,
            opacity: secretsWithinOpacityAnim,
          }}
        >
          {screen}
        </Animated.View>
      </Animated.View>
    );
  };

  const secretsWithinButtonScaleAnim = useRef(new Animated.Value(1)).current;

  const buttonParticles = useRef(
    Array.from({ length: 35 }, () => ({
      x: new Animated.Value(-dimensions.width * 0.444 + Math.random() * dimensions.width * 0.9),
      y: new Animated.Value(dimensions.height * 0.6 + Math.random() * dimensions.height * 0.35),
      scale: new Animated.Value(0.3 + Math.random() * 0.7),
      opacity: new Animated.Value(0.4 + Math.random() * 0.6),
    }))
  ).current;

  useEffect(() => {
    const animateButtonParticles = () => {
      const particleAnimations = buttonParticles.map((particle, index) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(particle.x, {
              toValue: -dimensions.width * 0.37 + Math.random() * dimensions.width * 0.9,
              duration: 8000 + Math.random() * 4000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.y, {
              toValue: dimensions.height * 0.6 + Math.random() * dimensions.height * 0.35,
              duration: 9000 + Math.random() * 5000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 0.2 + Math.random() * 0.8,
              duration: 5000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0.3 + Math.random() * 0.7,
              duration: 6000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
          ])
        );
      });

      Animated.stagger(150, particleAnimations).start();
    };

    animateButtonParticles();
  }, [dimensions]);

  return (
    <View style={{
      backgroundColor: '#black',
      width: '100%',
      height: dimensions.height,
      flex: 1,
    }}>
      <ImageBackground
        source={secretsWithinPage === 'Secrets Within Home'
          ? require('../assets/images/homeBackground.png')
          : require('../assets/images/screensBg.png')
        }
        style={{
          position: 'absolute',
          height: dimensions.height,
          flex: 1,
          width: dimensions.width,
          bottom: 0, left: 0, top: 0, right: 0,
        }}
        resizeMode="stretch"
      />

      {secretsWithinPage === 'Secrets Within Home' ? (
        renderSecretsWithinAnimatedScreen(
          <View style={{ flex: 1 }}>
            <SafeAreaView style={{
              alignItems: 'center',
              marginTop: Platform.OS === 'android' ? dimensions.height * 0.03 : 0,
              alignSelf: 'center',
              width: dimensions.width * 0.93,
              flex: 1,
            }}>

              <View style={{
                alignSelf: 'center',
                position: 'absolute',
                top: dimensions.height * 0.25,
              }}>
                <Image
                  source={require('../assets/images/messageBg2.png')}
                  style={{
                    width: dimensions.width,
                    height: dimensions.height * 0.34,
                    borderRadius: dimensions.width * 0.1,
                    overflow: 'hidden',
                  }}
                  resizeMode='contain'
                />
                <View style={{
                  position: 'absolute',
                  top: dimensions.height * 0.088,
                  right: dimensions.width * 0.05,
                }}>
                  <Text style={{
                    fontSize: dimensions.width * 0.04,
                    fontFamily: fonts.poppinsMedium,
                    color: '#000',
                    maxWidth: dimensions.width * 0.5,
                  }}>
                    Let's take a look at what we have here, shall we?
                  </Text>
                </View>
              </View>
              
              {buttonParticles.map((particle, index) => (
                <Animated.View
                  key={`home-particle-${index}`}
                  style={{
                    position: 'absolute',
                    width: 6 + Math.random() * 4,
                    height: 6 + Math.random() * 4,
                    borderRadius: 3 + Math.random() * 2,
                    backgroundColor: index % 3 === 0 ? '#FFD700' : index % 3 === 1 ? '#FFA500' : '#FF8C00',
                    shadowColor: '#FFD700',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 8,
                    elevation: 6,
                    transform: [
                      { translateX: particle.x },
                      { translateY: particle.y },
                      { scale: particle.scale },
                    ],
                    opacity: particle.opacity,
                    zIndex: 5,
                  }}
                />
              ))}

              <View style={{
                alignSelf: 'center',
                width: dimensions.width * 0.93,
                position: 'absolute',
                bottom: dimensions.height * 0.05,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {secretsWithinTouchables.map((button, index) => (
                  <TouchableOpacity key={button.id} style={{
                    width: dimensions.width * 0.75,
                    height: dimensions.height * 0.08,
                    borderRadius: dimensions.width * 0.1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: dimensions.width * 0.1,
                    transform: [{ scale: secretsWithinButtonScaleAnim }],
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.7,
                    shadowRadius: 3.84,
                    zIndex: 10,
                    marginBottom: dimensions.height * 0.025,
                  }}
                    onPress={() => {
                      // Button press animation
                      Animated.sequence([
                        Animated.timing(secretsWithinButtonScaleAnim, {
                          toValue: 0.95,
                          duration: 150,
                          useNativeDriver: true,
                        }),
                        Animated.timing(secretsWithinButtonScaleAnim, {
                          toValue: 1,
                          duration: 150,
                          useNativeDriver: true,
                        }),
                      ]).start();

                      secretsWithinTransitionAnimationScreens(button.secretsWithinTouchableTitle);
                    }}
                  >
                    <LinearGradient
                      colors={['#FFC93F', '#FFDD87', '#997926']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 5,
                          height: 5,
                        },
                        shadowOpacity: 0.144,
                        shadowRadius: 10,
                        elevation: 8,
                      }}
                    />
                    <Text style={{
                      fontSize: dimensions.width * 0.05,
                      fontFamily: fonts.poppinsMedium,
                      color: '#000',
                    }}>
                      {button.secretsWithinTouchableTitle}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </SafeAreaView>
          </View>
        )
      ) : secretsWithinPage === 'Popular places' ? (
        renderSecretsWithinAnimatedScreen(
          <SecretsWithinPopularPlaces
            setSecretsWithinPage={secretsWithinTransitionAnimationScreens}
          />
        )
      ) : secretsWithinPage === 'Saved' ? (
        renderSecretsWithinAnimatedScreen(
          <SecretsWithinSavedPopularPlaces
            setSecretsWithinPage={secretsWithinTransitionAnimationScreens}
            mainStyles={pagesTopElementStyles}
          />
        )
      ) : secretsWithinPage === 'Fact of Venezia' ? (
        renderSecretsWithinAnimatedScreen(
          <SecretsWithinFactOfVenezia
            setSecretsWithinPage={secretsWithinTransitionAnimationScreens}
            mainStyles={pagesTopElementStyles}
          />
        )
      ) : secretsWithinPage === 'Quest and memory' ? (
        renderSecretsWithinAnimatedScreen(
          <SecretsWithinQuestAndMemory
            setSecretsWithinPage={secretsWithinTransitionAnimationScreens}
            styles={secretsWithinStyles(dimensions)}
          />
        )
      ) : null}
    </View>
  );
};

const secretsWithinStyles = (dimensions) => StyleSheet.create({

});

const secretsWithinTopElementStyles = (dimensions) => StyleSheet.create({
  mainFlexRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: dimensions.height * 0.07,
    width: dimensions.width,
  },
  backHomeButton: {
    width: dimensions.width * 0.19,
    height: dimensions.height * 0.08,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  secretGoldGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
        width: 5,
        height: 5,
    },
    shadowOpacity: 0.144,
    shadowRadius: 10,
    elevation: 8,
}
});

export default SecretsWithinHome;
