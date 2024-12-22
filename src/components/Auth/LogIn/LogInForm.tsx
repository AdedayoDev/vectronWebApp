"use client";

import React, {useState} from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import GoogleLogIn from "./GoogleLogIn";
import AppleLogIn from "./AppleLogIn";
import Link from "next/link";

const LogInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const LogInForm = () => {
   const [isChecked, setIsChecked] = useState(false); // State for the checkbox

  const form = useForm({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof LogInSchema>) => {
    if (!isChecked) {
      alert("You must agree to the terms and conditions before signing up.");
      return;
    }
    try {
      const response = await fetch("https://api-staging.vechtron.com/auth/api/v1/auth/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("User logged in successfully!");
      } else {
        console.error("Failed to log in", await response.json());
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Mock user data for social logins
  const userData = {
    email: form.getValues("email"),
    name: undefined, // Not needed for login
    password: undefined, // Not needed for login
  };

  return (
    <CardWrapper
      image="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
      title="Welcome back"
      label="Welcome back! Please enter your details."
      backButtonHref="/auth/sign-up"
      backButtonLabel="Don't have an account? Sign Up"
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
            {/* Password Field */}
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
                      placeholder="Enter your Password"
                    />
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
                onChange={() => setIsChecked(!isChecked)} // Toggle state on change
              />
              <label htmlFor="terms-checkbox" className="font-inter w-full  text-[#040308] flex items-center justify-between">
              <span className="font-inter font-medium text-sm text-[#344054]">Remember for 30 days</span>
              <Link href="/auth/forget-password"> <span className="font-inter font-medium text-sm text-[#6941c6] hover:underline cursor-pointer">Forget password</span> </Link>
              </label>
            </div>
          <Button
            className="w-full bg-[#7F56D9] rounded-full hover:bg-[#683ec2]"
            disabled={!isChecked} // Disable button if checkbox is unchecked
            type="submit"
          >
            Log In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LogInForm;
