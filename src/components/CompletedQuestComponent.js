import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { fonts } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';

const CompletedQuestComponent = ({
    dimensions,
    styles,
    place,
    questData,
    onShare,
    onDelete,
}) => {
    return (
        <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            marginTop: dimensions.height * 0.017,
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
                {/* Quest Header */}
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

                {/* Quest Title */}
                <Text style={{
                    fontSize: dimensions.width * 0.052,
                    fontFamily: fonts.poppinsBold,
                    color: '#fff',
                    marginBottom: dimensions.height * 0.01,
                }}>
                    {place.withinQuestTitle}
                </Text>

                {/* Quest Instructions */}
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

                {/* Photo */}
                {questData.photo && (
                    <Image
                        source={{ uri: questData.photo.uri }}
                        style={{
                            width: '100%',
                            height: dimensions.height * 0.152,
                            borderRadius: dimensions.width * 0.05,
                            marginBottom: dimensions.height * 0.02,
                        }}
                    />
                )}

                {/* Impression */}
                <View style={{
                    marginBottom: dimensions.height * 0.025,
                }}>
                    <Text style={{
                        fontSize: dimensions.width * 0.045,
                        fontFamily: fonts.poppinsBold,
                        color: '#fff',
                        marginBottom: dimensions.height * 0.015,
                    }}>
                        Impression:
                    </Text>
                    <Text style={{
                        fontSize: dimensions.width * 0.035,
                        fontFamily: fonts.poppinsRegular,
                        color: '#fff',
                        lineHeight: dimensions.width * 0.045,
                    }}>
                        {questData.impression}
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            width: dimensions.width * 0.4,
                            height: dimensions.height * 0.065,
                            borderRadius: dimensions.width * 0.08,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: dimensions.width * 0.04,
                        }}
                        onPress={() => onShare(questData)}
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
                            Share
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: dimensions.width * 0.15,
                            height: dimensions.height * 0.065,
                            borderRadius: dimensions.width * 0.075,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => onDelete(place.id)}
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
                        <Image
                            source={require('../assets/icons/deleteIcon.png')}
                            style={{
                                width: dimensions.width * 0.06,
                                height: dimensions.width * 0.06,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CompletedQuestComponent;
