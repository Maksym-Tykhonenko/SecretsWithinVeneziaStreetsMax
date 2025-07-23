import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Dimensions, ImageBackground, TouchableWithoutFeedback, Animated, Image, TouchableOpacity, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../assets/fonts';

const SecretsWithinOnboarding = () => {
    const [screenSize, setScreenSize] = useState(Dimensions.get('window'));
    const navigation = useNavigation();
    
    const [secretsWithinCurrentSlide, setSecretsWithinCurrentSlide] = useState(0);
    
    const secretsWithinSlides = [
        require('../assets/images/secretsOnboardingsImages/onboarding1.png'),
        require('../assets/images/secretsOnboardingsImages/onboarding2.png'),
        require('../assets/images/secretsOnboardingsImages/onboarding3.png'),
    ]

    const secretsWithinOpacityAnim = useRef(new Animated.Value(1)).current;
    const secretsWithinSizeAnim = useRef(new Animated.Value(1)).current;
    const secretsWithinMoveAnim = useRef(new Animated.Value(0)).current;
    const secretsWithinSpinAnim = useRef(new Animated.Value(0)).current;
    const secretsWithinBtnScaleAnim = useRef(new Animated.Value(1)).current;

    // Floating particles animations
    const magicParticles = useRef([
        { x: new Animated.Value(Math.random() * screenSize.width), y: new Animated.Value(Math.random() * screenSize.height * 0.3), scale: new Animated.Value(0.5 + Math.random() * 0.5) },
        { x: new Animated.Value(Math.random() * screenSize.width), y: new Animated.Value(Math.random() * screenSize.height * 0.3), scale: new Animated.Value(0.5 + Math.random() * 0.5) },
        { x: new Animated.Value(Math.random() * screenSize.width), y: new Animated.Value(Math.random() * screenSize.height * 0.3), scale: new Animated.Value(0.5 + Math.random() * 0.5) },
        { x: new Animated.Value(Math.random() * screenSize.width), y: new Animated.Value(Math.random() * screenSize.height * 0.3), scale: new Animated.Value(0.5 + Math.random() * 0.5) },
        { x: new Animated.Value(Math.random() * screenSize.width), y: new Animated.Value(Math.random() * screenSize.height * 0.3), scale: new Animated.Value(0.5 + Math.random() * 0.5) },
        { x: new Animated.Value(Math.random() * screenSize.width), y: new Animated.Value(Math.random() * screenSize.height * 0.3), scale: new Animated.Value(0.5 + Math.random() * 0.5) },
        { x: new Animated.Value(Math.random() * screenSize.width), y: new Animated.Value(Math.random() * screenSize.height * 0.3), scale: new Animated.Value(0.5 + Math.random() * 0.5) },
        { x: new Animated.Value(Math.random() * screenSize.width), y: new Animated.Value(Math.random() * screenSize.height * 0.3), scale: new Animated.Value(0.5 + Math.random() * 0.5) },
    ]).current;

    // Button area particles
    const secretsWithinButtonParticles = useRef([
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
        { x: new Animated.Value(screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8), y: new Animated.Value(screenSize.height * 0.8 + Math.random() * screenSize.height * 0.15), scale: new Animated.Value(0.3 + Math.random() * 0.4) },
    ]).current;

    useEffect(() => {
        const secretsWithinSizeHandler = ({ window }) => {
            setScreenSize(window);
        };
        const secretsWithinListener = Dimensions.addEventListener('change', secretsWithinSizeHandler);
        return () => {
            secretsWithinListener.remove();
        };
    }, []);

    useEffect(() => {
        const secretsWithinAnimateParticles = () => {
            const secretsWithinParticleAnimations = magicParticles.map((particle, index) => {
                return Animated.loop(
                    Animated.sequence([
                        Animated.timing(particle.x, {
                            toValue: Math.random() * screenSize.width,
                            duration: 8000 + Math.random() * 4000,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            useNativeDriver: true,
                        }),
                        Animated.timing(particle.y, {
                            toValue: Math.random() * screenSize.height * 0.4,
                            duration: 6000 + Math.random() * 3000,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            useNativeDriver: true,
                        }),
                        Animated.timing(particle.scale, {
                            toValue: 0.3 + Math.random() * 0.7,
                            duration: 4000 + Math.random() * 2000,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            useNativeDriver: true,
                        }),
                    ])
                );
            });
            
            Animated.stagger(500, secretsWithinParticleAnimations).start();
        };

        const secretsWithinAnimateButtonParticles = () => {
            const secretsWithinBtnAnimations = secretsWithinButtonParticles.map((particle, index) => {
                return Animated.loop(
                    Animated.sequence([
                        Animated.timing(particle.x, {
                            toValue: screenSize.width * 0.1 + Math.random() * screenSize.width * 0.8,
                            duration: 10000 + Math.random() * 5000,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            useNativeDriver: true,
                        }),
                        Animated.timing(particle.y, {
                            toValue: screenSize.height * 0.75 + Math.random() * screenSize.height * 0.2,
                            duration: 8000 + Math.random() * 4000,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            useNativeDriver: true,
                        }),
                        Animated.timing(particle.scale, {
                            toValue: 0.2 + Math.random() * 0.5,
                            duration: 6000 + Math.random() * 3000,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            useNativeDriver: true,
                        }),
                    ])
                );
            });
            
            Animated.stagger(700, secretsWithinBtnAnimations).start();
        };

        secretsWithinAnimateParticles();
        secretsWithinAnimateButtonParticles();
    }, [screenSize]);

    const secretsWithinHandlePress = () => {
        Animated.sequence([
            Animated.timing(secretsWithinBtnScaleAnim, {
                toValue: 0.92,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(secretsWithinBtnScaleAnim, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }),
        ]).start();

        if (secretsWithinCurrentSlide < secretsWithinSlides.length - 1) {
            Animated.parallel([
                Animated.timing(secretsWithinOpacityAnim, {
                    toValue: 0,
                    duration: 350,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(secretsWithinSizeAnim, {
                    toValue: 0.7,
                    duration: 350,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(secretsWithinMoveAnim, {
                    toValue: screenSize.width,
                    duration: 450,
                    easing: Easing.inOut(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(secretsWithinSpinAnim, {
                    toValue: 0.8,
                    duration: 350,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setSecretsWithinCurrentSlide(secretsWithinCurrentSlide + 1);
                secretsWithinOpacityAnim.setValue(0);
                secretsWithinSizeAnim.setValue(0.7);
                secretsWithinMoveAnim.setValue(-screenSize.width);
                secretsWithinSpinAnim.setValue(0);

                Animated.parallel([
                    Animated.timing(secretsWithinOpacityAnim, {
                        toValue: 1,
                        duration: 450,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(secretsWithinSizeAnim, {
                        toValue: 1,
                        duration: 450,
                        easing: Easing.out(Easing.back(1.2)),
                        useNativeDriver: true,
                    }),
                    Animated.timing(secretsWithinMoveAnim, {
                        toValue: 0,
                        duration: 550,
                        easing: Easing.inOut(Easing.cubic),
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        } else {
            Animated.parallel([
                Animated.timing(secretsWithinOpacityAnim, {
                    toValue: 0,
                    duration: 1400,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(secretsWithinSizeAnim, {
                    toValue: 0.05,
                    duration: 1400,
                    easing: Easing.inOut(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(secretsWithinSpinAnim, {
                    toValue: 20,
                    duration: 1400,
                    easing: Easing.inOut(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                navigation.replace('SecretsWithinHome');
            });
        }
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'black',
        }}>
            <ImageBackground
                source={secretsWithinSlides[secretsWithinCurrentSlide]}
                style={{
                    position: 'absolute',
                    width: screenSize.width,
                    height: screenSize.height,
                    flex: 1,
                    bottom: 0, left: 0, top: 0, right: 0,
                }}
                resizeMode="cover"
            />

            {magicParticles.map((particle, index) => (
                <Animated.View
                    key={index}
                    style={{
                        position: 'absolute',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#FFD700',
                        shadowColor: '#FFA500',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 6,
                        elevation: 5,
                        transform: [
                            { translateX: particle.x },
                            { translateY: particle.y },
                            { scale: particle.scale },
                        ],
                        opacity: 0.7,
                    }}
                />
            ))}

            {secretsWithinButtonParticles.map((particle, index) => (
                <Animated.View
                    key={`button-${index}`}
                    style={{
                        position: 'absolute',
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#FFA500',
                        shadowColor: '#FFD700',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.9,
                        shadowRadius: 4,
                        elevation: 3,
                        transform: [
                            { translateX: particle.x },
                            { translateY: particle.y },
                            { scale: particle.scale },
                        ],
                        opacity: 0.6,
                        zIndex: 5,
                    }}
                />
            ))}

            <TouchableOpacity
                onPress={secretsWithinHandlePress}
                style={{
                    width: screenSize.width * 0.8,
                    height: screenSize.height * 0.1,
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: screenSize.height * 0.05,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: screenSize.width * 0.1,
                    transform: [{ scale: secretsWithinBtnScaleAnim }],
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.7,
                    shadowRadius: 3.84,
                    zIndex: 10,
                }}>
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
                    fontSize: screenSize.width * 0.055,
                    color: '#000',
                    textAlign: 'center',
                    zIndex: 1,
                    fontFamily: fonts.poppinsMedium,
                    fontWeight: '600',
                }}>
                    {secretsWithinCurrentSlide === 0 ? 'Start'
                        : secretsWithinCurrentSlide === 1 ?
                            'Continue'
                            : 'Ok, lets GO'
                    }
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SecretsWithinOnboarding;