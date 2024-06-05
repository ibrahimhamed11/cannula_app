// Background.js

import React from 'react';
import { View, StyleSheet } from 'react-native';

const Background = ({ color, children }) => {
  return (
    <View style={[styles.background, { backgroundColor: color }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default Background;
