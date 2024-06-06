import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader'; 

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    I18nManager.forceRTL(true);
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <CustomHeader isVisible={true} /> 
      <View style={styles.content}>
        <Image 
          source={require('../assets/home/clock.png')} 
          style={styles.logo}
        />
        <Text style={styles.imageText}>عند الموافقه علي طلبك سيتم التواصل معك وبعدها تستطيع ممارسة عملك كطبيب علي كانيولا.</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('OtpScreen')}>
            <Text style={styles.buttonText}>otp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('Register')}>
            <Text style={styles.buttonText}>التسجيل</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('Profile')}>
            <Text style={styles.buttonText}>الملف</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('Prices')}>
            <Text style={styles.buttonText}> الاسعار</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('ConfirmPassword')}>
            <Text style={styles.buttonText}> كلمة مرور</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('Appointment')}>
            <Text style={styles.buttonText}> المواعيد</Text>
          </TouchableOpacity>
        </View>

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
    opacity: 0.3,
  },
  imageText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#9F9A9A',
    fontFamily:'Droid'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#4cb6d3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily:'Droid'

  },
});

export default Home;
