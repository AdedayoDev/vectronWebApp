import axios, { AxiosResponse } from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Base URL for the API
const BASE_URL = "https://api-staging.vechtron.com/auth/api/v1/auth/account";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define User interface based on API response structure
interface User {
  id: number
  email: string
  username: string
  last_login: string
  email_verified: boolean
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuthToken: () => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateVehicleProfile: (vehicleData: Record<string, any>) => Promise<void>;
}

// Create Zustand store with persist middleware
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      isLoading: false,

      // Setters
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refresh_token }),
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post('/login', { email, password });
          set({
            user: response.data.user,
            token: response.data.access_token,
            refreshToken: response.data.refresh_token
          });
        } catch (error) {
          console.error('Error during login:', error);
          throw error; // Re-throw to handle in the component
        } finally {
          set({ isLoading: false });
        }
      },
      
            // Logout function
      logout: () => {
        set({ user: null, token: null, refresh_token: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      }),
      skipHydration: true,
      version: 1,
    }
  )
);