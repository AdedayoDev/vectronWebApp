"use client";
import Image from "next/image";
import SettingsSideBar from "../../../settings/components/SettingsSideBar";
import { Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

export const dynamic = 'force-dynamic';
export default function Vehicle_Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    vehicleId: "",
    type: "",
    make: "",
    trim: "",
    vin: "",
    nickname: "",
    year: "",
    model: "",
    plate: "",
    mileage: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");

  const validateInputs = () => {
    const validationErrors = {};
    const {
      vehicleId,
      type,
      make,
      trim,
      vin,
      nickname,
      year,
      model,
      plate,
      mileage,
    } = formData;

    // Basic Information Validation
    if (!vehicleId) validationErrors.vehicleId = "Vehicle ID is required.";
    if (!type) validationErrors.type = "Type is required.";
    if (!make) validationErrors.make = "Make is required.";
    if (!trim) validationErrors.trim = "Trim is required.";
    if (!vin) validationErrors.vin = "VIN is required.";

    // Additional Information Validation
    if (!nickname) validationErrors.nickname = "Nickname is required.";
    if (!year || isNaN(year)) validationErrors.year = "Valid year is required.";
    if (!model) validationErrors.model = "Model is required.";
    if (!plate) validationErrors.plate = "Plate is required.";
    if (!mileage || isNaN(mileage))
      validationErrors.mileage = "Valid mileage is required.";

    return validationErrors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setAlert(
        "You are all set! Your garage is looking proper and ready to manage your vehicle like a boss"
      );
      setTimeout(() => {
        setAlert(""); 
        router.push("/vehicle_management/vehicle_profile");
      }, 3000); 
    } else {
      setTimeout(() => setErrors({}), 3000);
    }

    setFormData({
      vehicleId: "",
      type: "",
      make: "",
      trim: "",
      vin: "",
      nickname: "",
      year: "",
      model: "",
      plate: "",
      mileage: "",
    });
  };

  const handleBack = () => {
    router.push("/vehicle_management/vehicle_profile");

    setFormData({
      vehicleId: "",
      type: "",
      make: "",
      trim: "",
      vin: "",
      nickname: "",
      year: "",
      model: "",
      plate: "",
      mileage: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <div className="w-full lg:mt-0 lg:h-[630px]">
            <h1 className="font-semibold text-2xl">Edit Vehicle Profile</h1>
            <div>
              <section className="w-full block lg:flex mt-4 items-center gap-20">
                <div>
                  <h1 className=" font-medium text-gray-700 mb-4">
                    Basic Information
                  </h1>
                  <form className="w-full">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Vehicle ID:
                      </label>
                      <select
                        name="vehicleId"
                        value={formData.vehicleId}
                        onChange={handleChange}
                        className="w-full text-gray-700 lg:w-[361px]  mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Vehicle ID</option>
                        <option value="V001">V001</option>
                        <option value="V002">V002</option>
                        <option value="V003">V003</option>
                      </select>
                      {errors.vehicleId && (
                        <p className="text-red-500 text-sm">
                          {errors.vehicleId}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                      Type:
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full text-gray-700 lg:w-[361px]  mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Type</option>
                        <option value="V001">V001</option>
                        <option value="V002">V002</option>
                        <option value="V003">V003</option>
                      </select>
                      {errors.type && (
                        <p className="text-red-500 text-sm">
                          {errors.type}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Make:
                      </label>
                      <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        className="w-full lg:w-[361px]  mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.make && (
                        <p className="text-red-500 text-sm">{errors.make}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Trim:
                      </label>
                      <input
                        type="text"
                        name="trim"
                        value={formData.trim}
                        onChange={handleChange}
                        className="w-full lg:w-[361px]  mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.trim && (
                        <p className="text-red-500 text-sm">{errors.trim}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        VIN:
                      </label>
                      <input
                        type="text"
                        name="vin"
                        value={formData.vin}
                        onChange={handleChange}
                        className="w-full lg:w-[361px]  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.vin && (
                        <p className="text-red-500 text-sm">{errors.vin}</p>
                      )}
                    </div>
                  </form>
                </div>

                <div className="mt-7 lg:mt-0">
                  <h1 className=" font-medium text-gray-700 mb-4">
                    Additional Information
                  </h1>
                  <form className="w-full">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Nickname:
                      </label>
                      <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        className="w-full lg:w-[361px]  mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.nickname && (
                        <p className="text-red-500 text-sm">
                          {errors.nickname}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Year:
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full text-gray-700 lg:w-[361px]  px-4 mb-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 30 }, (_, i) => (
                          <option key={2023 - i} value={2025 - i}>
                            {2025 - i}
                          </option>
                        ))}
                      </select>
                      {errors.year && (
                        <p className="text-red-500 text-sm">{errors.year}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Model:
                      </label>
                      <select
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full text-gray-700 lg:w-[361px]  mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Model</option>
                        <option value="Model A">Model A</option>
                        <option value="Model B">Model B</option>
                        <option value="Model C">Model C</option>
                      </select>
                      {errors.model && (
                        <p className="text-red-500 text-sm">{errors.model}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Plate:
                      </label>
                      <input
                        type="text"
                        name="plate"
                        value={formData.plate}
                        onChange={handleChange}
                        className="w-full lg:w-[361px]  mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.plate && (
                        <p className="text-red-500 text-sm">{errors.plate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Mileage:
                      </label>
                      <input
                        type="text"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        className="w-full lg:w-[361px]  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.mileage && (
                        <p className="text-red-500 text-sm">{errors.mileage}</p>
                      )}
                    </div>
                  </form>
                </div>
              </section>

              <div className="flex items-center justify-center mx-auto w-full gap-11 mt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 w-36 bg-blue-800 text-white font-medium rounded-full focus:bg-blue-600 focus:outline-none"
                >
                  Save
                </button>
                <button
                  onClick={handleBack}
                  className="px-6 py-1 w-32 font-medium border-4 border-solid border-purple-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Back
                </button>
              </div>

              {alert && (
                <div className="bg-slate-white-gradient p-4 fixed top-0 w-full left-0 h-screen z-50">
                  <div className="absolute w-[80%] lg:w-[30%] left-[50px] lg:left-[35%] bg-white shadow-md h-44 items-center top-[35%] mx-auto mt-3 px-3 pt-11 bg-white-500 text-center rounded-md">
                    <div className="flex justify-center mb-2">
                      <Check
                        color="white"
                        className="bg-green-600 rounded-full"
                      />
                    </div>
                    <div
                      className="absolute right-4 top-4"
                      onClick={() => setAlert('')}
                    >
                      <FaTimes size={20} />
                    </div>
                    {alert}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
