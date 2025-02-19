'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '../../../store/useStore';
import { getGoogleTokens, getGoogleUser } from '@/lib/googleAuth';
import router from 'next/router';

export default function GoogleCallbackPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const { googlelogin } = useAuthStore();
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
  

  

  useEffect(() => {
    const handleGoogleCallback = async () => {
      


    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');

    if (!idToken) {
      console.error('No ID token found in URL');
      router.push('/auth/error?error=no_token');
      return;
    }
    if (!accessToken) {
        console.error('No access token found in URL');
        router.push('/auth/error?error=no_token');
        return;
    }

      if (error) {
        console.error('Google OAuth error:', error);
        router.push('/auth/log-in');
      }


      try {
        
        await googlelogin(idToken);
        // console.log( "token here",access_token, "and access token", token.id_token)
        window.location.href = '/chat'; // or wherever you want to redirect after successful login
      } catch (error) {
        console.error('Error during Google login:', error);
        router.push('/auth/error?error=login_failed');
      }
    };

    handleGoogleCallback();
  }, [searchParams, router, googlelogin]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">Completing sign in...</h1>
        <p className="text-gray-600">Please wait while we finish setting up your account.</p>
      </div>
    </div>
  );
}