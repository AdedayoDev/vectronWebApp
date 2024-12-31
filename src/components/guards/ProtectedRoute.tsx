import { useAuthStore } from '@store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!user || !token) {
      console.log('No user or token, redirecting to log-in');
      router.push('/auth/log-in');
    }
  }, [user, token, router]);

  if (!user || !token) {
    return null;
  }

  return <>{children}</>;
};
