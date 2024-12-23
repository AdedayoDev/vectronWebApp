"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
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
import GoogleLogIn from "../LogIn/GoogleLogIn";
import AppleLogIn from "../LogIn/AppleLogIn";

const SignUpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  username: z.string().min(1, {
    message: "Please enter your username",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const SignUpForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter(); // Initialize the router

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    if (!isChecked) {
      alert("You must agree to the terms and conditions before signing up.");
      return;
    }

    try {
      const response = await fetch(
        "https://api-staging.vechtron.com/auth/api/v1/auth/account/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("User registered successfully");
        router.push("/onboarding/user-onboarding"); // Redirect to the onboarding page
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const userData = {
    email: form.getValues("email"),
    name: undefined,
    password: undefined,
  };

  return (
    <CardWrapper
      image="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
      title="Sign Up"
      label="Start Driving with AI"
      backButtonHref="/auth/log-in"
      backButtonLabel="Already have an account? Log in"
    >
      <div className="space-y-2 mb-2">
        <GoogleLogIn userData={userData} mode="login">
          Continue with Google
        </GoogleLogIn>
        <AppleLogIn userData={userData} mode="login">
          Continue with Apple
        </AppleLogIn>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="firstname"
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
              name="lastname"
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
                    <Input
                      {...field}
                      type="password"
                      placeholder="Create a Password"
                    />
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
                <span className="font-inter text-[#2869d4]">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-inter text-[#2869d4]">
                  Privacy Policy
                </span>
                .
              </label>
            </div>
          </div>
          <Button
            className="w-full bg-[#7F56D9] rounded-full hover:bg-[#683ec2]"
            type="submit"
            disabled={!isChecked}
          >
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUpForm;
