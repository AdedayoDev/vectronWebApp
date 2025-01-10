import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const BASE_URL = "https://api-staging.vechtron.com/auth/api/v1/auth/account";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

interface User {
  id: number
  email: string
  username: string
  last_login: string
  email_verified: boolean
  email_verified_at: string
  is_vehicle_owner: boolean
  profile_picture: string
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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post('/login', { email, password });
          console.log("response", response.data);
          set({
            user: response.data.data.user,
            token: response.data.data.access_token,
            refreshToken: response.data.data.refresh_token
          });
          console.log("user", response.data.data.user);
      
          // Verify the state was updated
          console.log('State after update:', useAuthStore.getState());
          console.log("here!!!")
          if (response.data.access_token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access_token}`;
          }
          console.log(useAuthStore.getState()) // Should show current state
          console.log(localStorage.getItem('auth-storage')) 
        } catch (error) {
          console.error('Error during login:', error);
          throw error; // Re-throw to handle in the component
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null, refreshToken: null });
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

    }
  )
);


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