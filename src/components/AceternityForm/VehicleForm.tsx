"use client";

import "../../app/vehicleprofile/vehicleprofile.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@components/ui/input";
import { Label } from "@radix-ui/react-label";
import { BeatLoader } from "react-spinners";
import api from "../../lib/protectedapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from "react-icons/bi";
import Link from "next/link";

export default function VehicleForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registrationNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error" | "">("");
  const [progress, setProgress] = useState(100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPopupMessage("");
    setPopupType("");

    try {
      const vehicleData = {
        license_plate: formData.registrationNumber,
        make: formData.make,
        model: formData.model,
        vin: formData.registrationNumber,
      };

      const response = await api.post(
        "/vehicle/api/v1/vehicles/create",
        vehicleData
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
      setPopupMessage(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
      setPopupType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl w-full flex flex-col   h-screen  mx-auto rounded-none md:rounded-2xl py-24  shadow-input bg-white dark:bg-black">
      <ToastContainer />
      <Link href="/onboarding">
        {" "}
        <div className="flex items-center mb-14">
          <BiChevronLeft className="  text-[#5377DC] text-xl  group-hover:opacity-100 group-hover:scale-125 transition-transform duration-300" />
          <p className="text-[#5377DC]">Back</p>
        </div>
      </Link>
      <h2 className="font-600 font-inter text-base text-[#c3cad7] ">
        Step 2 of 2
      </h2>
      <div className="space-y-2 mb-4">
        <h2 className="font-semibold text-3xl font-inter text-[#181b1f] ">
          Create Vehicle Profile
        </h2>
        <p className="font-inter font-normal text-xl text-[#9c9aa5] ">
          Setup your Vehicle Profile for easy accessibility.
        </p>
      </div>
      <form
        className="space-y-4 py-6 pr-6 vehicle-form-content"
        onSubmit={handleSubmit}
      >
        {/* Vehicle Make */}
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

        {/* Vehicle Model */}
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

        {/* Vehicle Year */}
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

        {/* Vehicle Registration Number */}
        <LabelInputContainer>
          <Label htmlFor="registrationNumber">
            Vehicle Registration Number
          </Label>
          <Input
            id="registrationNumber"
            placeholder="Enter Number"
            type="text"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#3556B3] text-white  rounded-full hover:bg-[#1E3A8A]/100 disabled:opacity-50 flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? <BeatLoader size={8} color="#fff" /> : "Continue"}
        </button>
      </form>

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
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {children}
    </div>
  );
};
