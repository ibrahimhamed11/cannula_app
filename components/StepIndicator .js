import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const StepIndicator = ({ activeStep, headerText, setActiveStep }) => {
  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      {headerText && <Text style={styles.headerText}>{headerText}</Text>}
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <TouchableOpacity onPress={() => handleStepClick(0)} style={styles.stepItem}>
            <FontAwesomeIcon
              name={activeStep === 0 || activeStep === 1 ? 'check-square' : 'square-o'}
              size={24}
              color={activeStep === 0 || activeStep === 1 ? '#4cb6d3' : 'gray'}
            />
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          <TouchableOpacity onPress={() => handleStepClick(1)} style={styles.stepItem}>
            <FontAwesomeIcon
              name={activeStep === 1 ? 'check-square' : 'square-o'}
              size={24}
              color={activeStep === 1 ? '#4cb6d3' : 'gray'}
            />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={[styles.stepText, (activeStep === 0 || activeStep === 1) && styles.activeText, styles.flexStart]}>كشف العياده</Text>
            <Text style={[styles.stepText, activeStep === 1 && styles.activeText, styles.flexEnd]}>كشف منزلي</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: '20%',
  },
  headerText: {
    fontSize: 23,
    fontFamily: 'DroidBold',
    marginBottom: 10,
    color: '#000000',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
  },
  stepText: {
    fontSize: 16,
    color: 'gray',
    fontFamily: 'DroidBold',
  },
  activeText: {
    color: '#4cb6d3',
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
  },
  flexStart: {
    flex: 1,
    textAlign: 'left',
  },
  flexEnd: {
    flex: 1,
    textAlign: 'right',
  },
});

export default StepIndicator;
