// CustomHeader.js

import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar,I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon

const CustomHeader = ({ isVisible }) => {
  if (!isVisible) {
    return null; 
  }


  useEffect(() => {
    I18nManager.forceRTL(true);
  }, []);


  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.content}>
        <Icon name="bell" size={24} color="#000" />

        <Text style={styles.title}>أهلاً بك في كانيولا</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
    height: 80, 
  },
  content: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%', 
  },
  title: {
    fontFamily: 'Droid',
    fontSize: 18,
    color: '#000', 
    textAlign: 'right',
  },
});

export default CustomHeader;
