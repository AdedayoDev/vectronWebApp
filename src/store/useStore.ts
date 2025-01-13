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
  access_token: string | null;
  refresh_token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setAccessToken: (access_token) => set({ access_token }),
      setRefreshToken: (refresh_token) => set({ refresh_token }),
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post('/login', { email, password });
          console.log("response", response.data);
          set({
            user: response.data.data.user,
            access_token: response.data.data.access_token,
            refresh_token: response.data.data.refresh_token,
          });

          // Verify the state was updated
          console.log('State after update:', useAuthStore.getState());
          if (response.data.data.access_token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access_token}`;
          }
        } catch (error) {
          console.error('Error during login:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, access_token: null, refresh_token: null });
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

export const emailVerification = async (data: { email: string }) => {
  const access_token = useAuthStore.getState().access_token;

  try {
    const response = await axiosInstance.post(
      "/api/v1/users/send-verify-mail/",
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`, // Add the Authorization header
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Failed to request verification.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
};
