import axios from 'axios';

const BASE_URL = 'https://cannula-doctors.onrender.com/doctor-app';


  

export const postDoctorData = async (doctorData, channel = 'sms') => {
  try {

    console.log('post data',doctorData)
    const response = await axios.post(`${BASE_URL}/register/join-request/${channel}`, doctorData);
    return response.data;
  } catch (error) {
    console.error('Error posting doctor data:', error);
    throw error;
  }
};


export const getAllSpecializations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/register/specializations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching specializations:', error);
      throw error;
    }
  };


  export const getAllGovernorates = async () => {
    try {
      const response = await axios.get(
        'https://api.countrystatecity.in/v1/countries/eg/states',
        {
          headers: {
            'X-CSCAPI-KEY': 'b1lSMTZRUzNiN0ZoVzlMUUh3NTloSE9KNnRaQndjR3BpeXVScnNicA==',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching governorates:', error);
      throw error;
    }
  };
  
  export const getAllCities = async () => {
    try {
      const response = await axios.get(
        'https://api.countrystatecity.in/v1/countries/eg/states/DK/cities',
        {
          headers: {
            'X-CSCAPI-KEY': 'b1lSMTZRUzNiN0ZoVzlMUUh3NTloSE9KNnRaQndjR3BpeXVScnNicA==',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  };
  


  export const postProfileImage = async (imageData) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName,
      });
  
      const response = await axios.post(`${BASE_URL}/register/upload/profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error posting profile image:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  };