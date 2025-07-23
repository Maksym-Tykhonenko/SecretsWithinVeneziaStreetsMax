import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import { fonts } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuestExperienceComponent = ({
    dimensions,
    styles,
    place,
    onBack,
    onCompleteQuest,
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [impressionText, setImpressionText] = useState('');

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel || response.error) {
                return;
            }

            if (response.assets && response.assets[0]) {
                setSelectedImage(response.assets[0]);
            }
        });
    };

    const handleCompleteQuest = async () => {
        if (!selectedImage || !impressionText.trim()) {
            Alert.alert('Error', 'Please add both photo and impression before completing the quest.');
            return;
        }

        try {
            const questData = {
                id: place.id,
                photo: selectedImage,
                impression: impressionText,
                completedAt: new Date().toISOString(),
            };

            await AsyncStorage.setItem(`quest_${place.id}`, JSON.stringify(questData));
            onCompleteQuest(place.id);
            onBack();
        } catch (error) {
            console.error('Error saving quest data:', error);
        }
    };

    const characterCount = impressionText.length;
    const maxCharacters = 200;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: dimensions.width * 0.05,
                    paddingBottom: dimensions.height * 0.1,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Quest Card */}
                <View style={{
                    width: '100%',
                    marginTop: dimensions.height * 0.02,
                    borderRadius: dimensions.width * 0.05,
                    overflow: 'hidden',
                }}>
                    <LinearGradient
                        colors={['#1F1F1F', '#2C2C2C', '#000000']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={[styles.secretGoldGradient, {
                            width: '100%',
                        }]}
                    />
                    <View style={{
                        width: '100%',
                        alignSelf: 'center',
                        padding: dimensions.width * 0.04,
                    }}>
                        <View style={{
                            marginBottom: dimensions.height * 0.02,
                        }}>
                            <Text style={{
                                fontSize: dimensions.width * 0.048,
                                fontFamily: fonts.poppinsRegular,
                                color: '#fff',
                                marginBottom: dimensions.height * 0.01,
                            }}>
                                Quest {place.id}
                            </Text>
                            <View style={{
                                height: 2,
                                backgroundColor: '#FFC93F',
                                width: '100%',
                            }} />
                        </View>

                        <Text style={{
                            fontSize: dimensions.width * 0.052,
                            fontFamily: fonts.poppinsBold,
                            color: '#fff',
                            marginBottom: dimensions.height * 0.01,
                        }}>
                            {place.withinQuestTitle}
                        </Text>

                        <View style={{
                            marginBottom: dimensions.height * 0.025,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                marginBottom: dimensions.height * 0.01,
                            }}>
                                <Text style={{
                                    fontSize: dimensions.width * 0.032,
                                    fontFamily: fonts.poppinsMedium,
                                    color: '#fff',
                                    marginRight: dimensions.width * 0.02,
                                }}>
                                    •
                                </Text>
                                <Text style={{
                                    fontSize: dimensions.width * 0.032,
                                    fontFamily: fonts.poppinsRegular,
                                    color: '#fff',
                                    flex: 1,
                                }}>
                                    {place.withinQuestWhatToDo}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                            }}>
                                <Text style={{
                                    fontSize: dimensions.width * 0.032,
                                    fontFamily: fonts.poppinsMedium,
                                    color: '#fff',
                                    marginRight: dimensions.width * 0.02,
                                }}>
                                    •
                                </Text>
                                <Text style={{
                                    fontSize: dimensions.width * 0.032,
                                    fontFamily: fonts.poppinsRegular,
                                    color: '#fff',
                                    flex: 1,
                                }}>
                                    Add your impressions
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Photo Section */}
                <View style={{
                    width: '100%',
                    marginTop: dimensions.height * 0.025,
                    borderRadius: dimensions.width * 0.05,
                    overflow: 'hidden',
                }}>
                    <LinearGradient
                        colors={['#1F1F1F', '#2C2C2C', '#000000']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={[styles.secretGoldGradient, {
                            width: '100%',
                        }]}
                    />
                    <View style={{
                        padding: dimensions.width * 0.04,
                    }}>
                        <Text style={{
                            fontSize: dimensions.width * 0.048,
                            fontFamily: fonts.poppinsBold,
                            color: '#fff',
                            textAlign: 'center',
                            marginBottom: dimensions.height * 0.015,
                        }}>
                            Photo:
                        </Text>

                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: dimensions.height * 0.152,
                                backgroundColor: selectedImage ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                                borderRadius: dimensions.width * 0.05,
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                            }}
                            onPress={handleImagePicker}
                        >
                            {selectedImage ? (
                                <Image
                                    source={{ uri: selectedImage.uri }}
                                    style={{
                                        width: '100%',
                                        height: dimensions.height * 0.152,
                                        borderRadius: dimensions.width * 0.05,
                                    }}
                                />
                            ) : (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        source={require('../assets/icons/cameraIcon.png')}
                                        style={{
                                            width: dimensions.width * 0.15,
                                            height: dimensions.width * 0.15,
                                        }}
                                    />
                                    <Text style={{
                                        fontSize: dimensions.width * 0.037,
                                        fontFamily: fonts.poppinsMedium,
                                        marginLeft: dimensions.width * 0.025,
                                        color: '#FFC93F',
                                    }}>
                                        Add photo
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        padding: dimensions.width * 0.04,
                    }}>
                        <Text style={{
                            fontSize: dimensions.width * 0.048,
                            fontFamily: fonts.poppinsBold,
                            color: '#fff',
                            textAlign: 'center',
                            marginBottom: dimensions.height * 0.015,
                        }}>
                            Impression:
                        </Text>

                        <TextInput
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: dimensions.width * 0.03,
                                padding: dimensions.width * 0.035,
                                color: '#fff',
                                fontSize: dimensions.width * 0.032,
                                fontFamily: fonts.poppinsRegular,
                                height: dimensions.height * 0.12,
                                textAlignVertical: 'top',
                            }}
                            placeholder="I was here today, and I really..."
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            multiline
                            value={impressionText}
                            onChangeText={setImpressionText}
                            maxLength={maxCharacters}
                        />

                        <Text style={{
                            fontSize: dimensions.width * 0.028,
                            fontFamily: fonts.poppinsRegular,
                            color: 'rgba(255, 255, 255, 0.5)',
                            textAlign: 'right',
                            marginTop: dimensions.height * 0.008,
                        }}>
                            {characterCount}/{maxCharacters}
                        </Text>
                    </View>

                    {/* Complete Quest Button */}
                    {selectedImage && impressionText.trim() && (
                        <TouchableOpacity
                            style={{
                                width: '92%',
                                height: dimensions.height * 0.073,
                                alignSelf: 'center',
                                borderRadius: dimensions.width * 0.08,
                                overflow: 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: dimensions.height * 0.016,
                                marginBottom: dimensions.width * 0.04,
                            }}
                            onPress={handleCompleteQuest}
                        >
                            <LinearGradient
                                colors={['#FFC93F', '#FFDD87', '#997926']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                            <Text style={{
                                fontSize: dimensions.width * 0.045,
                                fontFamily: fonts.poppinsMedium,
                                color: '#000',
                            }}>
                                Complete the quest!
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default QuestExperienceComponent;
