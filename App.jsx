import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, StyleSheet, View } from 'react-native';
import StackNavigator from './navigators/StackNavigator';


const App = () => {


  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
