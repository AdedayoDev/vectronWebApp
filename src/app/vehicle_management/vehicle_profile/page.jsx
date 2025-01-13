"use client";
import Image from "next/image";
import SettingsSideBar from "../../settings/components/SettingsSideBar";

import {  Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Vehicle_Profile() {

    const router=useRouter()
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
  const [alert, setAlert] = useState('');

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

  const handleEdit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        router.push('/vehicle_management/vehicle_profile/edit_vehicle_profile')

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

  const handleDelete = () => {
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
    setAlert("Vehicle information deleted successfully.");
    setTimeout(() => setAlert(""), 3000);
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
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 w-44 text-blue-500 mb-4"
              >
                <Home size={20} />
                <h1 className="text-sm">Back to home</h1>
              </Link>
            </div>
            <h1 className="font-semibold text-2xl">Vehicle Profile</h1>
            <div>
              <section className="w-full block lg:flex mt-4 items-center gap-20">
                <div>
                  <h1 className=" font-medium text-gray-700 mb-4">Basic Information</h1>
                  <form className="w-full">
                    {["vehicleId", "type", "make", "trim", "vin"].map(
                      (field) => (
                        <div key={field}>
                          <label className="block text-gray-700 font-medium capitalize mb-1">
                            {field.replace(/([A-Z])/g, " $1")}:
                          </label>
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full lg:w-[361px] mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors[field] && (
                            <p className="text-red-500 text-sm">
                              {errors[field]}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </form>
                </div>

                <div className="mt-7 lg:mt-0">
                  <h1 className=" font-medium text-gray-700 mb-4">Additional Information</h1>
                  <form className="w-full">
                    {["nickname", "year", "model", "plate", "mileage"].map(
                      (field) => (
                        <div key={field}>
                          <label className="block text-gray-700 font-medium capitalize mb-1">
                            {field.replace(/([A-Z])/g, " $1")}:
                          </label>
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full lg:w-[361px] px-4 mb-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors[field] && (
                            <p className="text-red-500 text-sm">
                              {errors[field]}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </form>
                </div>
              </section>
              
              <div className="flex items-center justify-center mx-auto w-full gap-11 mt-6">
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 w-36 bg-blue-800 text-white font-medium rounded-full focus:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-1 w-32 font-medium border-4 border-solid border-purple-400 rounded-full focus:outline-none"
                >
                  Delete
                </button>
              </div>

            
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
