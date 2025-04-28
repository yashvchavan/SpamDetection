// frontend/src/services/api.js
import axios from 'axios';

// Create axios instance with timeout
const api = axios.create({
  baseURL: 'http://192.168.54.202:8000/api',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const getNotifications = async () => {
  try {
    const response = await api.get('/notifications'); // Use instance
    console.log('API Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Failure:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error; // Propagate error to component
  }
};