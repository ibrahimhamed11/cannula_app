// screens/Home.js

import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image,  I18nManager, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader'; 

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    I18nManager.forceRTL(true);
  }, []);


  return (
    <View style={styles.container}>
      <CustomHeader isVisible={true} /> 
      <View style={styles.content}>
        <Image 
          source={require('../assets/home/clock.png')} // Ensure the path is correct
          style={styles.logo}
        />
        <Text style={styles.imageText}>عند الموافقه علي طلبك سيتم التواصل معك وبعدها تستطيع ممارسة عملك كطبيب علي كانيولا.</Text>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
  },
  content: {
    flex: 1, // Take remaining space
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Add padding to separate header from content
  },
  customText: {
    fontFamily: 'Droid',
  },
  logo: {
    width: 140, // Adjust width as needed
    height: 140, // Adjust height as needed
    marginBottom: 20, // Add some margin below the image
opacity:0.3
  },
  imageText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Droid',
    marginBottom: 20, // Add some margin below the text
    color:'#9F9A9A'
  },
});

export default Home;
