import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAuthStore } from '@store/useStore';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const handleLogout = () => {
  // Clear auth store
  useAuthStore.getState().logout();
  
  // Redirect to login page
  window.location.href = '/auth/log-in';
};