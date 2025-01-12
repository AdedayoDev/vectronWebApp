"use client";
import Image from "next/image";
import SettingsSideBar from "../components/SettingsSideBar";
import { useState } from "react";
import { Check } from "lucide-react";
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

    if (!newPassword || newPassword.length < 12) {
      validationErrors.newPassword =
        "New password must be at least 12 characters.";
    }

    if (!confirmPassword || confirmPassword.length < 12) {
      validationErrors.confirmPassword =
        "Password must be at least 12 characters.";
    }

    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setAlert("Password changed successfully");
      setTimeout(() => {
        setAlert("");
        router.push("/settings");
      }, 3000);
      // Reset form inputs
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto ">
          <SettingsSideBar />
          <div className="w-full lg:mt-0 h-[570px] lg:h-[630px]">
            <div>
              <h1 className="text-2xl font-semibold mb-6">Edit Password</h1>
              <form onSubmit={handleUpdate} className="lg:w-[80%]">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Old Password:
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    New Password:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Minimum 12 characters.
                  </p>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
                  />
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
                    className="px-5 py-3 bg-blue-700 text-white cursor-pointer font-medium rounded-full focus:bg-blue-500 focus:outline-none"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 cursor-pointer border-4 rounded-full border-purple-300 border-solid font-medium  focus:bg-red-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
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
