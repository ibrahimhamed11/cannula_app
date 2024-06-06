import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, I18nManager } from 'react-native';
import CustomButton from '../components/CustomButton ';
import CustomTextInput from '../components/CustomTextInput'; // Import your custom text input component
import { postPassword } from '../api/registerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModalAlert from '../components/CustomModalAlert';
import { useNavigation } from '@react-navigation/native';

const ConfirmPassword = () => {
    const navigation = useNavigation();

  useEffect(() => {
    // Force RTL direction
    I18nManager.forceRTL(true);
  }, []);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [token, setToken] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const handleSuccess = () => {
    setSuccess(true);
    setModalVisible(true);
    setAlertMsg('تم تعيين كلمة المرور بنجاح');

  };
  
  const handleError = () => {
    setSuccess(false);
    setModalVisible(true);


  };




  const validatePassword = (password) => {
    if (!password) {
      return 'يجب إدخال كلمة المرور';
    } else if (password.length < 8) {
      return 'يجب أن تكون كلمة المرور على الأقل 8 أحرف';
    } else if (!/\d/.test(password)) {
      return 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل';
    } else if (!/[A-Z]/.test(password)) {
      return 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل';
    } else if (!/[a-z]/.test(password)) {
      return 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل';
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      return 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل';
    }
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


  const handleNextPress = async () => {
    const passwordError = validatePassword(password);
    const confirmPasswordError = confirmPassword !== password ? 'كلمة المرور غير متطابقة' : '';

    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (passwordError || confirmPasswordError) {
      setShowErrors(true);
      return;
    }

    try {
      const response = await postPassword(token, password);

      console.log(response.status)

      if(response.status==200){
        await AsyncStorage.setItem('passwordSetStat', 'done');

        handleSuccess();
        navigation.navigate('Prices');



      }
      else{
        setAlertMsg(response.data.msg)
         handleError();


      }


    } catch (error) {
      console.error('Error posting password:', error.message);

    }
  };




  const handlePasswordChange = (text) => {
    setPassword(text);
    setShowErrors(false); 

  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setShowErrors(false); // Hide errors when typing
  };



  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>اكمال انشاء الحساب</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

      <CustomModalAlert
          visible={modalVisible}
          setVisible={setModalVisible}
          type={success ? 'success' : 'error'}
          message={alertMsg}
          buttonText={success ? "الاسعار" : "الرجوع"}
          navigationTarget={success ? 'Prices' : null}
        />

        <CustomTextInput
          label="كلمة المرور"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
          errorMessage={showErrors ? passwordError : ''}
          style={styles.input}
          validateOnSubmit={false} // Disable validation on submit
        />


        <CustomTextInput
          label="تأكيد كلمة المرور"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={true}
          errorMessage={showErrors ? confirmPasswordError : ''}
          style={styles.input}
          validateOnSubmit={false} // Disable validation on submit
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
  },
  passwordStrength: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Droid',
  },
});

export default ConfirmPassword;
