"use client";

import React, { Suspense, useState } from 'react';
import { z } from "zod";
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import api from '../../../lib/protectedapi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetNewPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type SetNewPasswordFormData = z.infer<typeof SetNewPasswordSchema>;

// Content Component
const SetNewPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const token = searchParams.get('token');

  const form = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(SetNewPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: SetNewPasswordFormData) => {
    console.log("Form submitted", data);
    setIsLoading(true);

    try {
      const response = await api.post('/auth/api/v1/auth/account/reset-password/', {
        token,
        password: data.password,
        confirm_password: data.confirm_password
      });

      console.log("API Response:", response);
      
      toast.success("Password reset successfully!");
      setTimeout(() => {
        router.push("/auth/log-in");
      }, 2000);

    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <ToastContainer />
        <div className="w-full h-screen flex flex-col space-y-5 items-center justify-center">
          <div>
            <Image
              src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734749088/Featured_icon_2_nfihfn.png"
              alt="Error Icon"
              width={56}
              height={56}
              className="w-14 h-14"
            />
          </div>
          
          <div>
            <h2 className="font-inter font-semibold text-3xl text-center text-[#101828]">
              Invalid Reset Link
            </h2>
            <p className="font-inter text-base text-[#667085] text-center w-96">
              The password reset link is invalid or has expired. Please request a new password reset.
            </p>
          </div>

          <Link href="/auth/forget-password">
            <Button className="w-96 bg-[#7F56D9] rounded hover:bg-[#683ec2]">
              Request New Reset Link
            </Button>
          </Link>

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
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="w-full h-screen flex flex-col space-y-5 items-center justify-center">
        <div>
          <Image
            src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734749088/Featured_icon_2_nfihfn.png"
            alt="Email Verification Icon"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </div>
        
        <div>
          <h2 className="font-inter font-semibold text-3xl text-center text-[#101828]">
            Set new Password
          </h2>
          <p className="font-inter text-base text-[#667085] text-center w-96">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Create a Password"
                        className="w-96"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your Password"
                        className="w-96"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="w-96 bg-[#7F56D9] rounded hover:bg-[#683ec2]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </Form>

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

// Main Component with Suspense
const SetNewPassword = () => {
  return (
    <Suspense fallback={
      <main className="w-full h-screen flex items-center justify-center">
        <div className="w-full h-screen flex flex-col space-y-5 items-center justify-center">
          <div>
            <Image
              src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734749088/Featured_icon_2_nfihfn.png"
              alt="Loading"
              width={56}
              height={56}
              className="w-14 h-14"
            />
          </div>
          <p className="font-inter text-base text-[#667085] text-center">
            Loading...
          </p>
        </div>
      </main>
    }>
      <SetNewPasswordContent />
    </Suspense>
  );
};

export default SetNewPassword;