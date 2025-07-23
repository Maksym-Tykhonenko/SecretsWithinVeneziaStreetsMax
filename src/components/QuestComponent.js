import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { fonts } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';


const QuestComponent = ({
  dimensions,
  styles,
  place,
  setIsDetailsOfPlaceVisible,
}) => {

  return (
    <View key={place.id} style={{
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

        {/* Add Experience Button */}
        <TouchableOpacity style={{
          width: '100%',
          height: dimensions.height * 0.065,
          borderRadius: dimensions.width * 0.08,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onPress={() => {
            setIsDetailsOfPlaceVisible(place);
          }}
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
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: dimensions.width * 0.06,
              fontFamily: fonts.poppinsMedium,
              color: '#000',
              marginRight: dimensions.width * 0.02,
            }}>
              +
            </Text>
            <Text style={{
              fontSize: dimensions.width * 0.045,
              fontFamily: fonts.poppinsMedium,
              color: '#000',
            }}>
              Add an experience
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const secretsWithinComponentStyles = (dimensions) => StyleSheet.create({
});

export default QuestComponent;