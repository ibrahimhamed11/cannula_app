import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import CustomModalAlert from '../components/CustomModalAlert'; // Import CustomModalAlert
import { confirmOtp } from '../api/registerApi';
const OtpScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false); // State for error modal visibility
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [successModalVisible, setSuccessModalVisible] = useState(false); // State for success modal visibility
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    const loadPhoneNumber = async () => {
      try {
        const savedPhoneNumber = await AsyncStorage.getItem('phone');
        if (savedPhoneNumber) {
          setPhoneNumber(savedPhoneNumber);
        }
      } catch (error) {
        console.error('Failed to load phone number from storage', error);
      }
    };

    loadPhoneNumber();
  }, []);

  const handleOtpSubmit = async () => {
    if (!phoneNumber || !otp) {
      setError('هذا الحقل مطلوب ادخاله');
      return;
    }
  
  
    try {
      const response = await confirmOtp({ phoneNumber: phoneNumber, otp });
  
  
      if (response.status === 200 && response.data && response.data.id) {
        // Set the ID in AsyncStorage
        await AsyncStorage.setItem('doctorId', response.data.id);
        navigation.navigate('Main');

  
        // Continue with your navigation logic
        setSuccessMessage('تم تأكيد OTP بنجاح!');
        setSuccessModalVisible(true);
      } else {


        setErrorMessage(response.data.msg);
        setErrorModalVisible(true);
      }

    } catch (error) {
      setErrorMessage(response.data.msg);
      setErrorModalVisible(true);
      console.error('Error confirming OTP:', error); 
      setErrorModalVisible(true);
    }
  };
  

  const handleModalButtonPress = () => {
    setErrorModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>تأكيد OTP</Text>
        <Image 
          source={require('../assets/otp/auth.png')} // Ensure the path is correct
          style={styles.logo}
        />
        <Text style={styles.phoneNumberText}>{`ادخل الرمز الذي تم ارساله الي رقم الهاتف `}</Text>
        <Text style={styles.phoneNumberText}>{`${phoneNumber}`}</Text>

        <CustomTextInput
          label="OTP"
          value={otp}
          onChangeText={setOtp}
          style={styles.textInput}
          errorMessage={error && !otp ? error : ''}
        />
        <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
          <Text style={styles.buttonText}>إرسال OTP</Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <CustomModalAlert
          visible={successModalVisible}
          setVisible={setSuccessModalVisible}
          type="success"
          message={successMessage}
          buttonText="الرئيسيه"
          onButtonPress={handleModalButtonPress}
          navigationTarget="Main"
        />

        {/* Error Modal */}
        <CustomModalAlert
          visible={errorModalVisible}
          setVisible={setErrorModalVisible}
          type="error"
          message={errorMessage}
          buttonText="OK"
          onButtonPress={handleModalButtonPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Droid',
  },
  phoneNumberText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontFamily: 'Droid',

  },
  textInput: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4cb6d3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Droid',
  },
  logo: {
    width: 160, 
    height: 160, 
    marginBottom: 20, 
opacity:0.8
  },


});

export default OtpScreen;
