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
  const emailVerificationRoute = "/auth/email-verification";
  const vehicleOwnerRoute = "/onboarding";

  useEffect(() => {
    if (!token && !publicRoutes.includes(pathname)) {
      router.push('/auth/log-in');
    }
        // If user exists, check email verification and vehicle owner status
    if (user) {
      // Don't redirect if already on email verification route
      if (!user.email_verified_at && pathname !== emailVerificationRoute) {
        router.push(emailVerificationRoute);
        return;
      }

      // Only check vehicle owner status if email is verified and not already on vehicle owner route
      if (user.email_verified_at && user.is_vehicle_owner === null && pathname !== vehicleOwnerRoute) {
        router.push(vehicleOwnerRoute);
        return;
      }
    }
  }, [user, token, pathname, router]);

  if (!token && !publicRoutes.includes(pathname)) {
    return null;
  }
  // Show nothing while checking email verification
  if (user && !user.email_verified_at && pathname !== emailVerificationRoute) {
    return null;
  }

  // Show nothing while checking vehicle owner status
  if (user && user.email_verified_at && user.is_vehicle_owner === null && pathname !== vehicleOwnerRoute) {
    return null;
  }
  return <>{children}</>;
};
