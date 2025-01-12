"use client";
import { Check, CloudUpload } from "lucide-react";
import SettingsSideBar from "../settings/components/SettingsSideBar";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");

  const validateInputs = () => {
    const validationErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full name is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    // Phone Number validation
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must be 10-15 digits.";
    }

    // Location validation
    if (!formData.location.trim()) {
      validationErrors.location = "Location is required.";
    }

    return validationErrors;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setAlert("Profile updated successfully!");
      setTimeout(() => setAlert(""), 3000);
    }
    //Reset forms
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      location: "",
    });
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <>
      <section>
        <Image
          src="/assets/images/bg-img3.png"
          alt="Background image"
          width={20}
          height={20}
          className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
        />
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto ">
          <SettingsSideBar />
          <div className="w-full lg:mt-0 h-[630px]">
            <h1 className="font-semibold text-lg">Personal Information</h1>

            <div className="flex gap-4 mt-5 items-center">
              <div>
                <Image
                  src="/assets/icons/avatar.png"
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="flex text-gray-500 cursor-pointer items-center shadow-md w-[240px] mb-3 justify-center rounded-full p-3 gap-2">
                  <p>Upload a new image</p>
                  <CloudUpload size={15} color="black" />
                </div>
                <p className="lg:text-base w-[80%] text-gray-400 text-sm">
                  800x800 PNG, JPG is recommended. Maximum file size: 2Mb
                </p>
              </div>
            </div>

            <form
              onSubmit={handleEdit}
              className="lg:grid grid-cols-2 w-[80%] gap-10 items-center"
            >
              <div className="my-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name:
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="mb-4 lg:mb-0">
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number:
                </label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="mb-4 lg:mb-0">
                <label className="block text-gray-700 font-medium mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4 lg:mb-0">
                <label className="block text-gray-700 font-medium mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <div className="flex items-center gap-7 my-7 justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 cursor-pointer w-28 bg-blue-800 text-white font-medium rounded-full focus:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleGoHome}
                  className="px-4 py-[6px] text-gray-500 cursor-pointer font-medium rounded-full focus:bg-gray-600 focus:outline-none ring-2 ring-gray-500"
                >
                  Go Home
                </button>
              </div>
            </form>

            {/* Alert */}
            {alert && (
              <div className="mt-4 p-3 bg-customGreen flex gap-3 items-center absolute right-3 top-0 w-[60%] lg:w-[25%] text-center rounded-md">
                <div className="bg-green-600 rounded-full">
                  <Check color="white" />
                </div>

                {alert}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
