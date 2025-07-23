import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    View,
    Text,
    Dimensions,
    Animated,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import secretsWithinPlaces from '../assets/secretsWithinData/secretsWithinPlaces';
import { fonts } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedPopularPlaceComponent from '../components/AnimatedPopularPlaceComponent';
import OpenedPopularPlaceComponent from '../components/OpenedPopularPlaceComponent';
import { useSecretsWithinDetailsAnimation } from '../hooks/useSecretsWithinDetailsAnimation';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';

const SecretsWithinPopularPlaces = ({ setSecretsWithinPage }) => {
    const dimensions = Dimensions.get('window');
    const styles = secretsWithinStyles(dimensions);

    const [isDetailsOfPlaceVisible, setIsDetailsOfPlaceVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showPlaces, setShowPlaces] = useState(false);

    const womanOpacity = useRef(new Animated.Value(0)).current;

    const {
        secretsWithinDetailsOpacity,
        secretsWithinDetailsScale,
        secretsWithinDetailsSlide,
        secretsWithinListOpacity,
        secretsWithinListScale,
        secretsWithinOpenDetailsAnimation,
        secretsWithinCloseDetailsAnimation,
        secretsWithinResetAnimations,
    } = useSecretsWithinDetailsAnimation();

    const {
        animatedValues,
        startAnimation,
        resetAnimation,
    } = useStaggeredAnimation(secretsWithinPlaces.length, 200);

    useEffect(() => {
        secretsWithinResetAnimations();
        resetAnimation();

        Animated.timing(womanOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(womanOpacity, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }).start(() => {
                    setShowPlaces(true);
                    setTimeout(() => {
                        startAnimation();
                    }, 100);
                });
            }, 2500);
        });
    }, []);

    const handleOpenDetails = (place) => {
        console.log('handleOpenDetails called with place:', place);
        if (place && place.withinCoordinates) {
            console.log('Place coordinates:', place.withinCoordinates);
            secretsWithinOpenDetailsAnimation(() => {
                setSelectedPlace(place);
                setIsDetailsOfPlaceVisible(true);
            });
        } else {
            console.error('Place or coordinates are missing:', place);
        }
    };

    const handleCloseDetails = () => {
        secretsWithinCloseDetailsAnimation(() => {
            setIsDetailsOfPlaceVisible(false);
            setSelectedPlace(null);
            // Перезапускаємо анімацію списку після закриття деталей
            setTimeout(() => {
                resetAnimation();
                startAnimation();
            }, 100);
        });
    };

    useEffect(() => {
        console.log('Selected Place:', selectedPlace);
    }, [selectedPlace]);

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: dimensions.height * 0.07,
                width: dimensions.width,
            }}>
                <TouchableOpacity style={[styles.goldButtons, {
                    width: dimensions.width * 0.19,
                    height: dimensions.height * 0.08,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }]}
                    onPress={() => {
                        setSecretsWithinPage('Secrets Within Home')
                    }}
                >
                    <LinearGradient
                        colors={['#FFC93F', '#FFDD87', '#997926']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.secretGoldGradient}
                    />
                    <Image
                        source={require('../assets/icons/homeIcon.png')}
                        style={{
                            width: dimensions.width * 0.0888,
                            height: dimensions.width * 0.0888,
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <View style={[styles.goldButtons, {
                    marginHorizontal: dimensions.width * 0.023,
                    flex: 1,
                    height: dimensions.height * 0.08,
                }]}>
                    <LinearGradient
                        colors={['#FFC93F', '#FFDD87', '#997926']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.secretGoldGradient}
                    />
                    <Text style={{
                        fontSize: dimensions.width * 0.05,
                        fontFamily: fonts.poppinsMedium,
                        color: '#000',
                    }}>
                        Popular places
                    </Text>
                </View>

                <TouchableOpacity style={[styles.goldButtons, {
                    width: dimensions.width * 0.19,
                    height: dimensions.height * 0.08,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    opacity: 0
                }]} disabled={true}
                    onPress={() => {
                        setSecretsWithinPage('Secrets Within Home')
                    }}
                >
                    <LinearGradient
                        colors={['#FFC93F', '#FFDD87', '#997926']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.secretGoldGradient}
                    />
                    <Image
                        source={require('../assets/icons/homeIcon.png')}
                        style={{
                            width: dimensions.width * 0.0888,
                            height: dimensions.width * 0.0888,
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {showPlaces && (
                !isDetailsOfPlaceVisible ? (
                    <Animated.View
                        style={{
                            flex: 1,
                            opacity: secretsWithinListOpacity,
                            transform: [{ scale: secretsWithinListScale }],
                        }}
                    >
                        <ScrollView style={{
                        }} contentContainerStyle={{
                            paddingBottom: dimensions.height * 0.1,
                            zIndex: 10
                        }} showsVerticalScrollIndicator={false} >
                            {secretsWithinPlaces.map((place, index) => (
                                <AnimatedPopularPlaceComponent
                                    key={place.id}
                                    place={place}
                                    dimensions={dimensions}
                                    styles={styles}
                                    setIsDetailsOfPlaceVisible={handleOpenDetails}
                                    setSelectedPlace={setSelectedPlace}
                                    animatedValue={animatedValues[index]}
                                    index={index}
                                />
                            ))}
                        </ScrollView>
                    </Animated.View>
                ) : (
                    <Animated.View
                        style={{
                            flex: 1,
                            opacity: secretsWithinDetailsOpacity,
                            transform: [
                                { scale: secretsWithinDetailsScale },
                                { translateY: secretsWithinDetailsSlide },
                            ],
                        }}
                    >
                        <OpenedPopularPlaceComponent
                            dimensions={dimensions}
                            styles={styles}
                            selectedPlace={selectedPlace}
                            setIsDetailsOfPlaceVisible={handleCloseDetails}
                            setSelectedPlace={setSelectedPlace}
                        />
                    </Animated.View>
                )
            )}

            <Animated.View
                style={{
                    opacity: womanOpacity,
                    position: 'absolute',
                    bottom: -dimensions.height * 0.1,
                    alignSelf: 'center',
                    zIndex: -1,
                }}
            >
                <Image
                    source={require('../assets/images/placesWomenImage.png')}
                    style={{
                        width: dimensions.width * 1.4,
                        height: dimensions.width * 1.4,

                    }}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );
};

const secretsWithinStyles = (dimensions) => StyleSheet.create({
    goldButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: dimensions.width * 0.1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        zIndex: 10,
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

export default SecretsWithinPopularPlaces;
