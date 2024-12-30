import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


const BASE_URL = "https://api-staging.vechtron.com/auth"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

interface User {
  id: number
  email: string
  username: string
  last_login: string
  email_verified: boolean
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
          set({ user: response.data.user, token: response.data.access_token, refreshToken: response.data.refresh_token });
        } catch (error) {
          console.error('Error during login:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null, refreshToken: null });
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
