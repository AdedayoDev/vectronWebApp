// utils/api.ts
import { useAuthStore } from '@store/useStore'

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-staging.vechtron.com';
const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

// Set the base URL based on environment
const BASE_URL = isProduction 
  ? "https://api.vechtron.com"
  : "https://api-staging.vechtron.com";
const getAuthToken = () => {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      const parsedData = JSON.parse(authData);
      return parsedData.state.token;
    }
    return null;
  };

const api = {
    get: async (url: string) => {
      if (typeof window === 'undefined') {
        throw new Error('This function can only be used on the client side');
      }
  
      const token = getAuthToken();
      
      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
  
      if (!response.ok) {
        if (response.status === 401) {
        //   localStorage.removeItem('accessToken');
        //   window.location.href = '/auth/log-in';
        console.log(token);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    },
  
    post: async (url: string, data: unknown) => {
      if (typeof window === 'undefined') {
        throw new Error('This function can only be used on the client side');
      }
  
      const token = getAuthToken();
      console.log(token)
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      };
      
      console.log('Request headers:', headers);
      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        if (response.status === 401) {
        //   localStorage.removeItem('accessToken');
        //   window.location.href = '/auth/log-in';
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    },


    // Add PUT method
    put: async (url: string, data: unknown) => {
        if (typeof window === 'undefined') {
          throw new Error('This function can only be used on the client side');
        }
  
        const token = getAuthToken();
        
        const response = await fetch(`${BASE_URL}${url}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        return response.json();
      },
  
      // Add DELETE method
      delete: async (url: string) => {
        if (typeof window === 'undefined') {
          throw new Error('This function can only be used on the client side');
        }
  
        const token = getAuthToken();
        
        const response = await fetch(`${BASE_URL}${url}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // For DELETE requests, some APIs might return no content
        if (response.status === 204) {
          return null;
        }
  
        return response.json();
      }
  };
  
  export default api;