import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, I18nManager } from 'react-native';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  validate,
  errorMessage,
  onError,
  validateOnSubmit,
  fontFamily = 'Droid',
  style,
  ...props
}) => {
  const [error, setError] = useState('');

  useEffect(() => {
    setError(errorMessage || ''); // Update error state when errorMessage prop changes
  }, [errorMessage]);

  const handleBlur = () => {
    if (!validateOnSubmit && onError) {
      const validationError = validate(value);
      onError(validationError);
    }
  };

  return (
    <View style={[styles.container, error ? styles.errorContainer : null]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style, { fontFamily: fontFamily, borderColor: error ? 'red' : '#ccc' }]}
        value={value}
        onChangeText={onChangeText}
        onBlur={handleBlur}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{errorMessage || error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  errorContainer: {
    borderColor: 'red', // Set border color to red when error occurs
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontSize: 17,
    fontFamily: 'Droid',
    textAlign: 'left',
  },
  input: {
    height: 60,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    fontSize: 17,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Droid',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

export default CustomTextInput;
