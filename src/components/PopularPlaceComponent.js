import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Share,
  StyleSheet,
} from 'react-native';
import { fonts } from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';


const PopularPlaceComponent = ({
  dimensions,
  styles,
  place,
  setIsDetailsOfPlaceVisible,
  setSelectedPlace
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
        // height: '100%',
        alignSelf: 'center',
        padding: dimensions.width * 0.04,
      }}>
        <Image
          source={place.withinImage}
          style={{
            width: '100%',
            height: dimensions.height * 0.12,
            borderRadius: dimensions.width * 0.05,
          }}
          resizeMode="cover"
        />

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: dimensions.height * 0.016,
          justifyContent: 'space-between',
        }}>
          <View style={{
            // width: dimensions.width * 0.4,
            flex: 1,
          }}>
            <Text style={{
              fontSize: dimensions.width * 0.05,
              fontFamily: fonts.poppinsMedium,
              color: '#fff',
              // maxWidth: dimensions.width * 0.4,
              marginRight: dimensions.width * 0.01,
            }} adjustsFontSizeToFit={true} numberOfLines={1}>
              {place.withinTitle}
            </Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: dimensions.height * 0.01,
              justifyContent: 'flex-start',
            }}>
              <Image
                source={require('../assets/icons/coordinatesIcon.png')}
                style={{
                  width: dimensions.height * 0.03,
                  height: dimensions.height * 0.03,
                  marginRight: dimensions.width * 0.016,
                }}
                resizeMode="contain"
              />
              <Text style={{
                fontSize: dimensions.width * 0.037,
                fontFamily: fonts.poppinsMedium,
                color: '#FFC93F',
                maxWidth: dimensions.width * 0.4444,
              }}
                adjustsFontSizeToFit={true}
                numberOfLines={1}

              >
                {place.withinCoordinates.latitude.toFixed(4)}° {place.withinCoordinates.latitude >= 0 ? 'N' : 'S'}, {place.withinCoordinates.longitude.toFixed(4)}° {place.withinCoordinates.longitude >= 0 ? 'E' : 'W'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.goldButtons, {
            width: dimensions.width * 0.28,
            height: dimensions.height * 0.057,
          }]}
            onPress={() => {
              setIsDetailsOfPlaceVisible(place);
            }}
          >
            <LinearGradient
              colors={['#FFC93F', '#FFDD87', '#997926']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.secretGoldGradient}
            />
            <Text style={{
              fontSize: dimensions.width * 0.04,
              fontFamily: fonts.poppinsMedium,
              color: '#000',
            }}>
              Open
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const secretsWithinComponentStyles = (dimensions) => StyleSheet.create({
  placeAndCoordinatesText: {
    fontSize: dimensions.width * 0.045,
    letterSpacing: 1,
    color: '#F1BD60',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fonts.cormorantBold,
    maxWidth: dimensions.width * 0.4,
  }
});

export default PopularPlaceComponent;