// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../navigators/TabNavigator';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Appointments from '../screens/Appointments';
import Register from '../screens/Register';
import OtpScreen from '../screens/OtpScreen';
import InitialScreen from '../screens/InitialScreen '; 
import ConfirmPassword from '../screens/ConfirmPassword';
import Prices from '../screens/prices';
const Stack = createStackNavigator();

const StackNavigator = () => (
<Stack.Navigator >

    <Stack.Screen 
      name="Initial" 
      component={InitialScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Register" 
      component={Register} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Main" 
      component={TabNavigator} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="OtpScreen" 
      component={OtpScreen}
      options={{ headerShown: false }} 
    />

<Stack.Screen 
      name="ConfirmPassword" 
      component={ConfirmPassword} 
      options={{ headerShown: false }} 
    />

<Stack.Screen 
      name="Prices" 
      component={Prices} 
      options={{ headerShown: false }} 
    />


    <Stack.Screen 
      name="Home" 
      component={Home} 
      options={{
        headerTitle: "",
        headerShown: true,
        headerStyle: {
          backgroundColor: 'red',
        },
        headerBackTitleVisible: false, 
        headerTintColor: '#fff', 
        headerBackTitleStyle: {
          color: '#fff', 
        },
      }}
    />
    <Stack.Screen 
      name="Profile" 
      component={Profile} 
      options={{ 
        headerBackTitleVisible: false,
        headerTitle: 'Profile',
        headerTintColor: 'blue', 
        headerLeft: null, 
      }} 
    />
    <Stack.Screen 
      name="Appointment" 
      component={Appointments} 
      options={{ headerShown: false }} 

    />
  </Stack.Navigator>
);

export default StackNavigator;
