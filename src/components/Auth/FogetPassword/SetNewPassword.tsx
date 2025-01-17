"use client";

import React, { Suspense, useState } from "react";
import { z } from "zod";
import Link from "next/link";
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
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../../../lib/protectedapi";
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

const SetNewPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [statusBarVisible, setStatusBarVisible] = useState(false);
  const [statusBarProgress, setStatusBarProgress] = useState(0);
  const [statusBarType, setStatusBarType] = useState<"success" | "error" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams.get("token");

  const form = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(SetNewPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: SetNewPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or missing token. Please try again.");
      return;
    }

    setIsLoading(true);
    setStatusBarVisible(false);
    setStatusBarProgress(0);
    setStatusBarType(null);

    try {
      const response = await api.post(
        "/auth/api/v1/auth/account/reset-password/",
        {
          token,
          password: data.password,
          confirm_password: data.confirm_password,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully!");
        setStatusBarType("success");
        setStatusBarVisible(true);

        const interval = setInterval(() => {
          setStatusBarProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              router.push("/auth/log-in");
            }
            return prev + 5;
          });
        }, 100);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
      setStatusBarType("error");
      setStatusBarVisible(true);
      setStatusBarProgress(100);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="w-full h-screen flex flex-col space-y-5 items-center justify-center">
        <div>
          <Image
            src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734749088/Featured_icon_2_nfihfn.png"
            alt="Password Reset Icon"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </div>

        <div>
          <h2 className="font-inter font-semibold text-3xl text-center text-[#101828]">
            Set New Password
          </h2>
          <p className="font-inter text-base text-[#667085] text-center w-80">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a Password"
                          className="w-80"
                          disabled={isLoading}
                        />
                        <span
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your Password"
                          className="w-96"
                          disabled={isLoading}
                        />
                        <span
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
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

      {/* Status Bar */}
      {statusBarVisible && (
        <div
          className={`fixed bottom-4 left-4 right-4 max-w-md mx-auto p-4 rounded-lg shadow-lg z-50 ${
            statusBarType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <p>
            {statusBarType === "success"
              ? "Password reset successfully!"
              : "Failed to reset password."}
          </p>
          {statusBarType === "success" && (
            <div className="h-2 bg-green-500 rounded mt-2 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-green-700 transition-all"
                style={{ width: `${statusBarProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

// Main Component with Suspense
const SetNewPassword = () => {
  return (
    <Suspense
      fallback={
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
      }
    >
      <SetNewPasswordContent />
    </Suspense>
  );
};

export default SetNewPassword;
