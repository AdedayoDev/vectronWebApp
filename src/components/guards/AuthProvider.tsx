'use client'
import { useAuthStore } from '@store/useStore'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect } from 'react'

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
    const { token, user, setUser, setToken, setRefreshToken } = useAuthStore()

    useEffect(() => {
        if (!token && !publicRoutes.includes(pathname)) {
            router.push('/auth/log-in')
        }
    }, [token, pathname])

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken);
        }
    }, [setUser, setToken, setRefreshToken]);

    const value = {
        isAuthenticated: !!token,
        user,
        token
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
