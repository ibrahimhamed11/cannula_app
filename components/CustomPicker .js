import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform ,I18nManager} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({
  label,
  value,
  onValueChange,
  items,
  shouldValidate,
  selectedItem,
  validate, // Validation function prop
  valideMessage
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    // Check validation when the component mounts
    if (shouldValidate) {
      const validationError = validate(value);
      setError(validationError || '');
    }
  }, [shouldValidate]); // Only run this effect when shouldValidate changes

  const handleChange = (itemValue) => {
    onValueChange(itemValue);
    if (shouldValidate) {
      const validationError = validate(itemValue);
      setError(validationError || '');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.pickerContainer, error ? { borderColor: 'red' } : null]}>
        <Picker
          selectedValue={value}
          onValueChange={handleChange}
          style={styles.picker}
          mode="dropdown"
          dropdownIconColor="#000"
        >
          {items.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.label}
              value={item.value}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
      </View>
      {error ? <Text style={styles.errorText}>{valideMessage}</Text> : null}
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontSize: 17,
    fontFamily: 'Droid',
    
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderColor: '#ccc',
    marginBottom: Platform.OS === 'ios' ? -20 : 0,
    borderWidth:1
    
  },
  picker: {
    width: '100%',
    height: 60,
  },
  pickerItem: {
    fontFamily: 'Droid',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Droid',
    textAlign: I18nManager.isRTL ? 'right' : 'left',

  },
  errorContainer: {
    borderColor: 'red', // Set border color to red when error occurs
  },

});

export default CustomPicker;
