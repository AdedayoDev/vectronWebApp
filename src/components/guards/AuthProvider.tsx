'use client'
import { useAuthStore } from '@store/useStore'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    user: any | null
    token: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

const publicRoutes = ['/auth/log-in', '/auth/sign-up', '/forgot-password']

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [isHydrated, setIsHydrated] = useState(false)
    const { token, user } = useAuthStore()

    const isTokenExpired = (token: string): boolean => {
        try {
            const payloadBase64 = token.split('.')[1]
            const decodedJson = atob(payloadBase64)
            const decoded = JSON.parse(decodedJson)
            return Date.now() >= decoded.exp * 1000
        } catch (error) {
            console.error('Error checking token expiration:', error)
            return true
        }
    }

    useEffect(() => {
        useAuthStore.persist.rehydrate()
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (isHydrated && !token && !publicRoutes.includes(pathname)) {
          router.push('/auth/log-in');
        }
        if (token && isTokenExpired(token)) {
            // logout()
            router.push('/auth/log-in')
            return
        }
      }, [isHydrated, token, pathname, router]);

    const value = {
        isAuthenticated: !!token,
        user,
        token
    }

    if (!isHydrated) {
        return null
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}