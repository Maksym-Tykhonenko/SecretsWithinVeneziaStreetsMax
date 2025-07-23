import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Share,
  StyleSheet,
  Linking,
} from 'react-native';
import { fonts } from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { ScrollView } from 'react-native-gesture-handler';
import { BookmarkIcon as SecretsSavedIcon } from 'react-native-heroicons/solid';

const OpenedPopularPlaceComponent = ({
  dimensions,
  styles,
  selectedPlace,
  setIsDetailsOfPlaceVisible,
  setSelectedPlace,
  savedFromSavedPlaces,
  setSavedFromSavedPlaces
}) => {

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('OpenedPopularPlaceComponent selectedPlace:', selectedPlace);
    if (selectedPlace) {
      console.log('selectedPlace.withinCoordinates:', selectedPlace.withinCoordinates);
      checkIfSaved();
    }
  }, [selectedPlace]);

  const checkIfSaved = async () => {
    try {
      setIsLoading(true);
      const savedPlacesString = await AsyncStorage.getItem('secretsWithinSavedPopularPlaces');
      const savedPlaces = savedPlacesString ? JSON.parse(savedPlacesString) : [];

      const isPlaceSaved = savedPlaces.some(place => place.id === selectedPlace.id);
      setIsSaved(isPlaceSaved);
    } catch (error) {
      console.error('Error checking if place is saved:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToggle = async () => {
    try {
      const savedPlacesString = await AsyncStorage.getItem('secretsWithinSavedPopularPlaces');
      let savedPlaces = savedPlacesString ? JSON.parse(savedPlacesString) : [];

      if (isSaved) {
        // Видаляємо місце зі збережених
        savedPlaces = savedPlaces.filter(place => place.id !== selectedPlace.id);

        if (savedFromSavedPlaces)
          setSavedFromSavedPlaces(savedPlaces);

        setIsSaved(false);
        console.log('Place removed from saved:', selectedPlace.withinTitle);
      } else {
        // Додаємо місце до збережених
        savedPlaces.unshift(selectedPlace);

        if (savedFromSavedPlaces)
          setSavedFromSavedPlaces(savedPlaces);

        setIsSaved(true);
        console.log('Place saved:', selectedPlace.withinTitle);
      }

      await AsyncStorage.setItem('secretsWithinSavedPopularPlaces', JSON.stringify(savedPlaces));
    } catch (error) {
      console.error('Error saving/removing place:', error);
    }
  };

  if (!selectedPlace) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{
      marginTop: dimensions.height * 0.023,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        width: dimensions.width * 0.91,
      }}>
        <TouchableOpacity onPress={() => {
          setIsDetailsOfPlaceVisible();
        }}>
          <ArrowLeftIcon size={dimensions.width * 0.07} color='white' />
        </TouchableOpacity>

        <Text style={{
          fontSize: dimensions.width * 0.061,
          fontFamily: fonts.poppinsMedium,
          color: '#fff',
          marginLeft: dimensions.width * 0.03,
        }} adjustsFontSizeToFit={true} numberOfLines={1}>
          {selectedPlace.withinTitle || 'Unknown Place'}
        </Text>
      </View>

      <ScrollView style={{
        alignSelf: 'center',
        width: dimensions.width
      }} showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingBottom: dimensions.height * 0.3543,
      }}>
        <View style={{
          alignSelf: 'center',
          width: dimensions.width * 0.91,
        }}>
          <Image
            source={selectedPlace.withinImage || require('../assets/images/withinPlacesImages/withinPlace1.png')}
            style={{
              width: '100%',
              height: dimensions.height * 0.25,
              borderRadius: dimensions.width * 0.05,
              marginTop: dimensions.height * 0.02,
            }}
            resizeMode="cover"
          />

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: dimensions.height * 0.02341,
            justifyContent: 'center',
          }}>
            <Image
              source={require('../assets/icons/coordinatesIcon.png')}
              style={{
                width: dimensions.width * 0.05,
                height: dimensions.width * 0.05,
                marginRight: dimensions.width * 0.02,
              }}
              resizeMode="contain"
            />
            <Text style={{
              fontSize: dimensions.width * 0.043,
              fontFamily: fonts.poppinsMedium,
              color: '#FFC93F',
            }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {selectedPlace.withinCoordinates && selectedPlace.withinCoordinates.latitude && selectedPlace.withinCoordinates.longitude
                ? `${selectedPlace.withinCoordinates.latitude.toFixed(4)}° ${selectedPlace.withinCoordinates.latitude >= 0 ? 'N' : 'S'}, ${selectedPlace.withinCoordinates.longitude.toFixed(4)}° ${selectedPlace.withinCoordinates.longitude >= 0 ? 'E' : 'W'}`
                : 'No coordinates available'
              }
            </Text>
          </View>

          <Text style={{
            fontSize: dimensions.width * 0.037,
            fontFamily: fonts.poppinsMedium,
            color: 'white',
            textAlign: 'center',
            lineHeight: dimensions.width * 0.055,
          }}>
            {selectedPlace.withinDescription || 'No description available'}
          </Text>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: dimensions.height * 0.02341,
          }}>
            <TouchableOpacity style={[styles.goldButtons, {
              width: dimensions.width * 0.3,
              height: dimensions.height * 0.059,
            }]}
              onPress={() => {
                const coordinates = selectedPlace.withinCoordinates;
                const shareMessage = `Check out this popular place in Venice: ${selectedPlace.withinTitle || 'Unknown'}.\n${coordinates && coordinates.latitude && coordinates.longitude ? `Coordinates: ${coordinates.latitude.toFixed(4)}° ${coordinates.latitude >= 0 ? 'N' : 'S'}, ${coordinates.longitude.toFixed(4)}° ${coordinates.longitude >= 0 ? 'E' : 'W'}` : 'No coordinates available'}\n\nExplore more at Secrets Within Venezia!`;
                Share.share({
                  message: shareMessage,
                });
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
                Share
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.goldButtons, {
              width: dimensions.width * 0.3,
              height: dimensions.height * 0.059,
            }]}
              onPress={() => {
                const coordinates = selectedPlace.withinCoordinates;
                if (coordinates && coordinates.latitude && coordinates.longitude) {
                  const lat = coordinates.latitude;
                  const lng = coordinates.longitude;
                  Linking.openURL(selectedPlace.veneziaPlaceOnMap);
                }
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
                View map
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.goldButtons, {
              width: dimensions.width * 0.21,
              height: dimensions.height * 0.059,
              opacity: isLoading ? 0.5 : 1,
            }]}
              onPress={handleSaveToggle}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#FFC93F', '#FFDD87', '#997926']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.secretGoldGradient}
              />
              <SecretsSavedIcon
                size={dimensions.width * 0.07}
                color={isSaved ? '#000' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const secretsWithinComponentStyles = (dimensions) => StyleSheet.create({
});

export default OpenedPopularPlaceComponent;