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
import { Input } from "@components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const ForgetPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
});

const ForgetPassword = () => {
  const form = useForm({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof ForgetPasswordSchema>) => {
    try {
      const response = await fetch(
        "https://your-backend-endpoint.com/api/validate-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Email is valid, reset instructions sent!");
        alert("Reset instructions have been sent to your email.");
      } else {
        const errorData = await response.json();
        console.error("Failed to validate email", errorData);
        alert("The email entered does not match our records. Please try again.");
      }
    } catch (error) {
      console.error("Error during email validation:", error);
      alert("An error occurred while verifying the email. Please try again later.");
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
            No worries, we’ll send you reset instructions.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  px-6">
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
                        className="w-96"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className=" bg-[#7F56D9] rounded w-96 hover:bg-[#683ec2]"
              type="submit"
            >
              Reset Password
            </Button>
          </form>
        </Form>
        <p className="font-inter font-normal text-sm text-[#667085]">
          Didn&apos;t receive the email?{" "}
          <span className="text-[#6941c6] cursor-pointer">Click to resend</span>
        </p>
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
