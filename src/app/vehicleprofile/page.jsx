"use client";

import "./vehicleprofile.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VehicleProfile() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const [showMinCharHint, setShowMinCharHint] = useState(false);

  // Clear error messages after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      clearErrors();
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [errors, clearErrors]);

  const onSubmit = (data) => {
    toast.success("Vehicle added successfully!", {
      position: "top-right",
      autoClose: 2000,
      pauseOnHover: false,
    });

    setTimeout(() => {
      router.push("/chat");
    }, 2000);
  };

  return (
    <div>
      <ToastContainer />
      <div className="vehicle-profile-container">
        <div className="vehicle-profile-left">
          <Image
            src="/assets/images/vectron-car.png"
            alt="Vectron car"
            width={200}
            height={200}
            className="vectron-image"
          />
        </div>
        <div className="vehicle-profile-right">
          <div className="vehicle-profile-right-content">
            <h1>Create Vehicle Profile</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="vehicle-form-content"
            >
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
                  type="text"
                  placeholder="What year is it"
                  {...register("year", {
                    required: "Vehicle Year is required",
                    min: { value: 1886, message: "Year must be from 1886" },
                    max: {
                      value: new Date().getFullYear(),
                      message: "Invalid year",
                    },
                  })}
                />
                {errors.year && (
                  <p className="error-message">{errors.year.message}</p>
                )}
              </div>

              {/* Vehicle Registration Number */}
              <div className="form-group">
                <label htmlFor="registrationNumber">
                  Vehicle Registration Number
                </label>
                <input
                  id="registrationNumber"
                  type="text"
                  placeholder="Enter Number"
                  {...register("registrationNumber", {
                    required: "Registration Number is required",
                    minLength: {
                      value: 12,
                      message:
                        "Registration Number must be at least 12 characters",
                    },
                  })}
                  onFocus={() => setShowMinCharHint(true)}
                  onBlur={() => setShowMinCharHint(false)}
                />
                {showMinCharHint && (
                  <p className="hint-message">Must be at least 12 characters</p>
                )}
                {errors.registrationNumber && (
                  <p className="error-message">
                    {errors.registrationNumber.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit">Add Vehicle</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
