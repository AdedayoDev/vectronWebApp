"use client";
import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "@lib/utils";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className=" w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      {/* Header */}
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
        Create Vehicle Profile
      </h2>

      {/* Scrollable Form Section */}
      <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
        <form className="space-y-8 flex flex-col items-center " onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Vehicle make</Label>
            <Input id="name" placeholder="Make of vehicle" type="name" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              placeholder="What is the model of your vehicle"
              type="name"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="year-input">Year</Label>
            <Input id="year-input" placeholder="What year is it?" type="date" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="vehicle-number">Vehicle Registration Number</Label>
            <Input
              id="vehicle-number"
              placeholder="Enter Number"
              type="number"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="current-mileage">Current Mileage</Label>
            <Input
              id="current-mileage"
              placeholder="Enter Number"
              type="number"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="oil-change-date">Last Oil Change Date</Label>
            <Input
              id="oil-change-date"
              placeholder="Enter Date"
              type="date"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="warnings">Any warnings</Label>
            <Input id="warnings" placeholder="Enter Details" type="text" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="vibrations">Usual Noises/Vibrations</Label>
            <Input
              id="vibrations"
              placeholder="Enter Details"
              type="text"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="fuel-efficiency">
              Fuel Efficiency Issues?
            </Label>
            <Input
              id="fuel-efficiency"
              placeholder="Enter Details"
              type="text"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-[#9a77ff] to-blue-700 block  w-[352px] text-white rounded-full h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Add Vehicle
            <BottomGradient />
          </button>
        </form>
      </div>
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
