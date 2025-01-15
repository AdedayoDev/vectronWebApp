"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@components/ui/input";
import { Label } from "@radix-ui/react-label";
import { cn } from "@lib/utils";
import axios from "axios";
import { useAuthStore } from "@store/useStore";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export function VehicleForm() {
  const router = useRouter();

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
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error" | "">("");
  const [progress, setProgress] = useState(100);

  const bearerToken = useAuthStore((state) => state.token);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setPopupMessage("");
    setPopupType("");
    setProgress(100);

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
        setPopupMessage("Vehicle profile created successfully!");
        setPopupType("success");

        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev <= 0) {
              clearInterval(interval);
              router.push("/chat"); 
            }
            return prev - 5;
          });
        }, 100);
      }
    } catch (error: any) {
      console.error("Error creating vehicle profile:", error);
      setPopupMessage(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
      setPopupType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push("/chat"); 
  };

  return (
    <div className="max-w-lg w-full h-screen mx-auto rounded-none md:rounded-2xl py-24 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-semibold text-4xl lg:w-[373px] font-inter text-[#181b1f] text-center">
        Create Vehicle Profile
      </h2>
      <form
        className="my-8 space-y-4 p-6 w-full vehicle-form-content"
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
          className="w-full py-2 px-4 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E3A8A]/100 disabled:opacity-50 flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? <BeatLoader size={8} color="#fff" /> : "Add Vehicle"}
        </button>
      </form>

      <div className="flex justify-end">
        <button
          className="font-inter font-bold text-sm text-[#f8f1ff] bg-[#442066] w-[140px] h-[53px] rounded-lg"
          onClick={handleSkip}
        >
          Skip for now
        </button>
      </div>

      {/* Popup Message */}
      {popupType && (
        <div
          className={`fixed bottom-4 left-4 right-4 max-w-md mx-auto p-4 rounded-lg shadow-lg z-50 ${
            popupType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <p>{popupMessage}</p>
          {popupType === "success" && (
            <div className="h-2 bg-green-500 rounded mt-2 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-green-700 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}

      {/* Scrollbar styles */}
      <style jsx>{`
        .vehicle-form-content {
          width: 100%;
          overflow-y: auto;
          max-height: calc(100vh - 120px);
          padding-right: 16px;
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
