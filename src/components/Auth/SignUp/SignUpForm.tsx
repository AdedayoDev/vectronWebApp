"use client";

import { BeatLoader } from "react-spinners";
import React, { useState } from "react";
import CardWrapper from "../CardWrapper";
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
import { signup } from "@lib/Api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import GoogleLogIn from "../LogIn/GoogleLogIn";
import AppleLogIn from "../LogIn/AppleLogIn";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    username: z.string().min(1, { message: "Please enter your username" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirm_password: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

const SignUpForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    if (!isChecked) {
      setPopupMessage("You must agree to the terms and conditions before signing up.");
      setPopupType("error");
      return;
    }

    setIsLoading(true);
    setPopupMessage("");
    setPopupType(null);

    try {
      await signup(data);
      setPopupMessage("Sign up successful!");
      setPopupType("success");

      setTimeout(() => {
        window.location.href = "/auth/log-in";
      }, 2000);
    } catch (error: any) {
      setPopupMessage(
        error.message || "An error occurred during sign up. Please try again."
      );
      setPopupType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      image="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
      title="Sign Up"
      label="Start Driving with AI"
      backButtonHref="/auth/log-in"
      backButtonLabel="Already have an account? Log in"
      smallScreenPadding="pt-72"
      largeScreenPadding="lg:pt-60"
    >
      <div className="space-y-2 mb-2">
        <GoogleLogIn userData={{ email: form.getValues("email") }} mode="login">
          Continue with Google
        </GoogleLogIn>
        <AppleLogIn userData={{ email: form.getValues("email") }} mode="login">
          Continue with Apple
        </AppleLogIn>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="John" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        placeholder="Confirm Password"
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
                className="font-inter text-[#040308]"
              >
                I agree to Vechtron{" "}
                <span className="font-inter text-[#2869d4]">Terms of Service</span> and{" "}
                <span className="font-inter text-[#2869d4]">Privacy Policy</span>.
              </label>
            </div>
          </div>
          <Button
            className="w-full bg-[#7F56D9] rounded-full hover:bg-[#683ec2]"
            type="submit"
            disabled={!isChecked || isLoading}
          >
            {isLoading ? (
              <BeatLoader size={8} color="#ffffff" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
      {/* Popup Message */}
      {popupType && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-md shadow-lg z-50 ${
            popupType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {popupMessage}
        </div>
      )}
    </CardWrapper>
  );
};

export default SignUpForm;
