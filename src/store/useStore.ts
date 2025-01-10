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
  id: number;
  username: string;
  email: string;
  email_verified_at: string | null;
  is_vehicle_owner: boolean;
  last_login: string;
}

// Define LoginResponse interface
interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

// Define AuthState interface for Zustand store
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
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
      token: null,
      refreshToken: null,
      isLoading: false,

      // Setters
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),

      // Login function
      login: async (email: string, password: string): Promise<void> => {
        set({ isLoading: true });
        try {
          console.log("Attempting login with:", { email, password });
      
          const response = await axiosInstance.post<LoginResponse>("/login", { email, password });
          console.log("API Response:", response.data);
      
          if (!response.data || !response.data.user) {
            throw new Error("Invalid API response: Missing user data");
          }
      
          const { user, access_token: token, refresh_token: refreshToken } = response.data;
      
          set({ user, token, refreshToken });
      
          localStorage.setItem("authToken", token);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
      
          console.log("Login successful");
        } catch (error: any) {
          console.error("Error in login function:", error);
      
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Login failed. Please try again.");
          } else {
            throw new Error("An unexpected error occurred. Please try again later.");
          }
        } finally {
          set({ isLoading: false });
        }
      },
      
            // Logout function
      logout: () => {
        set({ user: null, token: null, refreshToken: null });
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      },

      // Refresh token function
      refreshAuthToken: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) {
          console.warn("No refresh token available");
          return;
        }

        try {
          const response: AxiosResponse<{ access_token: string }> =
            await axiosInstance.post("/refresh", {
              refresh_token: refreshToken,
            });

          const { access_token: newToken } = response.data;

          set({ token: newToken });

          // Persist the new token in localStorage
          localStorage.setItem("authToken", newToken);

          console.log("Token refreshed successfully");
        } catch (error) {
          console.error("Error refreshing token:", error);
          get().logout(); // Log the user out if refreshing the token fails
        }
      },

      // Reset password function
      resetPassword: async (token: string, newPassword: string) => {
        try {
          const response = await axiosInstance.post("/reset-password", {
            token,
            newPassword,
          });

          console.log("Password reset successful:", response.data);
          alert("Your password has been reset successfully.");
          window.location.href = "/chat";
        } catch (error) {
          console.error("Error resetting password:", error);
        }
      },

      // Update vehicle profile function
      updateVehicleProfile: async (vehicleData: Record<string, any>) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post(
            "/vehicle-owner-status",
            vehicleData
          );

          console.log("Vehicle profile updated successfully:", response.data);
          alert("Vehicle profile updated successfully.");
          window.location.href = "/chat";
        } catch (error) {
          console.error("Error updating vehicle profile:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      version: 1,
    }
  )
);
