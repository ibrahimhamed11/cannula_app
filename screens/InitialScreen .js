// InitialScreen.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkDoctorVerification } from '../api/registerApi'; // Assuming the API function is in this file
import { useNavigation } from '@react-navigation/native';

const InitialScreen = ({  }) => {
    const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIdAndVerification = async () => {
      try {

        const passwordsetstat = await AsyncStorage.getItem('passwordSetStat');


        if(passwordsetstat=="done")
            {
                navigation.navigate('Main');

            }
        
        const doctorId = await AsyncStorage.getItem('doctorId');
        // console.log(doctorId)
        if (doctorId) {
          const response = await checkDoctorVerification(doctorId);
          if (response.status == 200&&!passwordsetstat ) {
            const token = response.data.completeAccountToken;
            await AsyncStorage.setItem('token', token);

            navigation.navigate('ConfirmPassword');

          } else if(response.status==401) {
            navigation.navigate('Main'); 
          }
        } else {
            navigation.navigate('Register'); 
        }
      } catch (error) {
        console.error('Error during initial check:', error);
        console.log(error)
        Alert.alert('Error', 'An error occurred. Please try again.');
          navigation.navigate('Register');
      } finally {
        setLoading(false);
      }
    };

    checkIdAndVerification();
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
};

export default InitialScreen;
