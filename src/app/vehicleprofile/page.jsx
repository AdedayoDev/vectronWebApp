"use client";

import "./vehicleprofile.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../../lib/protectedapi';

export default function VehicleProfile() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMinCharHint, setShowMinCharHint] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearErrors();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [errors, clearErrors]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const vehicleData = {
        license_plate: data.registrationNumber,
        make: data.make,
        model: data.model,
        vin: data.registrationNumber, // Using registration number as VIN
        year: parseInt(new Date(data.year).getFullYear())
      };

      const response = await api.post('/vehicle/api/v1/vehicles/create', vehicleData);

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
    } catch (error) {
      console.error('Error creating vehicle:', error);
      toast.error(error.message || "Failed to add vehicle", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="vehicle-profile-container">
        <div className="vehicle-profile-left">
          <Image
            src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png"
            alt="Vectron car"
            width={200}
            height={200}
            className="vectron-image"
          />
        </div>
        <div className="vehicle-profile-right">
          <div className="vehicle-profile-right-content">
            <h1>Create Vehicle Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="vehicle-form-content">
              {/* Vehicle Make */}
              <div className="form-group">
                <label htmlFor="make">Vehicle Make</label>
                <input
                  id="make"
                  type="text"
                  placeholder="Make of vehicle"
                  {...register("make", {
                    required: "Vehicle Make is required",
                  })}
                />
                {errors.make && (
                  <p className="error-message">{errors.make.message}</p>
                )}
              </div>

              {/* Vehicle Model */}
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  id="model"
                  type="text"
                  placeholder="What model is your car"
                  {...register("model", {
                    required: "Vehicle Model is required",
                  })}
                />
                {errors.model && (
                  <p className="error-message">{errors.model.message}</p>
                )}
              </div>

              {/* Vehicle Year */}
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  id="year"
                  type="date"
                  {...register("year", {
                    required: "Vehicle Year is required",
                  })}
                />
                {errors.year && (
                  <p className="error-message">{errors.year.message}</p>
                )}
              </div>

              {/* Vehicle Registration Number */}
              <div className="form-group">
                <label htmlFor="registrationNumber">Vehicle Registration Number</label>
                <input
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
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Adding Vehicle..." : "Add Vehicle"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}