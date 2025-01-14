"use client";
import React, { useState } from "react";
import { Input } from "@components/ui/input";
import { Label } from "@radix-ui/react-label";
import { cn } from "@lib/utils";
import axios from "axios";
import { useAuthStore } from "@store/useStore"; // Import auth store
import Link from "next/link";

export function VehicleForm() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registrationNumber: "",
    mileage: "",
    lastOilChange: "",
    warnings: "",
    noises: "",
    fuelEfficiency: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bearerToken = useAuthStore((state) => state.token); // Retrieve token from store

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!bearerToken) {
      setError("No authorization token found. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api-staging.vechtron.com/vehicle/api/v1/vehicles/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Vehicle profile created successfully!");
        setFormData({
          make: "",
          model: "",
          year: "",
          registrationNumber: "",
          mileage: "",
          lastOilChange: "",
          warnings: "",
          noises: "",
          fuelEfficiency: "",
        });
      }
    } catch (error: any) {
      console.error("Error creating vehicle profile:", error);
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg w-full h-screen mx-auto rounded-none md:rounded-2xl py-24 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-semibold text-4xl lg:w-[373px] font-inter text-[#181b1f] text-center">
        Create Vehicle Profile
      </h2>
      <form
        className="my-8 space-y-4 p-6  w-full vehicle-form-content"
        onSubmit={handleSubmit}
      >
        <LabelInputContainer>
          <Label htmlFor="make">Vehicle Make</Label>
          <Input
            id="make"
            placeholder="Make of Vehicle"
            type="text"
            value={formData.make}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="What model is your vehicle"
            type="text"
            value={formData.model}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            placeholder="What year is it"
            type="date"
            value={formData.year}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="registrationNumber">Vehicle Registration Number</Label>
          <Input
            id="registrationNumber"
            placeholder="Enter Number"
            type="text"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="mileage">Current Mileage</Label>
          <Input
            id="mileage"
            placeholder="Enter Number"
            type="number"
            value={formData.mileage}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastOilChange">Last Oil Change Date</Label>
          <Input
            id="lastOilChange"
            type="date"
            value={formData.lastOilChange}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="warnings">Any Warnings?</Label>
          <Input
            id="warnings"
            placeholder="Enter any warnings"
            type="text"
            value={formData.warnings}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="noises">Unusual Noises/Variation?</Label>
          <Input
            id="noises"
            placeholder="Describe any noises"
            type="text"
            value={formData.noises}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="fuelEfficiency">Fuel Efficiency Issues?</Label>
          <Input
            id="fuelEfficiency"
            placeholder="Describe issues"
            type="text"
            value={formData.fuelEfficiency}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E3A8A]/100 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Vehicle"}
        </button>
      </form>
      <Link href="/chat">
      <div className="flex  justify-end">
        <button className="font-inter font-bold text-sm text-[#f8f1ff] bg-[#442066] w-[140px] h-[53px] rounded-lg ">Skip for now</button>
      </div>
      </Link>

      {/* Inline style for the scrollbar */}
      <style jsx>{`
        .vehicle-form-content {
          width: 100%;
          overflow-y: auto;
          max-height: calc(100vh - 120px);
          padding-right: 16px
        }
        .vehicle-form-content::-webkit-scrollbar {
          width: 10px;
        }
        .vehicle-form-content::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #9a77ff, #735ffa);
          border-radius: 4px;
        }
        .vehicle-form-content::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #735ffa, #593dff);
        }
        .vehicle-form-content::-webkit-scrollbar-track {
          background: #f4f4f4;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

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
