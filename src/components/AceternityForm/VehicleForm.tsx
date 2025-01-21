"use client";

// import "../../app/vehicleprofile/vehicleprofile.css";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Input } from "@components/ui/input";
// import { Label } from "@radix-ui/react-label";
// import { BeatLoader } from "react-spinners";
// import api from "../../lib/protectedapi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BiChevronLeft } from "react-icons/bi";
// import Link from "next/link";

// export default function VehicleForm() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     make: "",
//     model: "",
//     year: "",
//     registrationNumber: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState<"success" | "error" | "">("");
//   const [progress, setProgress] = useState(100);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setPopupMessage("");
//       setPopupType("");
//     }, 3000);

//     return () => clearTimeout(timeout);
//   }, [popupMessage]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [id]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setPopupMessage("");
//     setPopupType("");

//     // Validation to ensure all fields are filled
//     if (
//       !formData.make ||
//       !formData.model ||
//       !formData.year ||
//       !formData.registrationNumber
//     ) {
//       setPopupMessage("All fields are required.");
//       setPopupType("error");
//       setIsSubmitting(false);
//       return;
//     }
    
//     try {
//       const vehicleData = {
//         license_plate: formData.registrationNumber,
//         make: formData.make,
//         model: formData.model,
//         vin: formData.registrationNumber,
//         year: new Date(formData.year).getFullYear(),
//       };
//       console.log(vehicleData);

//       const response = await api.post(
//         "/vehicle/api/v1/vehicles/create",
//         vehicleData
//       );

//       if (response.status_code === 201) {
//         toast.success("Vehicle profile created successfully!", {
//           position: "top-right",
//           autoClose: 2000,
//         });

//         const interval = setInterval(() => {
//           setProgress((prev) => {
//             if (prev <= 0) {
//               clearInterval(interval);
//               router.push("/chat");
//             }
//             return prev - 5;
//           });
//         }, 100);
//       }
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message ||
//           "An unexpected error occurred. Please try again.",
//         {
//           position: "top-right",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-xl w-full flex flex-col h-screen mx-auto rounded-none md:rounded-2xl py-24 shadow-input bg-white dark:bg-black">
//       <ToastContainer />
//       <Link href="/onboarding">
//         <div className="flex items-center mb-14">
//           <BiChevronLeft className="text-[#5377DC] text-xl" />
//           <p className="text-[#5377DC]">Back</p>
//         </div>
//       </Link>
//       <h2 className="font-600 font-inter text-base text-[#c3cad7]">
//         Step 2 of 2
//       </h2>
//       <div className="space-y-2 mb-4">
//         <h2 className="font-semibold text-3xl font-inter text-[#181b1f]">
//           Create Vehicle Profile
//         </h2>
//         <p className="font-inter font-normal text-xl text-[#9c9aa5]">
//           Setup your Vehicle Profile for easy accessibility.
//         </p>
//       </div>
//       <form
//         className="space-y-4 py-6 pl-5 pr-4 vehicle-form-content"
//         onSubmit={handleSubmit}
//       >
//         {/* Vehicle Make */}
//         <LabelInputContainer>
//           <Label htmlFor="make">Vehicle Make</Label>
//           <Input
//             id="make"
//             placeholder="Make of Vehicle"
//             type="text"
//             value={formData.make}
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Vehicle Model */}
//         <LabelInputContainer>
//           <Label htmlFor="model">Model</Label>
//           <Input
//             id="model"
//             placeholder="What model is your vehicle"
//             type="text"
//             value={formData.model}
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Vehicle Year */}
//         <LabelInputContainer>
//           <Label htmlFor="year">Year</Label>
//           <Input
//             id="year"
//             placeholder="Select year"
//             type="date"
//             value={formData.year}
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Vehicle Registration Number */}
//         <LabelInputContainer>
//           <Label htmlFor="registrationNumber">
//             Vehicle Registration Number
//           </Label>
//           <Input
//             id="registrationNumber"
//             placeholder="Enter Number"
//             type="text"
//             value={formData.registrationNumber}
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-7/12 mx-auto py-2 px-4 bg-[#1e3a8a] text-white rounded hover:bg-[#1E3A8A]/90 disabled:opacity-50 flex justify-center items-center"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? <BeatLoader size={8} color="#fff" /> : "Continue"}
//         </button>
//       </form>

//       {/* Popup Message */}
//       {popupType && (
//         <div
//           className={`fixed bottom-4 left-4 right-4 max-w-md mx-auto p-4 rounded-lg shadow-lg z-50 ${
//             popupType === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           <p>{popupMessage}</p>
//           {popupType === "success" && (
//             <div className="h-2 bg-green-500 rounded mt-2 relative overflow-hidden">
//               <div
//                 className="absolute top-0 left-0 h-full bg-green-700 transition-all"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={`flex flex-col space-y-2 w-full ${className}`}>
//       {children}
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { BiChevronLeft, BiChevronDown } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

export default function VehicleForm() {
  const router = useRouter();
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoadingMakes, setIsLoadingMakes] = useState(true);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [openMake, setOpenMake] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [selectedMake, setSelectedMake] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    makeId: "",
    model: "",
    year: "",
    registrationNumber: "",
    vin: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMakes();
  }, []);

  useEffect(() => {
    if (formData.makeId && formData.year) {
      fetchModels(formData.makeId, formData.year);
    }
  }, [formData.makeId, formData.year]);

  const fetchMakes = async () => {
    try {
      const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
      const data = await response.json();
      setMakes(data.Results);
    } catch (error) {
      console.error('Error fetching makes:', error);
      toast.error('Failed to load vehicle makes');
    } finally {
      setIsLoadingMakes(false);
    }
  };

  const fetchModels = async (makeId, year) => {
    setIsLoadingModels(true);
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      );
      const data = await response.json();
      setModels(data.Results || []);
    } catch (error) {
      console.error('Error fetching models:', error);
      toast.error('Failed to load vehicle models');
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleMakeSelect = (make) => {
    setFormData(prev => ({
      ...prev,
      make: make.Make_Name,
      makeId: make.Make_ID,
      model: '' // Reset model when make changes
    }));
    setSelectedMake(make);
    setOpenMake(false);
  };

  const handleModelSelect = (model) => {
    setFormData(prev => ({
      ...prev,
      model: model.Model_Name
    }));
    setOpenModel(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const vehicleData = {
        license_plate: formData.registrationNumber || "NA",
        make: formData.make,
        model: formData.model,
        vin: formData.vin || "NA",
        year: new Date(formData.year).getFullYear(),
      };

      const response = await api.post("/vehicle/api/v1/vehicles/create", vehicleData);

      if (response.status_code === 201) {
        toast.success("Vehicle profile created successfully!");
        setTimeout(() => router.push("/chat"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
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
        <h2 className="font-semibold text-3xl font-inter text-[#181b1f]">
          Create Vehicle Profile
        </h2>
        <p className="font-inter font-normal text-xl text-[#9c9aa5]">
          Setup your Vehicle Profile for easy accessibility.
        </p>
      </div>

      <form className="space-y-4 py-6 pl-5 pr-4" onSubmit={handleSubmit}>
        {/* Make Dropdown */}
        <div className="flex flex-col space-y-2">
          <Label>Vehicle Make</Label>
          <Popover open={openMake} onOpenChange={setOpenMake}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openMake}
                className="justify-between"
              >
                {formData.make || "Select make..."}
                <BiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search make..." className="h-9" />
                <CommandEmpty>No make found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {makes.map((make) => (
                    <CommandItem
                      key={make.Make_ID}
                      onSelect={() => handleMakeSelect(make)}
                    >
                      {make.Make_Name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Year Input */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="date"
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
          />
        </div>

        {/* Model Dropdown */}
        <div className="flex flex-col space-y-2">
          <Label>Model</Label>
          <Popover open={openModel} onOpenChange={setOpenModel}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openModel}
                className="justify-between"
                disabled={!formData.makeId || !formData.year}
              >
                {formData.model || "Select model..."}
                <BiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search model..." className="h-9" />
                <CommandEmpty>No model found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {models.map((model) => (
                    <CommandItem
                      key={model.Model_ID}
                      onSelect={() => handleModelSelect(model)}
                    >
                      {model.Model_Name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* VIN Input */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="vin">VIN (Optional)</Label>
          <Input
            id="vin"
            placeholder="Enter VIN"
            type="text"
            value={formData.vin}
            onChange={(e) => setFormData(prev => ({ ...prev, vin: e.target.value }))}
          />
        </div>

        {/* Registration Number Input */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="registrationNumber">License Plate (Optional)</Label>
          <Input
            id="registrationNumber"
            placeholder="Enter License Plate"
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          className="w-7/12 mx-auto py-2 px-4 bg-[#1e3a8a] text-white rounded hover:bg-[#1E3A8A]/90 disabled:opacity-50 flex justify-center items-center"
          disabled={isSubmitting || !formData.make || !formData.model || !formData.year}
        >
          {isSubmitting ? <BeatLoader size={8} color="#fff" /> : "Continue"}
        </button>
      </form>
    </div>
  );
}