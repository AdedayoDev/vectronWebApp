"use client";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import { useAuthStore } from "../../../store/useStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CardWrapper from "../CardWrapper";
import AppleLogIn from "./AppleLogIn";
import GoogleLogIn from "./GoogleLogIn";

const LogInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const LogInForm = () => {
  const { login } = useAuthStore();
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LogInSchema>) => {
    if (!isChecked) {
      setMessage("You must agree to the terms and conditions before logging in.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setMessageType("");

    try {
      await login(data.email, data.password);
      setMessage("Login successful! Redirecting...");
      setMessageType("success");

      setTimeout(() => {
        window.location.href = "/chat";
      }, 2000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Log in failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const userData = {
    email: form.getValues("email"),
  };

  return (
    <CardWrapper
      image="/assets/icons/Media.jpeg (1).png"
      title="Welcome back"
      label="Welcome back! Please enter your details."
      backButtonHref="/auth/sign-up"
      backButtonLabel="Don't have an account? Sign Up"
      smallScreenPadding="pt-8"
      largeScreenPadding="lg:pt-"
    >
      <div className="space-y-4 mb-4">
        {/* Social Login Buttons */}
        <GoogleLogIn userData={userData} mode="login">
          Continue with Google
        </GoogleLogIn>
        <AppleLogIn userData={userData} mode="login">
          Continue with Apple
        </AppleLogIn>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Field with Toggle */}
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
                        placeholder="Enter your Password"
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
          </div>

          {/* Checkbox Field */}
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="terms-checkbox"
              className="w-5 h-5"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label
              htmlFor="terms-checkbox"
              className="font-inter w-full text-[#040308] flex items-center justify-between"
            >
              <span className="font-inter font-medium text-sm text-[#344054]">
                Keep me signed in
              </span>
              <Link href="/auth/forget-password">
                <span className="font-inter font-medium text-sm text-[#6941c6] hover:underline cursor-pointer">
                  Forgot password
                </span>
              </Link>
            </label>
          </div>
          <Button
            className="w-full bg-[#7F56D9] rounded-full hover:bg-[#683ec2]"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <BeatLoader size={8} color="#fff" /> : "Sign In"}
          </Button>
        </form>
      </Form>

      {/* Popup Message */}
      {messageType && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-md shadow-lg z-50 ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </CardWrapper>
  );
};

export default LogInForm;
