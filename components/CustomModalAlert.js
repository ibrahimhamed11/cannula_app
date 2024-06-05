import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomModalAlert = ({ visible, setVisible, type, iconName, message, buttonText, navigationTarget }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setVisible(false);
  };

  const handleNavigate = () => {
    navigation.navigate(navigationTarget);
    handleCloseModal();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={type === 'success' ? require('../assets/register/square.png') : require('../assets/register/vote-no.png')}
            style={styles.icon}
          />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigate}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: '90%', 

  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 30,
  },
  message: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Droid',
    
  },
  button: {
    backgroundColor: '#4cb6d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:'70%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Droid',
    alignSelf:'center'
  },
});

export default CustomModalAlert;
