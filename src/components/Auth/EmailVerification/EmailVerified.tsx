
"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from '../../../lib/protectedapi';
import { useAuthStore } from '@store/useStore';

const EmailVerified = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const { user, token, updateUserVerification } = useAuthStore();

    useEffect(() => {
        const verifyEmail = async () => {
            const verificationToken = searchParams.get('token');
            
            if (!verificationToken) {
                setVerificationStatus('error');
                return;
            }

            try {
              console.log('Sending verification request to backend...');
                const response = await api.post('/auth/api/v1/users/verify-email/', {
                    token: verificationToken
                });
                console.log('Backend response:', response);
                
                if (response) {
                    updateUserVerification();
                    setVerificationStatus('success');
                }
            } catch (error) {
                console.error("Error verifying email:", error);
                setVerificationStatus('error');
            }
        };

        verifyEmail();
    }, [searchParams, updateUserVerification]);

    const handleContinue = () => {
        router.push('/chat'); // or your desired route
    };

    const handleResendEmail = async () => {
        try {
            await api.post('/auth/api/v1/users/send-verify-mail/', {});
            // Optionally show success message
        } catch (error) {
            console.error("Error resending verification email:", error);
            // Optionally show error message
        }
    };

    if (!user || !token) {
        router.push('/auth/log-in');
        return null;
    }

    return (
        <main className="w-full h-screen flex items-center justify-center">
            <div className="w-full h-screen flex flex-col space-y-5 items-center justify-center">
                <div>
                    <Image
                        src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734747529/Featured_icon_1_ntnup0.png"
                        alt="Email Verification Icon"
                        width={56}
                        height={56}
                        className="w-14 h-14"
                    />
                </div>
                <div>
                    <h2 className="font-inter font-semibold text-3xl text-center text-[#101828]">
                        {verificationStatus === 'success' ? 'Email verified' : 
                         verificationStatus === 'error' ? 'Verification failed' : 
                         'Verifying email...'}
                    </h2>
                    <p className="font-inter text-base text-[#667085] text-center w-96">
                        {verificationStatus === 'success' 
                            ? 'Your email has been successfully verified. Click below to continue.'
                            : verificationStatus === 'error' 
                            ? 'We encountered an error verifying your email. Please try again.'
                            : 'Please wait while we verify your email...'}
                    </p>
                </div>

                {verificationStatus === 'success' && (
                    <Button 
                        onClick={handleContinue}
                        className="bg-[#7f56d9] w-96 h-11 text-base font-inter font-medium text-white"
                    >
                        Continue
                    </Button>
                )}

                {verificationStatus === 'error' && (
                    <p className="font-inter font-normal text-sm text-[#667085]">
                        Didn&apos;t receive the email?{" "}
                        <span 
                            onClick={handleResendEmail}
                            className="text-[#6941c6] cursor-pointer"
                        >
                            Click to resend
                        </span>
                    </p>
                )}

                <Link href="/auth/log-in">
                    <Button size="lg" className="bg-transparent hover:bg-transparent">
                        <FaArrowLeft className="text-lg lg:text-xl text-[#667085]" />
                        <span className="font-urbanist font-medium text-sm text-[#667085]">
                            Back to log in
                        </span>
                    </Button>
                </Link>
            </div>
        </main>
    );
};

export default EmailVerified;