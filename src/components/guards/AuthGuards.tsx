'use client'

import { useAuthStore } from '@store/useStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter()
    const [isHydrated, setIsHydrated] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const { token } = useAuthStore()

    useEffect(() => {
        useAuthStore.persist.rehydrate()
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (!isHydrated) return

        if (token) {
            router.push('/chat')
        }
        setIsChecking(false)
    }, [isHydrated, token, router])

    if (isChecking) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7f56d9]"></div>
            </div>
        )
    }

    return children;
}