'use client'
import { useAuthStore } from '@store/useStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface UserEmailVerifiedProps {
  children: React.ReactNode
}

export const UserEmailVerified: React.FC<UserEmailVerifiedProps> = ({ children }) => {
  const router = useRouter()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user && !user.email_verified) {
      router.push('/auth/verify-email')
    }
  }, [user, router])

  if (!user?.email_verified) {
    return null
  }

  return <>{children}</>
}
