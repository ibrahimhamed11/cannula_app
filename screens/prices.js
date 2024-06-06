import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, I18nManager, Alert } from 'react-native';
import CustomButton from '../components/CustomButton ';
import CustomTextInput from '../components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { postDoctorPrices } from '../api/registerApi';
const Prices = () => {

  const navigation = useNavigation();

  useEffect(() => {
    I18nManager.forceRTL(true);
  }, []);

  const [clinicPrice, setClinicPrice] = useState('');
  const [homeVisitPrice, setHomeVisitPrice] = useState('');
  const [clinicPriceError, setClinicPriceError] = useState('');
  const [homeVisitPriceError, setHomeVisitPriceError] = useState('');
  const [token, setToken] = useState('');

  const validatePrice = (price) => {
    if (!price) {
      return 'هذا الحقل مطلوب';
    } else if (isNaN(price)) {
      return 'يجب أن يحتوي السعر على أرقام فقط';
    }
    return '';
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching token from storage:', error.message);
      }
    };

    fetchToken();
  }, []);

  const handleClinicPriceChange = (text) => {
    setClinicPrice(text);
    setClinicPriceError(validatePrice(text));
  };

  const handleHomeVisitPriceChange = (text) => {
    setHomeVisitPrice(text);
    setHomeVisitPriceError(validatePrice(text));
  };

  const handleNextPress = async () => {
    const clinicPriceError = validatePrice(clinicPrice);
    const homeVisitPriceError = validatePrice(homeVisitPrice);

    setClinicPriceError(clinicPriceError);
    setHomeVisitPriceError(homeVisitPriceError);

    if (clinicPriceError || homeVisitPriceError) {
      return;
    }

    try {
      const pricesData = {
        inClinic: parseFloat(clinicPrice), // Assuming the prices are in numbers
        atHome: parseFloat(homeVisitPrice),
      };
      Alert.alert('Prices Posted', 'Prices have been successfully posted.');

      setTimeout(() => {
        navigation.navigate('Appointment');
      }, 2000);

      
      // await postDoctorPrices(pricesData,token); 

    
    } catch (error) {
      console.error('Error posting prices:', error.message);
      Alert.alert('Error', 'An error occurred while submitting prices. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> سعر الكشف</Text>
      <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
        <CustomTextInput
          label=" الكشف في العيادة"
          value={clinicPrice}
          onChangeText={handleClinicPriceChange}
          keyboardType="numeric"
          errorMessage={clinicPriceError}
          style={styles.input}
          validateOnSubmit={false} 
          prices={true}
        />

        <CustomTextInput
          label=" الكشف المنزلي"
          value={homeVisitPrice}
          onChangeText={handleHomeVisitPriceChange}
          keyboardType="numeric"
          errorMessage={homeVisitPriceError}
          style={styles.input}
          validateOnSubmit={false} 
          prices={true}

        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton title="التالي" onPress={handleNextPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'DroidBold',
    marginTop: '5%',
  },
  input: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: '10%',
    alignItems: 'center',
  },
});

export default Prices;
