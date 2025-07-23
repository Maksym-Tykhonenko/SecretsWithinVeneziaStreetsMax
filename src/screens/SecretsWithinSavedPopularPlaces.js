import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import secretsWithinPlaces from '../assets/secretsWithinData/secretsWithinPlaces';
import { fonts } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedPopularPlaceComponent from '../components/AnimatedPopularPlaceComponent';
import OpenedPopularPlaceComponent from '../components/OpenedPopularPlaceComponent';
import { useSecretsWithinDetailsAnimation } from '../hooks/useSecretsWithinDetailsAnimation';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecretsWithinSavedPopularPlaces = ({ setSecretsWithinPage, mainStyles }) => {
    const dimensions = Dimensions.get('window');
    const styles = secretsWithinStyles(dimensions);

    const [isDetailsOfPlaceVisible, setIsDetailsOfPlaceVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const [secretsWithinSavedPopularPlaces, setSecretsWithinSavedPopularPlaces] = useState([]);

    const loadSavedPlaces = async () => {
        try {
            const savedPlacesString = await AsyncStorage.getItem('secretsWithinSavedPopularPlaces');
            const savedPlaces = savedPlacesString ? JSON.parse(savedPlacesString) : [];

            console.log('Loaded saved places from AsyncStorage:', savedPlaces);
            setSecretsWithinSavedPopularPlaces(savedPlaces);
        } catch (error) {
            console.error('Error loading saved places:', error);
            setSecretsWithinSavedPopularPlaces([]);
        } finally {
        }
    };

    useEffect(() => {
        loadSavedPlaces();
    }, []);

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
        const timer = setTimeout(() => {
            startAnimation();
        }, 100);

        return () => clearTimeout(timer);
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
            setTimeout(() => {
                resetAnimation();
                startAnimation();
            }, 10);
        });
    };

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={mainStyles.mainFlexRowView}>
                <TouchableOpacity style={[styles.goldButtons, mainStyles.backHomeButton]}
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
                        Saved
                    </Text>
                </View>

                <TouchableOpacity style={[mainStyles.backHomeButton, {
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

            {secretsWithinSavedPopularPlaces.length === 0 ? (
                <>
                    <Image
                        source={require('../assets/images/lionImage.png')}
                        style={{
                            width: dimensions.width * 0.5,
                            height: dimensions.width * 0.5,
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.1,
                        }}
                        resizeMode="contain"
                    />

                    <Text style={{
                        fontSize: dimensions.width * 0.05,
                        fontFamily: fonts.poppinsMedium,
                        color: '#fff',
                        textAlign: 'center',
                        marginTop: dimensions.height * 0.023,
                        paddingHorizontal: dimensions.width * 0.04,
                    }}>
                        There are no saved places, {'\n'}check the list!
                    </Text>
                </>
            ) : (
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
                            {secretsWithinSavedPopularPlaces.map((place, index) => (
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
                            savedFromSavedPlaces={secretsWithinSavedPopularPlaces}
                            setSavedFromSavedPlaces={setSecretsWithinSavedPopularPlaces}
                        />
                    </Animated.View>
                )
            )}
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

export default SecretsWithinSavedPopularPlaces;
