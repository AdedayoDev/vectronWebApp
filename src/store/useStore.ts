import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const BASE_URL = "https://api-staging.vechtron.com/auth/api/v1/auth/account";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface User {
  id: number;
  email: string;
  username: string;
  last_login: string;
  email_verified: boolean;
  email_verified_at: string;
  is_vehicle_owner: boolean;
  profile_picture: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserVerification: () => void;
  updateVehicleOwnerStatus: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set,get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setToken: (token) => {
        set({ token });

        // Dynamically set Authorization header when token changes
        if (token) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          delete axiosInstance.defaults.headers.common['Authorization'];
        }
      },
      setRefreshToken: (refreshToken) => set({ refreshToken }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post('/login', { email, password });
          console.log("response", response.data);
          set({
            user: response.data.data.user,
            token: response.data.data.access_token,
            refreshToken: response.data.data.refresh_token,
          });

          // Set the Authorization header with the new token
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access_token}`;
          console.log('Bearer token for Postman:', response.data.data.access_token);
        } catch (error) {
          console.error('Error during login:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null, refreshToken: null });
        delete axiosInstance.defaults.headers.common['Authorization'];
      },
      updateUserVerification: () => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              email_verified: true,
              email_verified_at: new Date().toISOString()
            }
          });
        }
      },
      updateVehicleOwnerStatus: (status: boolean) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              is_vehicle_owner: status
            }
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
      skipHydration: true,
      version: 1,

    },
    
  )
);

// Export axiosInstance for external use
export { axiosInstance };


// // Hydration helper
// export const initializeAuth = () => {
//   const stored = localStorage.getItem('auth-storage');
//   if (stored) {
//     try {
//       const { state } = JSON.parse(stored);
//       useAuthStore.setState({ 
//         ...state, 
//         isInitialized: true 
//       });
      
//       // Restore axios headers if token exists
//       if (state.token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
//       }
//     } catch (error) {
//       console.error('Error initializing auth state:', error);
//       useAuthStore.setState({ isInitialized: true });
//     }
//   } else {
//     useAuthStore.setState({ isInitialized: true });
//   }
// };