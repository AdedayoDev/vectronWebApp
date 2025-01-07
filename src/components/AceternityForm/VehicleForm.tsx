"use client";
import React from "react";
import { Input } from "@components/ui/input";
import { Label } from "@radix-ui/react-label";
import { cn } from "@lib/utils";


export function VehicleForm () {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-semibold text-4xl  font-inter text-[#181b1f] text-center">
      Create Vehicle Profile
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Vehicle make</Label>
          <Input id="text" placeholder="Make of Vehicle" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Model</Label>
          <Input id="model" placeholder="What model is your vehicle" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Year</Label>
          <Input
            id="year"
            placeholder="What year is it"
            type="date"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Vehicle Registration Number</Label>
          <Input
            id="number"
            placeholder="Enter Number"
            type="number"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Current Mileage</Label>
          <Input
            id="number"
            placeholder="Enter Number"
            type="number"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="">Last Oil Change Date</Label>
          <Input
            id="number"
            type="date"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="">Any Warnings?</Label>
          <Input
            id="number"
            placeholder="Enter Number"
            type="number"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="">Unusual Noises/Variation?</Label>
          <Input
            id="number"
            placeholder="Enter Number"
            type="number"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="">Fuel Efficiency issues?</Label>
          <Input
            id="number"
            placeholder="Enter Number"
            type="number"
          />
        </LabelInputContainer>

        

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
