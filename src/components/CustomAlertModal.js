import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { fonts } from '../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';

const CustomAlertModal = ({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  confirmStyle = 'destructive',
}) => {
  const dimensions = Dimensions.get('window');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleCancel = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onCancel();
    });
  };

  const handleConfirm = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onConfirm();
    });
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleCancel}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={handleCancel}
        />
        
        <Animated.View
          style={[
            styles.alertContainer,
            {
              width: dimensions.width * 0.85,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#1F1F1F', '#2C2C2C', '#000000']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradientBackground}
          />
          
          {/* Golden border */}
          <View style={styles.goldBorder} />
          
          {/* Content */}
          <View style={styles.contentContainer}>
            {/* Title */}
            <Text style={[styles.title, { fontSize: dimensions.width * 0.055 }]}>
              {title}
            </Text>
            
            {/* Divider */}
            <View style={styles.divider} />
            
            {/* Message */}
            <Text style={[styles.message, { fontSize: dimensions.width * 0.04 }]}>
              {message}
            </Text>
            
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.cancelButton,
                  { width: dimensions.width * 0.3 }
                ]}
                onPress={handleCancel}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                />
                <Text style={[styles.buttonText, { fontSize: dimensions.width * 0.042 }]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
              
              {/* Confirm Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.confirmButton,
                  { width: dimensions.width * 0.3 }
                ]}
                onPress={handleConfirm}
              >
                <LinearGradient
                  colors={
                    confirmStyle === 'destructive'
                      ? ['#FF4757', '#FF3838', '#C0392B']
                      : ['#FFC93F', '#FFDD87', '#997926']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                />
                <Text style={[
                  styles.buttonText,
                  { 
                    fontSize: dimensions.width * 0.042,
                    color: confirmStyle === 'destructive' ? '#fff' : '#000'
                  }
                ]}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  goldBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FFC93F',
  },
  contentContainer: {
    padding: 25,
  },
  title: {
    fontFamily: fonts.poppinsBold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 2,
    backgroundColor: '#FFC93F',
    marginBottom: 20,
    borderRadius: 1,
  },
  message: {
    fontFamily: fonts.poppinsRegular,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonText: {
    fontFamily: fonts.poppinsMedium,
    fontWeight: '600',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.58)',
  },
  confirmButton: {
    // Additional styles if needed
  },
});

export default CustomAlertModal;
