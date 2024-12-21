"use client";

import React from "react";
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
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

const SetNewPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SetNewPassword = () => {
  const form = useForm({
    resolver: zodResolver(SetNewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SetNewPasswordSchema>) => {
    try {
      const response = await fetch(
        "https://your-backend-endpoint.com/api/set-new-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Password reset successfully!");
        alert("Your password has been updated successfully.");
      } else {
        const errorData = await response.json();
        console.error("Failed to reset password", errorData);
        alert("Failed to reset your password. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
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
            Set new Password
          </h2>
          <p className="font-inter text-base text-[#667085] text-center w-96">
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
                      <Input
                        {...field}
                        type="password"
                        placeholder="Create a Password"
                        className="w-96"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your Password"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full bg-[#7F56D9] rounded hover:bg-[#683ec2]"
              type="submit"
            >
              Reset Password
            </Button>
          </form>
        </Form>
        <Button size="lg" className="bg-transparent hover:bg-transparent">
          <FaArrowLeft className="text-lg lg:text-xl text-[#667085]" />
          <span className="font-urbanist font-medium text-sm text-[#667085]">
            Back to log in
          </span>
        </Button>
      </div>
    </main>
  );
};

export default SetNewPassword;
