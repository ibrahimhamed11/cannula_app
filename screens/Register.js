import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  I18nManager, 

} from 'react-native';

import CustomTextInput from '../components/CustomTextInput';
import CustomPicker from '../components/CustomPicker ';
import Background from '../components/Background';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton ';
import * as ImagePicker from 'react-native-image-picker';
//image icons
import HomeIcon from '../assets/register/home.png';
import ClinicIcon from '../assets/register/clinic.png';
import file from '../assets/register/file.png';
import imageupload from '../assets/register/image.png';
import {
  validateName,
  validateEmail,
  validateMobile,
  validateSpecialty,
  validateProvince,
  validateArea,
  validateAdrress
} from '../utils/registerValidation'; 
import { postDoctorData ,getAllSpecializations,getAllGovernorates,getAllCities ,postProfileImage} from '../api/registerApi';

import CustomModalAlert from '../components/CustomModalAlert';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [address, setAddress] = useState('');
  const [availability, setAvailability] = useState([]);
  const [inClinic, setInClinic] = useState(false);
  const [atHome, setAtHome] = useState(false); 
  const [errors, setErrors] = useState([
    {field: 'firstName', error: ''},
    {field: 'lastName', error: ''},
    {field: 'specialty', error: ''},
    {field: 'mobile', error: ''},
    {field: 'email', error: ''},
    {field: 'province', error: ''},
    {field: 'area', error: ''},
    {field: 'address', error: ''},
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSelectedText, setFileSelectedText] = useState('اختر ملف لتحميله');
  const [fileSelectedColor, setFileSelectedColor] = useState('#b3b2b2');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setModalVisible(true);
  };

  const handleError = () => {
    setSuccess(false);
    setModalVisible(true);
  };

  useEffect(() => {
    I18nManager.forceRTL(true);
  }, []);


  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
    };
  
    ImagePicker.launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          console.log('Image URI:', selectedImage.uri);
          setSelectedImage(selectedImage.uri);
  
          try {
            const profileImageResponse = await postProfileImage(selectedImage);
            console.log('Profile Image Response:', profileImageResponse);
            console.log('selected image api  :',profileImageResponse.image)
            setSelectedImage(profileImageResponse.image);

  
            // Now that the profile image is uploaded, proceed to post doctor data
          } catch (error) {
            console.error('Error uploading profile image:', error);
          }
        }
      }
    });
  };
  
  const handleFileUpload = () => {
    const options = {
      mediaType: 'mixed',
      maxWidth: 800,
      maxHeight: 600,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User canceled file picker');
      } else if (response.errorCode) {
        console.error('FilePicker Error:', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const selectedFile = response.assets[0];
          console.log('Selected File:', selectedFile);
          setSelectedFile(selectedFile); // Update state with selected file
          setFileSelectedText('تم تحديد ملف');
          setFileSelectedColor('#4cb6d3');
        }
      }
    });
  };
  const handleDeleteFile = () => {
    setSelectedFile(null); // Clear the selected file
    setFileSelectedText('اختر ملف لتحميله');
    setFileSelectedColor('#b3b2b2');
  };
  const toggleAvailability = option => {
    if (availability.includes(option)) {
      const updatedAvailability = availability.filter(item => item !== option);
      setAvailability(updatedAvailability);
      if (option === 'clinic') {
        setInClinic(false); // Set to false if clinic is unchecked
      } else if (option === 'home') {
        setAtHome(false); // Set to false if home is unchecked
      }
    } else if (availability.length < 2) {
      setAvailability([...availability, option]);
      if (option === 'clinic') {
        setInClinic(true); // Set to true if clinic is checked
      } else if (option === 'home') {
        setAtHome(true); // Set to true if home is checked
      }
    } else {
      Alert.alert('Error', 'You can only select up to two options.');
    }
  };
  const handleSubmit = () => {
    let isValid = true;
    setIsSubmitted(true);

    // Validate first name
    const firstNameError = validateName(firstName);
    if (firstNameError) {
      setErrors(prevErrors =>
        prevErrors.map(errorObj =>
          errorObj.field === 'firstName'
            ? {...errorObj, error: firstNameError}
            : errorObj,
        ),
      );
      isValid = false;
    }


    const lastNameError = validateName(lastName);
    if (lastNameError) {
      setErrors(prevErrors =>
        prevErrors.map(errorObj =>
          errorObj.field === 'lastName'
            ? {...errorObj, error: lastNameError}
            : errorObj,
        ),
      );
      isValid = false;
    }

    const phoneError = validateMobile(mobile);
    if (phoneError) {
      setErrors(prevErrors =>
        prevErrors.map(errorObj =>
          errorObj.field === 'mobile'
            ? {...errorObj, error: phoneError}
            : errorObj,
        ),
      );
      isValid = false;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      setErrors(prevErrors =>
        prevErrors.map(errorObj =>
          errorObj.field === 'email'
            ? {...errorObj, error: emailError}
            : errorObj,
        ),
      );
      isValid = false;
    }

    const addressError = validateAdrress(address);
    if (addressError) {
      setErrors(prevErrors =>
        prevErrors.map(errorObj =>
          errorObj.field === 'address'
            ? {...errorObj, error: addressError}
            : errorObj,
        ),
      );
      isValid = false;
    }

    if (isValid && specialty !== '' && province !== '' && selectedCity !== '') {
      console.log('Input values:', {
        firstName,
        lastName,
        specialty,
        mobile,
        email,
        province,
        selectedCity,
        address,
        availability,
      });
      handlePostData();
      resetForm();
      setErrors(prevErrors =>
        prevErrors.map(errorObj => ({...errorObj, error: ''})),
      );
    } else {
      console.log('Form has validation errors. Please correct them.');
    }
  };

  const handleInputChange = (text, fieldName) => {
    setErrors(prevErrors =>
      prevErrors.map(errorObj =>
        errorObj.field === fieldName ? {...errorObj, error: ''} : errorObj,
      ),
    );

    switch (fieldName) {
      case 'firstName':
        setFirstName(text);
        break;
      case 'lastName':
        setLastName(text);
        break;
      case 'specialty':
        setSpecialty(text);
        break;
      case 'mobile':
        setMobile(text);
        break;
      case 'email':
        setEmail(text);
        break;
      case 'province':
        setProvince(text);
        break;
      case 'area':
        setArea(text);
        break;
      case 'address':
        setAddress(text);
        break;
      default:
        break;
    }
  };

  const handlePostData = async () => {
    try {

      const doctorData = {
        name: firstName + ' ' + lastName,
        image: selectedImage
        ? selectedImage
        : "https://cannula-frontend-task.s3.eu-west-1.wasabisys.com/profiles/1707304577124_image.png",
        specialization: specialty,
        governorate: province,
        city: selectedCity,
        address: address,
        syndicateId: "https://cannula-frontend-task.s3.eu-west-1.wasabisys.com/syndicateIds/1707304915483_image.png",
        nationalId: "https://cannula-frontend-task.s3.eu-west-1.wasabisys.com/nationalIds/1707304739773_image.png",
        certificate: "https://cannula-frontend-task.s3.eu-west-1.wasabisys.com/certificates/1707304849320_image.png",
        phoneNumber: "+2" + mobile, 
        email: email,
        inClinic: inClinic,
        atHome: atHome,
        pushToken: "catonkeyboard"
      };
  
      const res = await postDoctorData(doctorData);
      if(res.status==200)
        {
          handleSuccess();


        }
        else
        {
          handleError();

        }
      console.log(res);
    } catch (error) {
      console.error('Failed to post doctor data:', error);
    }
  };




  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const data = await getAllSpecializations();
        setSpecializations(data.specializations); 
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };

    fetchSpecializations();
  }, []);


  
  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        const data = await getAllGovernorates();
        setGovernorates(data);
      } catch (error) {
        console.error('Error fetching governorates:', error);
      }
    };

    fetchGovernorates();
  }, []);


  useEffect(() => {
    const fetchGovernoratesCites = async () => {
      try {
        const data = await getAllCities();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cites:', error);
      }
    };

    fetchGovernoratesCites();
  }, []);




    const resetForm = () => {
      setFirstName('');
      setLastName('');
      setSpecializations([]);
      setGovernorates([]);
      setSpecialty('');
      setMobile('');
      setEmail('');
      setProvince('');
      setCities([]);
      setSelectedCity('');
      setAddress('');
      setAvailability([]);
      setInClinic(false);
      setAtHome(false);
      setSelectedImage(null);
      setSelectedFile(null);
      setFileSelectedText('اختر ملف لتحميله');
      setFileSelectedColor('#b3b2b2');
      setIsSubmitted(false);
      setErrors([
        { field: 'firstName', error: '' },
        { field: 'lastName', error: '' },
        { field: 'specialty', error: '' },
        { field: 'mobile', error: '' },
        { field: 'email', error: '' },
        { field: 'province', error: '' },
        { field: 'area', error: '' },
        { field: 'address', error: '' },
      ]);
    };
    

    

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.header}>طلب انضمام الي كانيولا</Text>


          <CustomModalAlert
        visible={modalVisible}
        setVisible={setModalVisible}
        type={success ? 'success' : 'error'}
        message={success ? 'تم الرسال طلبك سيتم التواصل معك' : 'حدث خطأ في التسجيل!'}
        buttonText="الصفحه الرشيسيه"
        navigationTarget="Main"
      />

      
          <TouchableOpacity
            style={[styles.imageUpload, {overflow: 'hidden'}]}
            onPress={handleImageUpload}>
            <Image
              source={selectedImage ? {uri: selectedImage} : imageupload}
              style={{width: 80, height: 80, borderRadius: 50}}
            />
          </TouchableOpacity>

          <CustomTextInput
            label="الاسم الاول"
            value={firstName}
            onChangeText={text => handleInputChange(text, 'firstName')}
            style={styles.textInput}
            validate={validateName}
            errorMessage={
              errors.find(errorObj => errorObj.field === 'firstName').error
            }
            onError={error =>
              setErrors(prevErrors =>
                prevErrors.map(errorObj =>
                  errorObj.field === 'firstName'
                    ? {...errorObj, error}
                    : errorObj,
                ),
              )
            }
            validateOnSubmit={true}
          />
          <CustomTextInput
            label="الاسم الاخير"
            value={lastName}
            style={styles.textInput}
            onChangeText={text => handleInputChange(text, 'lastName')}
            validate={validateName}
            errorMessage={
              errors.find(errorObj => errorObj.field === 'lastName').error
            }
            onError={error =>
              setErrors(prevErrors =>
                prevErrors.map(errorObj =>
                  errorObj.field === 'lastName'
                    ? {...errorObj, error}
                    : errorObj,
                ),
              )
            }
            validateOnSubmit={true}
          />

<CustomPicker
      label="التخصص"
      value={specialty}
      onValueChange={value => setSpecialty(value)}
      items={[
        { label: 'اختر التخصص', value: '' },
        ...specializations.map(spec => ({ label: spec.name, value: spec.id })),
      ]}
      shouldValidate={isSubmitted} // Pass isSubmitted state to trigger validation
      selectedItem={specialty}
      validate={validateSpecialty} // Pass validation function
      valideMessage="الرجاء اختيار تخصص"
    />

          <CustomTextInput
            label="رقم الموبايل"
            value={mobile}
            onChangeText={text => handleInputChange(text, 'mobile')}
            style={styles.textInput}
            validate={validateMobile}
            errorMessage={
              errors.find(errorObj => errorObj.field === 'mobile').error
            }
            onError={error =>
              setErrors(prevErrors =>
                prevErrors.map(errorObj =>
                  errorObj.field === 'mobile' ? {...errorObj, error} : errorObj,
                ),
              )
            }
            validateOnSubmit={true}
          />
          <CustomTextInput
            label="البريد الالكتروني"
            value={email}
            onChangeText={text => handleInputChange(text, 'email')}
            style={styles.textInput}
            validate={validateEmail}
            errorMessage={
              errors.find(errorObj => errorObj.field === 'email').error
            }
            onError={error =>
              setErrors(prevErrors =>
                prevErrors.map(errorObj =>
                  errorObj.field === 'email' ? {...errorObj, error} : errorObj,
                ),
              )
            }
            validateOnSubmit={true}
          />
 <CustomPicker
          label="المحافظة"
          value={province}
          onValueChange={setProvince}
          items={[
            { label: 'اختر المحافظة', value: '' },
            ...governorates.map(gov => ({ label: gov.name, value: gov.iso2 })),
          ]}
          shouldValidate={isSubmitted}
          selectedItem={province}
          validate={validateProvince} 
          valideMessage="الرجاء اختيار محافظة"
        />


          <CustomPicker
            label="المدينه"
            value={selectedCity}
            onValueChange={setSelectedCity}
            items={[
              { label: 'اختر المدينة', value: '' },
              ...cities.map(city => ({ label: city.name, value: city.name })),
            ]}
            shouldValidate={isSubmitted}
            selectedItem={selectedCity}
            validate={validateArea}
            valideMessage="الرجاء اختيار منطقه"
          />

          <CustomTextInput
            label="العنوان"
            value={address}
            onChangeText={text => handleInputChange(text, 'address')}
            style={styles.textInput}
            validate={validateAdrress}
            errorMessage={
              errors.find(errorObj => errorObj.field === 'address').error
            }
            onError={error =>
              setErrors(prevErrors =>
                prevErrors.map(errorObj =>
                  errorObj.field === 'address' ? {...errorObj, error} : errorObj,
                ),
              )
            }
            validateOnSubmit={true}
          />

          <Text style={styles.label}>الاتتاحيه للشكف</Text>
          <View style={styles.checkOptions}>
            <TouchableOpacity
              style={styles.checkOption}
              onPress={() => toggleAvailability('home')}>
              <FontAwesomeIcon
                name={
                  availability.includes('home') ? 'check-square-o' : 'square-o'
                }
                size={30}
                color={availability.includes('home') ? '#4cb6d3' : 'gray'}
              />
            </TouchableOpacity>

            <View style={styles.containert}>
              <Image
                source={HomeIcon}
                style={{width: 40, height: 40, tintColor: '#4cb6d3'}}
              />

              <Text
                style={styles.checkOptionText}
                onPress={() => toggleAvailability('home')}>
                كشف منزلي
              </Text>
            </View>
          </View>

          <View style={styles.checkOptions}>
            <TouchableOpacity
              style={styles.checkOption}
              onPress={() => toggleAvailability('clinic')}>
              <FontAwesomeIcon
                name={
                  availability.includes('clinic')
                    ? 'check-square-o'
                    : 'square-o'
                }
                size={30}
                color={availability.includes('clinic') ? '#4cb6d3' : 'gray'}
              />
            </TouchableOpacity>

            <View style={styles.containert}>
              <Image
                source={ClinicIcon}
                style={{width: 40, height: 40, tintColor: '#4cb6d3'}}
              />
              <Text
                style={styles.checkOptionText}
                onPress={() => toggleAvailability('clinic')}>
                كشف في العياده
              </Text>
            </View>
          </View>

          <Text style={styles.label}>شهادة مزاولة المهنه</Text>
          <TouchableOpacity
            style={styles.fileUpload}
            onPress={handleFileUpload}>
            <Image
              source={file}
              style={{width: 30, height: 30, tintColor: '#b3b2b2'}}
            />
            <Text style={[styles.fileUploadText, {color: fileSelectedColor}]}>
              {fileSelectedText}
            </Text>
          </TouchableOpacity>
          {selectedFile && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteFile}>
              <Text style={styles.deleteButtonText}>حذف الملف</Text>
            </TouchableOpacity>
          )}

          <CustomButton title="ارسال" onPress={handleSubmit} />
        </ScrollView>
      </SafeAreaView>
    </Background>
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
    fontFamily: 'DroidBold',
    alignSelf: 'flex-start',
  },
  imageUpload: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#333',
    fontSize: 17,
    fontFamily: 'Droid',
  },
  pickerContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
  },
  checkOptions: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',

  },
  checkOption: {
    alignItems: 'center',
  },
  checkOptionText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'DroidBold',
    color: '#4cb6d3',
  },

  containert: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
  },

  fileUpload: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  fileUploadText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Droid',
  },
  button: {
    width: '100%',
    fontFamily: 'Droid',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },

  deleteButtonText: {
    color: '#ffff',
    fontSize: 14,
    fontFamily: 'Droid',
  },
});

export default Register;
