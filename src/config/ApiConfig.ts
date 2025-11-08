import axios from 'axios';
import { BASE_URL } from './EndPoint';
import { getUserToken } from '../utils/AsyncStorage';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      // 'Content-Type': 'application/json ',
      'Content-Type': 'multipart/form-data',
    },
  },
});

// Function to get the token from AsyncStorage
const getToken = async () => {
  try {
    const token = await getUserToken();
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

instance.interceptors.request.use(
  async config => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('configs', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
