"use client"
import { useAuthStore } from '@store/useStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const publicRoutes = ['/auth/log-in', '/auth/sign-up', '/forgot-password'];

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!token && !publicRoutes.includes(pathname)) {
      router.push('/auth/log-in');
    }
  }, [user, token, pathname, router]);

  if (!token && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
};
