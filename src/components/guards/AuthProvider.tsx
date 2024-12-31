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

    useEffect(() => {
        useAuthStore.persist.rehydrate()
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (isHydrated && !token && !publicRoutes.includes(pathname)) {
          router.push('/auth/log-in');
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