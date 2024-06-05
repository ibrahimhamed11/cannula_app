// FontLoader.js

import { Platform } from 'react-native';

const loadCustomFont = async () => {
  try {
    if (Platform.OS === 'android') {
      await Font.loadAsync({
        'Droid': require('./assets/fonts/Droid.ttf'),
      });
    } else {
      await Font.loadAsync({
        'Droid': require('./assets/fonts/Droid.ttf'),
      });
    }
  } catch (error) {
    console.error('Error loading custom font:', error);
  }
};

export default loadCustomFont;
