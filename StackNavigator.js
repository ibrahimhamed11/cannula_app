// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Appointments from './screens/Appointments';
import CustomHeader from './components/CustomHeader'; // Import your custom header component
import Register from './screens/Register';
const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>


    
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
        headerTintColor: 'blue', // Customize the back button color
        headerLeft: null, // This ensures the back button is shown
      }} 
    />


<Stack.Screen 
      name="Appointment" 
      component={Appointments} 
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


  </Stack.Navigator>
);

export default StackNavigator;
