import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Share,
    Dimensions,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import secretsWithinQuests from '../assets/secretsWithinData/secretsWithinQuests';
import { fonts } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import OpenedPopularPlaceComponent from '../components/OpenedPopularPlaceComponent';
import { useSecretsWithinDetailsAnimation } from '../hooks/useSecretsWithinDetailsAnimation';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';
import AnimatedQuestComponent from '../components/AnimatedQuestComponent';
import QuestExperienceComponent from '../components/QuestExperienceComponent';
import CompletedQuestComponent from '../components/CompletedQuestComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlertModal from '../components/CustomAlertModal';

const SecretsWithinQuestAndMemory = ({ setSecretsWithinPage }) => {
    const dimensions = Dimensions.get('window');
    const styles = secretsWithinStyles(dimensions);

    const [isDetailsOfPlaceVisible, setIsDetailsOfPlaceVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showPlaces, setShowPlaces] = useState(false);
    const [questsCategoryNow, setQuestsCategoryNow] = useState('All Quest');
    const [showQuestExperience, setShowQuestExperience] = useState(false);
    const [selectedQuestForExperience, setSelectedQuestForExperience] = useState(null);
    const [completedQuests, setCompletedQuests] = useState([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [questToDelete, setQuestToDelete] = useState(null);
    const [isChangingCategory, setIsChangingCategory] = useState(false);

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
    } = useStaggeredAnimation(secretsWithinQuests.length, 200);

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

    useEffect(() => {
        loadCompletedQuests();
    }, []);

    const loadCompletedQuests = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const questKeys = keys.filter(key => key.startsWith('quest_'));
            const completedData = await AsyncStorage.multiGet(questKeys);
            const completed = completedData.map(([key, value]) => JSON.parse(value));
            setCompletedQuests(completed);
        } catch (error) {
            console.error('Error loading completed quests:', error);
        }
    };

    const handleOpenQuestExperience = (place) => {
        setSelectedQuestForExperience(place);
        setShowQuestExperience(true);
    };

    const handleBackFromExperience = () => {
        setShowQuestExperience(false);
        setSelectedQuestForExperience(null);
        
        // Reset and restart the staggered animation for all quests
        resetAnimation();
        setTimeout(() => {
            startAnimation();
        }, 100);
    };

    const handleCompleteQuest = (questId) => {
        loadCompletedQuests();
        setQuestsCategoryNow('Completed');
    };

    const handleShareQuest = async (questData) => {
        try {
            await Share.share({
                message: `I completed a quest: ${secretsWithinQuests[questData.id - 1].withinQuestTitle}\n\nMy impression: ${questData.impression}`,
                title: 'Quest Completed',
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleDeleteQuest = (questId) => {
        setQuestToDelete(questId);
        setShowDeleteAlert(true);
    };

    const confirmDeleteQuest = async () => {
        try {
            await AsyncStorage.removeItem(`quest_${questToDelete}`);
            loadCompletedQuests();
            setShowDeleteAlert(false);
            setQuestToDelete(null);
        } catch (error) {
            console.error('Error deleting quest:', error);
            setShowDeleteAlert(false);
            setQuestToDelete(null);
        }
    };

    const cancelDeleteQuest = () => {
        setShowDeleteAlert(false);
        setQuestToDelete(null);
    };

    const getFilteredQuests = () => {
        if (questsCategoryNow === 'Completed') {
            return secretsWithinQuests.filter(quest => 
                completedQuests.some(completed => completed.id === quest.id)
            );
        } else {
            // Show all quests in "All Quest" category
            return secretsWithinQuests;
        }
    };

    const getCompletedQuestData = (questId) => {
        return completedQuests.find(quest => quest.id === questId);
    };

    const handleCategoryChange = (newCategory) => {
        if (newCategory === questsCategoryNow) return;
        
        setIsChangingCategory(true);
        
        // Fade out current list
        Animated.timing(secretsWithinListOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            // Change category
            setQuestsCategoryNow(newCategory);
            resetAnimation();
            
            // Small delay then fade in new list
            setTimeout(() => {
                Animated.timing(secretsWithinListOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setIsChangingCategory(false);
                    // Start staggered animation for quest items
                    setTimeout(() => {
                        startAnimation();
                    }, 100);
                });
            }, 100);
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
            }}>
                <TouchableOpacity style={[styles.goldButtons, {
                    width: dimensions.width * 0.19,
                    height: dimensions.height * 0.08,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }]}
                    onPress={() => {
                        if (showQuestExperience) {
                            handleBackFromExperience();
                        } else {
                            setSecretsWithinPage('Secrets Within Home');
                        }
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
                        {showQuestExperience ? 'My impressions' : 'Quest and memory'}
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

            {!showQuestExperience && (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: dimensions.height * 0.035,
                    marginBottom: dimensions.height * 0.021,
                    alignSelf: 'center',
                }}>
                    {['All Quest', 'Completed'].map((title, index) => (
                        <TouchableOpacity 
                            style={[styles.goldButtons, {
                                marginHorizontal: dimensions.width * 0.023,
                                width: dimensions.width * 0.35,
                                height: dimensions.height * 0.068,
                            }]} 
                            key={index} 
                            onPress={() => handleCategoryChange(title)}
                            disabled={isChangingCategory}
                        >
                            {questsCategoryNow === title && (
                                <LinearGradient
                                    colors={['#FFC93F', '#FFDD87', '#997926']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.secretGoldGradient}
                                />
                            )}
                            <Text style={{
                                fontSize: dimensions.width * 0.043,
                                fontFamily: fonts.poppinsMedium,
                                color: questsCategoryNow === title ? '#000' : 'white',
                            }}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {showPlaces && (
                !isDetailsOfPlaceVisible && !showQuestExperience ? (
                    <Animated.View
                        style={{
                            flex: 1,
                            opacity: secretsWithinListOpacity,
                            transform: [{ scale: secretsWithinListScale }],
                        }}
                    >
                        {questsCategoryNow === 'Completed' && getFilteredQuests().length === 0 ? (
                            <View style={{ flex: 1 }}>
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
                                    There are no completed quests!
                                </Text>
                            </View>
                        ) : (
                            <ScrollView style={{
                            }} contentContainerStyle={{
                                paddingBottom: dimensions.height * 0.1,
                                zIndex: 10
                            }} showsVerticalScrollIndicator={false} >
                                {getFilteredQuests().map((place, index) => {
                                    const isCompleted = completedQuests.some(completed => completed.id === place.id);
                                    const questData = getCompletedQuestData(place.id);

                                    return (isCompleted && questsCategoryNow === 'Completed') || (isCompleted && questsCategoryNow === 'All Quest') ? (
                                        <Animated.View
                                            key={place.id}
                                            style={{
                                                opacity: animatedValues[index]?.opacity || 0,
                                                transform: [
                                                    { translateY: animatedValues[index]?.translateY || 50 },
                                                    { scale: animatedValues[index]?.scale || 0.8 },
                                                ],
                                            }}
                                        >
                                            <CompletedQuestComponent
                                                place={place}
                                                questData={questData}
                                                dimensions={dimensions}
                                                styles={styles}
                                                onShare={handleShareQuest}
                                                onDelete={handleDeleteQuest}
                                            />
                                        </Animated.View>
                                    ) : (
                                        <AnimatedQuestComponent
                                            key={place.id}
                                            place={place}
                                            dimensions={dimensions}
                                            styles={styles}
                                            setIsDetailsOfPlaceVisible={handleOpenQuestExperience}
                                            setSelectedPlace={setSelectedPlace}
                                            animatedValue={animatedValues[index]}
                                            index={index}
                                        />
                                    );
                                })}
                            </ScrollView>
                        )}
                    </Animated.View>
                ) : showQuestExperience ? (
                    <QuestExperienceComponent
                        dimensions={dimensions}
                        styles={styles}
                        place={selectedQuestForExperience}
                        onBack={handleBackFromExperience}
                        onCompleteQuest={handleCompleteQuest}
                    />
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
                    source={require('../assets/images/questAndMemoryWomenImage.png')}
                    style={{
                        width: dimensions.width * 1.6,
                        height: dimensions.width * 1.6,

                    }}
                    resizeMode="contain"
                />
            </Animated.View>

            <CustomAlertModal
                visible={showDeleteAlert}
                title="Delete Quest"
                message="Are you sure you want to delete this quest? This action cannot be undone."
                onCancel={cancelDeleteQuest}
                onConfirm={confirmDeleteQuest}
                cancelText="Cancel"
                confirmText="Delete"
                confirmStyle="destructive"
            />
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

export default SecretsWithinQuestAndMemory;
