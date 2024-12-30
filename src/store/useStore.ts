import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";


const BASE_URL = "https://api-staging.vechtron.com/auth"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
});

interface User {
    id: number
    first_name: string
    last_name: string
    email: string
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}
 

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      login: async (credentials) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post ("/api/v1/auth/account/login", credentials  );
             return response. data;} catch (error: any) {
                    if (error.response) {
                        throw new Error(error.response.data?.message || "Login failed");
                    } else if (error.request) {
                        throw new Error("No response from server. Please try again later");
                    } else {
                        throw new Error(error.message || "An unexpected error occured.")
                    }
                
          // Simulate API call
          const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(credentials),
          });
          const data = await response.json();

          set({
            user: data.user,
            token: data.token,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
