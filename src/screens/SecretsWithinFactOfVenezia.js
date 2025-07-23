import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    Text,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    Share,
} from 'react-native';
import secretsWithinPlaces from '../assets/secretsWithinData/secretsWithinPlaces';
import { fonts } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { useSecretsWithinDetailsAnimation } from '../hooks/useSecretsWithinDetailsAnimation';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';

import secretsWithinFactsOfVenezia from '../assets/secretsWithinData/secretsWithinFactsOfVenezia';

const SecretsWithinFactOfVenezia = ({ setSecretsWithinPage }) => {
    const dimensions = Dimensions.get('window');
    const styles = secretsWithinStyles(dimensions);

    const [showCompactFactCard, setShowCompactFactCard] = useState(false);
    const [showFullFactCard, setShowFullFactCard] = useState(false);
    const [currentFact, setCurrentFact] = useState(secretsWithinFactsOfVenezia[Math.floor(Math.random() * secretsWithinFactsOfVenezia.length)]);
    const [usedFactIds, setUsedFactIds] = useState([]);

    const womanOpacity = useRef(new Animated.Value(0)).current;

    // Анімація для compact fact card
    const compactFactCardOpacity = useRef(new Animated.Value(0)).current;
    const compactFactCardTranslateY = useRef(new Animated.Value(50)).current;
    const compactFactCardScale = useRef(new Animated.Value(0.8)).current;

    // Анімація для full fact card
    const fullFactCardOpacity = useRef(new Animated.Value(0)).current;
    const fullFactCardTranslateY = useRef(new Animated.Value(50)).current;
    const fullFactCardScale = useRef(new Animated.Value(0.8)).current;

    // Анімація для кульок навколо кнопок
    const buttonBalls = useRef([]);

    const {
        secretsWithinResetAnimations,
    } = useSecretsWithinDetailsAnimation();

    const {
        resetAnimation,
    } = useStaggeredAnimation(secretsWithinPlaces.length, 200);

    // Створюємо кульки навколо кнопок
    const createButtonBalls = () => {
        const balls = [];
        for (let i = 0; i < 6; i++) {
            balls.push({
                rotate: new Animated.Value(0),
                opacity: new Animated.Value(0.3 + Math.random() * 0.4),
                scale: new Animated.Value(0.5 + Math.random() * 0.5),
            });
        }
        buttonBalls.current = balls;
    };

    // Запускаємо анімацію кульок навколо кнопок
    const startButtonBallsAnimation = () => {
        buttonBalls.current.forEach((ball, index) => {
            const animateBall = () => {
                ball.rotate.setValue(0);
                
                Animated.timing(ball.rotate, {
                    toValue: 1,
                    duration: 4000 + Math.random() * 2000,
                    useNativeDriver: true,
                }).start(() => {
                    animateBall();
                });
            };
            
            // Затримка для кожної кульки
            setTimeout(() => animateBall(), index * 500);
        });
    };

    useEffect(() => {
        secretsWithinResetAnimations();
        resetAnimation();
        
        // Створюємо та запускаємо анімацію кульок
        createButtonBalls();
        startButtonBallsAnimation();

        // Додаємо початковий факт до використаних
        setUsedFactIds([currentFact.id]);

        // Показуємо жінку та компактний fact card одночасно
        setShowCompactFactCard(true);

        Animated.parallel([
            Animated.timing(womanOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(compactFactCardOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(compactFactCardTranslateY, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(compactFactCardScale, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Через 2.5 секунди ховаємо жінку та компактний fact card
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(womanOpacity, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(compactFactCardOpacity, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(compactFactCardTranslateY, {
                        toValue: -50,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(compactFactCardScale, {
                        toValue: 0.8,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    // Повністю ховаємо компактний fact card
                    setShowCompactFactCard(false);

                    // Показуємо повний fact card
                    setShowFullFactCard(true);
                    setTimeout(() => {
                        Animated.parallel([
                            Animated.timing(fullFactCardOpacity, {
                                toValue: 1,
                                duration: 600,
                                useNativeDriver: true,
                            }),
                            Animated.timing(fullFactCardTranslateY, {
                                toValue: 0,
                                duration: 600,
                                useNativeDriver: true,
                            }),
                            Animated.timing(fullFactCardScale, {
                                toValue: 1,
                                duration: 600,
                                useNativeDriver: true,
                            }),
                        ]).start();
                    }, 100);
                });
            }, 2500);
        });
    }, []);

    const handleNewFact = () => {
        // Спочатку ховаємо поточний факт
        Animated.parallel([
            Animated.timing(fullFactCardOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fullFactCardScale, {
                toValue: 0.8,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Отримуємо неіспользані факти
            const availableFacts = secretsWithinFactsOfVenezia.filter(fact => !usedFactIds.includes(fact.id));

            // Якщо всі факти використано, очищаємо масив
            if (availableFacts.length === 0) {
                setUsedFactIds([]);
                const randomFact = secretsWithinFactsOfVenezia[Math.floor(Math.random() * secretsWithinFactsOfVenezia.length)];
                setCurrentFact(randomFact);
                setUsedFactIds([randomFact.id]);
            } else {
                // Вибираємо випадковий факт із доступних
                const randomFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
                setCurrentFact(randomFact);
                setUsedFactIds(prev => [...prev, randomFact.id]);
            }

            // Після зміни факту показуємо новий з анімацією
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fullFactCardOpacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fullFactCardScale, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 50);
        });
    };

    const handleShare = () => {
        Share.share({
            message: `Venice Fact: ${currentFact.withinFact}\n\nExplore more at Secrets Within Venezia!`,
        });
    };

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
                zIndex: 10,
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
                        fontSize: dimensions.width * 0.046,
                        fontFamily: fonts.poppinsMedium,
                        color: '#000',
                    }}>
                        Fact of Venezia
                    </Text>
                </View>

                <TouchableOpacity style={[styles.goldButtons, {
                    width: dimensions.width * 0.19,
                    height: dimensions.height * 0.08,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    opacity: 0
                }]} disabled={true}>
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

            {/* Компактний fact card - показується з жінкою */}
            {showCompactFactCard && (
                <Animated.View style={{
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.04,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: dimensions.width * 0.9,
                    opacity: compactFactCardOpacity,
                    transform: [
                        { translateY: compactFactCardTranslateY },
                        { scale: compactFactCardScale },
                    ],
                    zIndex: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Image
                            source={require('../assets/images/newsImage.png')}
                            style={{
                                width: dimensions.width * 0.3,
                                height: dimensions.width * 0.3,
                            }}
                            resizeMode="contain"
                        />

                        <Text style={{
                            fontSize: dimensions.width * 0.04,
                            fontFamily: fonts.poppinsMedium,
                            color: 'white',
                            textAlign: 'left',
                            flex: 1,
                            marginLeft: dimensions.width * 0.03,
                        }}>
                            {currentFact.withinFact}
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: dimensions.height * 0.03534,
                    }}>
                        <TouchableOpacity style={[styles.goldButtons, {
                            marginHorizontal: dimensions.width * 0.023,
                            width: dimensions.width * 0.43,
                            height: dimensions.height * 0.07,
                        }]}
                            onPress={handleNewFact}
                        >
                            <LinearGradient
                                colors={['#FFC93F', '#FFDD87', '#997926']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.secretGoldGradient}
                            />
                            <Text style={{
                                fontSize: dimensions.width * 0.046,
                                fontFamily: fonts.poppinsMedium,
                                color: '#000',
                            }}>
                                New fact
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.goldButtons, {
                            marginHorizontal: dimensions.width * 0.023,
                            width: dimensions.width * 0.43,
                            height: dimensions.height * 0.07,
                        }]}
                            onPress={handleShare}
                        >
                            <LinearGradient
                                colors={['#FFC93F', '#FFDD87', '#997926']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.secretGoldGradient}
                            />
                            <Text style={{
                                fontSize: dimensions.width * 0.046,
                                fontFamily: fonts.poppinsMedium,
                                color: '#000',
                            }}>
                                Share
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            {/* Повний fact card - показується після зникнення жінки */}
            {showFullFactCard && (
                <Animated.View style={{
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.04,
                    alignItems: 'center',
                    width: dimensions.width * 0.9,
                    opacity: fullFactCardOpacity,
                    transform: [
                        { translateY: fullFactCardTranslateY },
                        { scale: fullFactCardScale },
                    ],
                    zIndex: 10,
                }}>
                    <Image
                        source={require('../assets/images/newsImage.png')}
                        style={{
                            width: dimensions.width * 0.62,
                            height: dimensions.width * 0.62,
                        }}
                        resizeMode="contain"
                    />

                    <Text style={{
                        fontSize: dimensions.width * 0.048,
                        fontFamily: fonts.poppinsMedium,
                        color: 'white',
                        textAlign: 'center',
                        marginTop: dimensions.height * 0.023,
                        paddingHorizontal: dimensions.width * 0.03,
                    }}>
                        {currentFact.withinFact}
                    </Text>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}>
                        {/* Кульки навколо кнопок */}
                        {buttonBalls.current.map((ball, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    position: 'absolute',
                                    width: 8,
                                    height: 8,
                                    backgroundColor: '#FFC93F',
                                    borderRadius: 4,
                                    opacity: ball.opacity,
                                    transform: [
                                        { scale: ball.scale },
                                        {
                                            rotate: ball.rotate.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [`${index * 60}deg`, `${(index * 60) + 360}deg`],
                                            }),
                                        },
                                        { translateX: 120 },
                                        { translateY: 0 },
                                    ],
                                }}
                            />
                        ))}

                        <TouchableOpacity style={[styles.goldButtons, {
                            marginHorizontal: dimensions.width * 0.023,
                            width: dimensions.width * 0.5,
                            height: dimensions.height * 0.07,
                            marginTop: dimensions.height * 0.03534,
                        }]}
                            onPress={handleNewFact}
                        >
                            <LinearGradient
                                colors={['#FFC93F', '#FFDD87', '#997926']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.secretGoldGradient}
                            />
                            <Text style={{
                                fontSize: dimensions.width * 0.046,
                                fontFamily: fonts.poppinsMedium,
                                color: '#000',
                            }}>
                                New fact
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.goldButtons, {
                            marginHorizontal: dimensions.width * 0.023,
                            width: dimensions.width * 0.4,
                            height: dimensions.height * 0.07,
                            marginTop: dimensions.height * 0.03,
                        }]}
                            onPress={handleShare}
                        >
                            <LinearGradient
                                colors={['#FFC93F', '#FFDD87', '#997926']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.secretGoldGradient}
                            />
                            <Text style={{
                                fontSize: dimensions.width * 0.046,
                                fontFamily: fonts.poppinsMedium,
                                color: '#000',
                            }}>
                                Share
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            <Animated.View
                style={{
                    opacity: womanOpacity,
                    position: 'absolute',
                    bottom: -dimensions.height * 0.1,
                    alignSelf: 'center',
                    zIndex: 5,
                }}
            >
                <Image
                    source={require('../assets/images/factOfVeneziaWomenImage.png')}
                    style={{
                        width: dimensions.width * 1.52,
                        height: dimensions.width * 1.52,
                        left: -dimensions.width * 0.05,
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

export default SecretsWithinFactOfVenezia;
