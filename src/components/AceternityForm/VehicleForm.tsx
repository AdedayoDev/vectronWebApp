"use client";

import api from "../../lib/protectedapi";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BeatLoader } from "react-spinners";
import { BiChevronLeft } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

interface Make {
  Make_ID: number;
  Make_Name: string;
}

interface Model {
  Model_ID: number;
  Model_Name: string;
}

interface APIResponse<T> {
  Results: T[];
}

export default function VehicleForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    make: "",
    makeId: "",
    model: "",
    year: "",
    registrationNumber: "",
    vin: "",
    name: "",
    vehicleType: "",
  });
  const [makes, setMakes] = useState<Make[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [searchMake, setSearchMake] = useState("");
  const [searchModel, setSearchModel] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [yearError, setYearError] = useState("");
  const [noModelsFound, setNoModelsFound] = useState(false);

 
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        );
        const data: APIResponse<Make> = await response.json();
        // console.log('Makes loaded:', data.Results);
        setMakes(data.Results);
      } catch (error) {
        // console.error("Error fetching makes:", error);
        toast.error("Failed to load makes");
      }
    };

    fetchMakes();
  }, []);

  
  useEffect(() => {
    if (formData.makeId && formData.year && !yearError) {
      fetchModels(formData.makeId, formData.year);
    }
  }, [formData.makeId, formData.year]);

  const validateYear = (year: string) => {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year, 10);

    if (isNaN(yearNum) || yearNum < 1886) {
      return "Year must be 1886 or later";
    }
    if (yearNum > currentYear + 1) {
      return `Year cannot be more than ${currentYear + 1}`;
    }
    return "";
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value;
    const error = validateYear(year);
    setYearError(error);
    setFormData((prev) => ({ ...prev, year }));
    if (error) {
      setModels([]);
      setNoModelsFound(false);
    }
  };

  const fetchModels = async (makeId: string, year: string) => {
    setIsLoadingModels(true);
    setModels([]);
    setNoModelsFound(false);

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      );
      const data: APIResponse<Model> = await response.json();
      const validModels = data.Results.filter((model) => model.Model_Name);
      setModels(validModels);
      setNoModelsFound(validModels.length === 0);
    } catch (error) {
      // console.error("Error fetching models:", error);
      toast.error("Failed to load models");
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setSearchMake(value);
    
    const selectedMake = makes.find(make => 
      make?.Make_Name?.toLowerCase() === value.toLowerCase()
    );
    
    if (selectedMake) {
      setFormData(prev => ({
        ...prev,
        make: selectedMake.Make_Name,
        makeId: selectedMake.Make_ID.toString(),
        model: ''
      }));
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedModel = models.find(
      (model) => model.Model_Name.toLowerCase() === e.target.value.toLowerCase()
    );

    setSearchModel(e.target.value);

    if (selectedModel) {
      setFormData((prev) => ({
        ...prev,
        model: selectedModel.Model_Name,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const vehicleData = {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        name: formData.name,
        type: formData.vehicleType,
        ...(formData.registrationNumber ? { license_plate: formData.registrationNumber } : {}),
        ...(formData.vin ? { vin: formData.vin } : {})
      };
      console.log(vehicleData);

      const response = await api.post("/vehicle/api/v1/vehicles/create", vehicleData);
      console.log(response);
      if (response.status_code === 200) {
        toast.success("Vehicle profile created successfully!");
        setTimeout(() => router.push("/chat"), 2000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl border md:border-none px-6 w-full flex flex-col h-screen mx-auto rounded-md py-8 my-4 bg-white">
      <ToastContainer />
      <Link href="/onboarding">
        <div className="flex items-center mb-8">
          <BiChevronLeft className="text-blue-600 text-xl" />
          <p className="text-blue-600">Back</p>
        </div>
      </Link>

      <h2 className="text-xl font-semibold mb-4">Create Vehicle Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Make Input */}
        <div>
          <Label>Vehicle Make</Label>
          <div className="relative">
          <Input
            list="makes"
            value={searchMake}
            onChange={handleMakeChange}
            className="w-full"
            placeholder="Search make..."
          />
          <datalist id="makes">
            {makes.map((make, index) => (
              <option key={`${make.Make_ID}-${index}`} value={make.Make_Name} />
            ))}
          </datalist>
        </div>
        </div>

        {/* Year Input */}
        <div>
          <Label>Year</Label>
          <Input
            type="text"
            placeholder="Enter year (e.g., 2020)"
            value={formData.year}
            onChange={handleYearChange}
            className={yearError ? "border-red-500" : ""}
          />
          {yearError && <p className="text-red-500 text-sm">{yearError}</p>}
        </div>

        {/* Model Input */}
        <div>
          <Label>Vehicle Model</Label>
          <input
            list="models"
            value={searchModel}
            onChange={handleModelChange}
            placeholder="Search model..."
            className="w-full px-3 py-2 border rounded-md"
            disabled={!formData.makeId || !formData.year || !!yearError}
          />
          <datalist id="models">
            {models.map((model) => (
              <option key={model.Model_ID} value={model.Model_Name} />
            ))}
          </datalist>
        </div>

        {/* VIN Input */}
        <div>
          <Label>VIN (Optional)</Label>
          <Input
            type="text"
            placeholder="Enter VIN"
            value={formData.vin}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, vin: e.target.value }))
            }
          />
        </div>

        {/* Registration Number Input */}
        <div>
          <Label>License Plate (Optional)</Label>
          <Input
            type="text"
            placeholder="Enter License Plate"
            value={formData.registrationNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, registrationNumber: e.target.value }))
            }
          />
        </div>

        <div>
        <Label>Vehicle Type</Label>
        <select
          value={formData.vehicleType}
          onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="" disabled>Select vehicle type...</option>
          <option value="internal_combustion">Internal Combustion Engine</option>
          <option value="electric_vehicle">EV</option>
          <option value="hybrid">HYBRID</option>
          <option value="plug_in_hybrid">Plug in Hybrid</option>
          <option value="fuel_cell">Fuel Cell Ellectric</option>
          <option value="other">OTHER</option>
        </select>
      </div>

        {/* Registration Number Input */}
        <div>
          <Label>Nick Name (Required)</Label>
          <Input
            type="text"
            placeholder="Enter License Plate"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md"
          disabled={
            isSubmitting || !formData.make || !formData.model || !formData.year || !!yearError
          }
        >
          {isSubmitting ? <BeatLoader size={8} color="#fff" /> : "Continue"}
        </button>
      </form>
    </div>
  );
}
