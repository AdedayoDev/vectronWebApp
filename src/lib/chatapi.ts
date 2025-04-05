// utils/api.ts
import { useAuthStore } from '@store/useStore'

// Set the base URL based on environment
const BASE_URL = `https://${process.env.NEXT_PUBLIC_CHAT_API}`;
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-staging.vechtron.com';
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
    //   console.log(token)
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      };

    //   console.log('Request headers:', headers);
      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: headers,
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
    }
  };
  
  export default api;