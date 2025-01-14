"use client";

import React, { useState } from "react";
import { z } from "zod";
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
import Link from "next/link";
import api from '../../../lib/protectedapi';
import { toast } from "react-toastify";

const ForgetPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
});

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const onSubmit = async (data: z.infer<typeof ForgetPasswordSchema>) => {
    setIsLoading(true);
    try {
      await api.post('/auth/api/v1/auth/account/forgot-password/', {
        email: data.email
      });

      toast.success("Reset instructions sent to your email!", {
        position: "top-right",
        autoClose: 3000
      });
      
      setEmailSent(true);

      // Optional: Redirect after successful submission
      setTimeout(() => {
        window.location.href = "/auth/log-in";
      }, 3000);

    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("Failed to send reset instructions. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!form.getValues().email) {
      toast.error("Please enter your email first", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/auth/api/v1/auth/account/forgot-password/', {
        email: form.getValues().email
      });
      
      toast.success("Reset instructions resent!", {
        position: "top-right",
        autoClose: 3000
      });
    } catch (error) {
      console.error("Error resending email:", error);
      toast.error("Failed to resend instructions. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
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
            Forgot password?
          </h2>
          <p className="font-inter text-base text-[#667085] text-center w-96">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your Email"
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
              className="bg-[#7F56D9] rounded w-96 hover:bg-[#683ec2]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </Button>
          </form>
        </Form>

        {emailSent && (
          <p className="font-inter font-normal text-sm text-[#667085]">
            Didn&apos;t receive the email?{" "}
            <span 
              className="text-[#6941c6] cursor-pointer"
              onClick={handleResendEmail}
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

export default ForgetPassword;