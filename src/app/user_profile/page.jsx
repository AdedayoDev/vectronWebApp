"use client";

import { Check, CloudUpload } from "lucide-react";
import SettingsSideBar from "../settings/components/SettingsSideBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@components/navbar/chatNav";
import api from "../../lib/protectedapi";

export const dynamic = "force-dynamic";

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profilePic: null,
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");
  const [userProfilePic, setUserProfilePic] = useState(
    "/assets/icons/avatar.png"
  );

  // Validate inputs
  const validateInputs = () => {
    const validationErrors = {};
    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }
    return validationErrors;
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/auth/api/v1/users/get-profile/");
        if (response) {
          const { first_name, last_name, email, profile_picture } = response;

          setFormData({
            fullName: `${first_name || ""} ${last_name || ""}`.trim(),
            last_name: last_name || "",
            email: email || "",
          });

          setUserProfilePic(profile_picture || "/assets/icons/avatar.png");
        } else {
          console.warn("Response is null or undefined.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    router.push("/user_profile/edit_profile");
  };


  const handleGoHome = () => {
    router.push("/settings");
  };

  return (
    <>
      <NavBar />
      <section>
        <Image
          src="/assets/images/bg-img3.png"
          alt="Background image"
          width={20}
          height={20}
          className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
        />
        <div className="block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto">
          <SettingsSideBar />
          <div className="w-full lg:mt-0 h-[630px]">
            <h1 className="font-semibold text-lg">Personal Information</h1>

            <div className="flex gap-4 mt-5 items-center">
              <Image
                src={userProfilePic}

                width={40}
                height={40}
                alt="Profile Preview"
                className="mt-4 object-cover rounded-full"
              />
            </div>


            <form className="w-full my-7 grid">
              <div className=" lg:mr-11">
                <label className="block text-gray-700 font-medium mb-2 lg:mb-0">

                  Full Name:
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  disabled
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full lg:w-[45%] mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="mb-4 lg:mr-11">
                <label className="block text-gray-700 font-medium mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full lg:w-[45%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="flex items-center gap-7 my-7">
                <button

                  onClick={handleEdit}
                  type="button"

                  className="px-4 py-2 w-36 bg-blue-800 text-white font-medium rounded-full"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleGoHome}
                  className="px-4 py-[6px] w-36 text-gray-500 font-medium rounded-full border-2 border-purple-300"
                >
                  Go Home
                </button>
              </div>
            </form>

            {alert && (
              <div className="mt-4 p-3 bg-green-100 flex gap-3 items-center rounded-md">
                <Check color="green" />
                <p>{alert}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
