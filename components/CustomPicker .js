import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, I18nManager } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({
  label,
  value,
  onValueChange,
  items,
  shouldValidate,
  selectedItem,
  validate, // Validation function prop
  valideMessage,
  width = '100%', // Custom width prop with default value '100%'
  height, // Custom height prop
  labelFontSize = 17, // Default label font size
  labelColor = '#333', // Default label color
  labelOpacity = 1, // Default label opacity
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
    <View style={[styles.container, { width: width }]}>
      <Text style={[styles.label, { fontSize: labelFontSize, color: labelColor, opacity: labelOpacity }]}>
        {label}
      </Text>
      <View style={[styles.pickerContainer, error ? { borderColor: 'red' } : null, height && { height }]}>
        <Picker
          selectedValue={value}
          onValueChange={handleChange}
          style={[styles.picker, height && { height }]}
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
  },
  label: {
    marginBottom: 5,
    fontFamily: 'Droid',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  picker: {
    width: '100%',
    height: 60, // Default height
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
    borderColor: 'red',
  },
});

export default CustomPicker;
