"use client";

import React from "react";
import CardWrapper from "../CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input"; // Ensure Input is imported correctly
import { LogInSchema } from "../../../../Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import GoogleLogIn from "./GoogleLogIn";
import AppleLogIn from "./AppleLogIn";

const LogInForm = () => {
  const form = useForm({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LogInSchema>) => {
    try {
      const response = await fetch(
        "https://your-backend-endpoint.com/api/signup",
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
      } else {
        console.error("Failed to register user", await response.json());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <CardWrapper
      image="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
      title="Welcome back"
      label="Welcome back! Please enter your details."
      backButtonHref="/auth/sign-up"
      backButtonLabel="Already have an account? Sign Up"
     
    >
      <div className="space-y-4 mb-4">
        <GoogleLogIn>Continue with Google</GoogleLogIn>
        <AppleLogIn>Continue with Apple</AppleLogIn>
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
                      placeholder="Create a Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full bg-[#7F56D9] rounded-full hover:bg-[#683ec2]"
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LogInForm;
