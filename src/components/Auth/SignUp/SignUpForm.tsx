"use client";

import React from "react";
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
import { Input } from "@components/ui/input"; // Ensure Input is imported correctly
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import GoogleLogIn from "../LogIn/GoogleLogIn";
import AppleLogIn from "../LogIn/AppleLogIn";

const SignUpSchema = z.object({
 email: z.string().email({
    message: "Please enter a valid email address"
}),
name: z.string().min(1, {
    message: "Please enter your name"
}),
password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
}),
})


const SignUpForm = () => {
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
    try {
      const response = await fetch("https://api-staging.vechtron.com/auth/api/v1/auth/account/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("User registered successfully");
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
      title="Sign Up"
      label="Start Driving with AI"
      backButtonHref="/auth/log-in"
      backButtonLabel="Already have an account? Log in"
      
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
            {/* Name Field */}
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
            {/* Name Field */}
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
            {/* Name Field */}
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
                    <Input {...field} type="email" placeholder="Enter your Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Create a Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full bg-[#7F56D9] rounded-full hover:bg-[#683ec2]" type="submit">
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUpForm;
