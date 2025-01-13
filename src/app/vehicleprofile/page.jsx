"use client";

import "./vehicleprofile.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function VehicleProfile() {
  const year = new Date();
  const getYear = year.getFullYear();
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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://api-staging.vechtron.com/auth/api/v1/auth/account/vehicle-owner-status",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Vehicle added successfully!", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false,
      });

      // Redirect to the /chat page after a successful update
      setTimeout(() => {
        router.push("/chatmessage");
      }, 2000);
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add vehicle. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: false,
        }
      );
    }
  };

  return (
    <div className="w-full h-screen">
      <ToastContainer />
      <div className="flex w-full h-screen ">
        {/* Left Section with Background Image and Overlay */}
        <section
          className="hidden lg:block w-1/2 h-full relative"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#42307D",
              opacity: 0.9,
            }}
          >
            <div className=" p-10 flex  flex-col justify-between items-start w-full h-full">
              <div>
                <Image
                  src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>

              <div>
                <p className="font-inter font-normal text-sm text-[#e0d7fe]">
                  &copy; Docvantage UI {getYear}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="w-1/2">
          <div className="vehicle-profile-right-content w-full ">
            <h1>Create Vehicle Profile</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="vehicle-form-content overflow-y-auto w-full "
            >
              {/* Vehicle Make */}
              <div className="form-group  w-full">
                <label htmlFor="make">Vehicle Make</label>
                <input
                  id="make"
                  type="text"
                  className="w-full max-w-[800px] px-4 py-2 border border-gray-300 rounded"
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
                  className="w-full max-w-[800px] px-4 py-2 border border-gray-300 rounded"
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
                  className="w-full max-w-[800px] px-4 py-2 border border-gray-300 rounded"
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
                  className="w-full max-w-[800px] px-4 py-2 border border-gray-300 rounded"
                  placeholder="Enter Number"
                />
              </div>

              {/* Vehicle Registration Number */}
              <div className="form-group">
                <label htmlFor="registrationNumber">Current Mileage</label>
                <input
                  id="registrationNumber"
                  className="w-full max-w-[800px] px-4 py-2 border border-gray-300 rounded"
                  type="number"
                  placeholder="Enter Number"
                />
              </div>

              {/* Vehicle Registration Number */}
              <div className="form-group">
                <label htmlFor="registrationNumber">Last Oil Change Date</label>
                <input
                  id="registrationNumber"
                  type="date"
                  placeholder="Enter Number"
                />
              </div>

              {/* Vehicle Registration Number */}
              <div className="form-group">
                <label htmlFor="registrationNumber">Any warnings?</label>
                <input
                  id="registrationNumber"
                  type="number"
                  placeholder="Enter Number"
                />
              </div>

              {/* Vehicle Registration Number */}
              <div className="form-group">
                <label htmlFor="registrationNumber">
                  Unusual Noises/Vibrations
                </label>
                <input
                  id="registrationNumber"
                  type="text"
                  placeholder="Enter Number"
                  // {...register("registrationNumber", {
                  //   required: "Registration Number is required",
                  //   minLength: {
                  //     value: 12,
                  //     message:
                  //       "Registration Number must be at least 12 characters",
                  //   },
                  // })}
                  onFocus={() => setShowMinCharHint(true)}
                  onBlur={() => setShowMinCharHint(false)}
                />
                {/* {showMinCharHint && (
                  <p className="hint-message">Must be at least 12 characters</p>
                )} */}
                {errors.registrationNumber && (
                  <p className="error-message">
                    {errors.registrationNumber.message}
                  </p>
                )}
              </div>

              {/* Vehicle Registration Number */}
              <div className="form-group">
                <label htmlFor="registrationNumber">
                  Fuel Efficiency Issues?
                </label>
                <input
                  id="registrationNumber"
                  type="number"
                  placeholder="Enter Number"
                  // {...register("registrationNumber", {
                  //   required: "Registration Number is required",
                  //   minLength: {
                  //     value: 12,
                  //     message:
                  //       "Registration Number must be at least 12 characters",
                  //   },
                  // })}
                  onFocus={() => setShowMinCharHint(true)}
                  onBlur={() => setShowMinCharHint(false)}
                />
                {/* {showMinCharHint && (
                  <p className="hint-message">Must be at least 12 characters</p>
                )} */}
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
