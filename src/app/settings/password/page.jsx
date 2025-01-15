"use client";
import Image from "next/image";
import SettingsSideBar from "../components/SettingsSideBar";
import { useState } from "react";
import { Check } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Password() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [errors, setErrors] = useState({});


  const validateInputs = () => {
    const validationErrors = {};

    if (!newPassword || newPassword.length < 7) {
      validationErrors.newPassword = "New password must be at least 12 characters.";
    }

    if (!confirmPassword || confirmPassword.length < 7) {
      validationErrors.confirmPassword = "Password must be at least 12 characters.";
    }

    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        // success response
        setAlert("Password changed successfully");
        setTimeout(() => {
          setAlert("");
          router.push("/settings");
        }, 3000);
  
        // Reset form inputs
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
      } catch (error) {
        //  error response
        if (error.response && error.response.data) {
          setAlert(error.response.data.message || "An error occurred");
        } else {
          setAlert("An error occurred while updating the password");
        }
        setTimeout(() => setAlert(""), 5000);
      }
    }
  };

  const handleCancel = () => {
    router.push("/settings");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setAlert("");
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
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto">
          <SettingsSideBar />
          <div className="w-full lg:mt-0 h-[570px] lg:h-[630px]">
            <div>
              <h1 className="text-2xl font-semibold mb-6">Edit Password</h1>
              <form onSubmit={handleUpdate} className="lg:w-[80%]">
                {/* Old Password */}
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-medium mb-2">
                    Old Password:
                  </label>
                  <input
                    type={showPassword.old ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
                  />
                  <div
                    className="absolute top-[45px] right-3 cursor-pointer"
                    onClick={() => togglePasswordVisibility("old")}
                  >
                    {showPassword.old ? (
                      <Eye size={15} />
                    ) : (
                      <EyeOff size={15} />
                    )}
                  </div>
                </div>

                {/* New Password */}
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-medium mb-2">
                    New Password:
                  </label>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
                  />
                  <div
                    className="absolute top-[45px] right-3 cursor-pointer"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {showPassword.new ? (
                      <Eye size={15} />
                    ) : (
                      <EyeOff size={15} />
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Minimum 12 characters.
                  </p>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-medium mb-2">
                    Confirm Password:
                  </label>
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
                  />
                  <div
                    className="absolute top-[45px] right-3 cursor-pointer"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPassword.confirm ? (
                      <Eye size={15} />
                    ) : (
                      <EyeOff size={15} />
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Minimum 12 characters.
                  </p>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex items-center mt-11 gap-3 justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-3 bg-blue-700 text-white cursor-pointer font-medium rounded-full focus:bg-blue-500 focus:outline-none disabled:opacity-50"
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="px-4 py-2 cursor-pointer border-4 rounded-full border-purple-300 border-solid font-medium focus:bg-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
        </div>
      </section>
    </>
  );
}