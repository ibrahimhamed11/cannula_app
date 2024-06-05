// TabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Appointments from './screens/Appointments';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { Text, View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;

  if (route.name === 'الرئيسية') {
    iconName = focused ? 'home' : 'home';
  } else if (route.name === 'مواعيدي') {
    iconName = focused ? 'calendar' : 'calendar';
  } else if (route.name === 'الملف الشخصي') {
    iconName = focused ? 'user' : 'user';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const getTabBarLabel = (route, color) => {
  let labelText;

  if (route.name === 'الرئيسية') {
    labelText = 'الرئيسية';
  } else if (route.name === 'مواعيدي') {
    labelText = 'مواعيدي';
  } else if (route.name === 'الملف الشخصي') {
    labelText = 'الملف الشخصي';
  }

  return (
    <View style={styles.labelContainer}>
      <Text style={[styles.labelText, { color: color }]}>{labelText}</Text>
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route, focused, color, size),
      tabBarLabel: ({ focused, color }) => getTabBarLabel(route, color),
      tabBarStyle: styles.tabBar,
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    })}
  >



<Tab.Screen
      name="الرئيسية"
      component={Home}
      options={{ headerShown: false }} 
    />
    <Tab.Screen
      name="مواعيدي"
      component={Appointments}
      options={{ headerShown: false }} 
    />
    <Tab.Screen
      name="الملف الشخصي"
      component={Profile}
      options={{ headerShown: false }} 
    />


  </Tab.Navigator>
);

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -5,
  },
  labelText: {
    fontFamily: 'Droid',
    fontSize: 12,
  },
  tabBar: {
    height: 80,
  },
});

export default TabNavigator;
