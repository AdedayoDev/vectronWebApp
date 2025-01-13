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
import CardWrapper from "../CardWrapper";
import AppleLogIn from "./AppleLogIn";
import GoogleLogIn from "./GoogleLogIn";
import { useRouter } from "next/router";


const LogInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const LogInForm = () => {
  const { login, user } = useAuthStore();
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LogInSchema>) => {
    if (!isChecked) {
      alert("You must agree to the terms and conditions before logging in.");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    setMessageType("");
  
    try {
      await login(data.email, data.password); // Call the login function
  
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
  
      setTimeout(() => {
       window.location.href = "/onboarding";
      }, 2000);
    } catch (error: any) {
      // Handle the error message received from login
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setIsLoading(false);
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
              onChange={() => setIsChecked(!isChecked)}
            />
            <label
              htmlFor="terms-checkbox"
              className="font-inter w-full text-[#040308] flex items-center justify-between"
            >
              <span className="font-inter font-medium text-sm text-[#344054]">
                Remember for 30 days
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
            disabled={!isChecked || isLoading}
            type="submit"
          >
            {isLoading ? <BeatLoader size={8} color="#fff" /> : "Login"}
          </Button>
          {message && (
            <p
              style={{
                color:
                  messageType === "success"
                    ? "green"
                    : messageType === "error"
                    ? "red"
                    : "black",
                marginTop: "1rem",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LogInForm;
