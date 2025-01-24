import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const BASE_URL = "https://api-staging.vechtron.com/auth/api/v1/auth/account";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
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
  updateProfilePics:  (profile_picture: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,

      // Set user
      setUser: (user) => set({ user }),

      // Set token and dynamically add/remove Authorization header
      setToken: (token) => {
        set({ token });

        if (token) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete axiosInstance.defaults.headers.common["Authorization"];
        }
      },

      // Set refresh token
      setRefreshToken: (refreshToken) => set({ refreshToken }),

      // Login function
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post("/login", { email, password });
          const { user, access_token, refresh_token } = response.data.data;

          // Update state and set Authorization header
          set({
            user,
            token: access_token,
            refreshToken: refresh_token,
          });
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
          console.log("Bearer token for Postman:", access_token);
        } catch (error) {
          console.error("Error during login:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Logout function
      logout: () => {
        set({ user: null, token: null, refreshToken: null });
        delete axiosInstance.defaults.headers.common["Authorization"];
      },

      // Update email verification status
      updateUserVerification: () => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              email_verified: true,
              email_verified_at: new Date().toISOString(),
            },
          });
        }
      },

      // Update vehicle owner status
      updateVehicleOwnerStatus: (status: boolean) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              is_vehicle_owner: status,
            },
          });
        }
      },
      updateProfilePics: (profile: string) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              profile_picture: profile
            }
          });
        }
      }
    }),
    {
      name: "auth-storage", // Key for localStorage
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

// Export axiosInstance for external use
export { axiosInstance };
