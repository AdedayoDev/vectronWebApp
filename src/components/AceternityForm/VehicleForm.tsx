"use client";

import "../../app/vehicleprofile/vehicleprofile.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import api from "../../lib/protectedapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from "react-icons/bi";
import Link from "next/link";

// Define the form data type
interface VehicleFormInputs {
  make: string;
  model: string;
  year: string; // Year as a string to handle date input
  registrationNumber: string;
}

export default function VehicleForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<VehicleFormInputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearErrors();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [errors, clearErrors]);

  const onSubmit: SubmitHandler<VehicleFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const vehicleData = {
        license_plate: data.registrationNumber,
        make: data.make,
        model: data.model,
        vin: data.registrationNumber,
        year: parseInt(new Date(data.year).getFullYear().toString()), // Convert to integer year
      };

      const response = await api.post("/vehicle/api/v1/vehicles/create", vehicleData);

      if (response) {
        toast.success("Vehicle added successfully!", {
          position: "top-right",
          autoClose: 2000,
          pauseOnHover: false,
        });

        setTimeout(() => {
          router.push("/chat");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error creating vehicle:", error);
      toast.error(error.message || "Failed to add vehicle", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full flex flex-col h-screen mx-auto rounded-none md:rounded-2xl py-24 shadow-input bg-white dark:bg-black">
      <ToastContainer />
      <Link href="/onboarding">
        <div className="flex items-center mb-14">
          <BiChevronLeft className="text-[#5377DC] text-xl" />
          <p className="text-[#5377DC]">Back</p>
        </div>
      </Link>
      <h2 className="font-600 font-inter text-base text-[#c3cad7]">Step 2 of 2</h2>
      <div className="space-y-2 mb-4">
        <h2 className="font-semibold text-3xl font-inter text-[#181b1f]">Create Vehicle Profile</h2>
        <p className="font-inter font-normal text-xl text-[#9c9aa5]">
          Setup your Vehicle Profile for easy accessibility.
        </p>
      </div>
      <form
        className="space-y-4 py-6 pl-5 pr-4 vehicle-form-content"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Vehicle Make */}
        <LabelInputContainer>
          <Label htmlFor="make">Vehicle Make</Label>
          <Input
            id="make"
            type="text"
            placeholder="Make of vehicle"
            {...register("make", {
              required: "Vehicle Make is required",
            })}
          />
          {errors.make && <p className="error-message">{errors.make.message}</p>}
        </LabelInputContainer>

        {/* Vehicle Model */}
        <LabelInputContainer>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            type="text"
            placeholder="What model is your car"
            {...register("model", {
              required: "Vehicle Model is required",
            })}
          />
          {errors.model && <p className="error-message">{errors.model.message}</p>}
        </LabelInputContainer>

        {/* Vehicle Year */}
        <LabelInputContainer>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="date"
            {...register("year", {
              required: "Vehicle Year is required",
            })}
          />
          {errors.year && <p className="error-message">{errors.year.message}</p>}
        </LabelInputContainer>

        {/* Vehicle Registration Number */}
        <LabelInputContainer>
          <Label htmlFor="registrationNumber">Vehicle Registration Number</Label>
          <Input
            id="registrationNumber"
            type="text"
            placeholder="Enter Number"
            {...register("registrationNumber", {
              required: "Registration Number is required",
              minLength: {
                value: 12,
                message: "Registration Number must be at least 12 characters",
              },
            })}
          />
          {errors.registrationNumber && (
            <p className="error-message">{errors.registrationNumber.message}</p>
          )}
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-7/12 mx-auto py-2 px-4 bg-[#1e3a8a] text-white rounded hover:bg-[#1E3A8A]/90 disabled:opacity-50 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? "Adding Vehicle..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
}

interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInputContainer: React.FC<LabelInputContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {children}
    </div>
  );
};
