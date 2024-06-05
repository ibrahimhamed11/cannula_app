import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#4cb6d3', // Example background color
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:25
  },
  buttonText: {
    fontFamily: 'Droid',
    fontSize: 17, // Adjust font size as needed
    color: 'white', // Example text color
  },
});

export default CustomButton;
