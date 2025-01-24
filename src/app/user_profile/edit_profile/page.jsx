"use client";

import { Check, CloudUpload } from "lucide-react";
import SettingsSideBar from "../../settings/components/SettingsSideBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@components/navbar/chatNav";
import api from "../../../lib/protectedapi";

export const dynamic = "force-dynamic";

export default function ediProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profilePic: null,
    is_vehicle_owner: true,
    username: "",
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");
  const [userProfilePic, setUserProfilePic] = useState(
    "/assets/icons/avatar.png"
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/auth/api/v1/users/get-profile/");
        if (response) {
          const { first_name, last_name, email, profile_picture, username, is_vehicle_owner } = response;
  
          setFormData({
            first_name: first_name || "",
            last_name: last_name || "",
            email: email || "",
            profilePic: null, // File input is not prefilled.
            username: username || "",
            is_vehicle_owner: is_vehicle_owner ?? true,
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
  

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setUserProfilePic(URL.createObjectURL(file));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
  
    const updatedProfileData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            username: formData.username,
     }
     // Prepare form data for the API request
     const formDataToSend = new FormData();
     formDataToSend.append("first_name", formData.first_name);
     formDataToSend.append("last_name", formData.last_name);
     formDataToSend.append("email", formData.email);
     formDataToSend.append("username", formData.username);
     formDataToSend.append("is_vehicle_owner", formData.is_vehicle_owner);
     if (formData.profilePic) {
       formDataToSend.append("profile_picture", formData.profilePic);
     }
    try {
  
      // Make the API call
      const response = await api.post("/auth/api/v1/users/update-profile/", formDataToSend);

      console.log("API Response:", response);

      if (response) {
        setAlertMessage("Profile updated successfully!");
        setAlertType("success");
  
        setTimeout(() => setAlertMessage(null), 5000);
  
        router.push("/user_profile");
      } 
    } catch (error) {
      console.error("Error updating profile:", error);
  
      // Failure alert
      setAlertMessage("Failed to update profile. Please try again.");
      setAlertType("error");
  
      // Auto-hide the alert
      setTimeout(() => setAlertMessage(null), 3000);
    }
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
          width={800}
          height={200}
          className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
        />
        <div className="block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto">
          <SettingsSideBar />
          <div className="w-full lg:mt-0 h-[630px]">
            <h1 className="font-semibold text-lg">Personal Information</h1>

            <div className="flex gap-4 mt-5 items-center">
              {userProfilePic && (
                <Image
                  src={
                    formData.profilePic
                      ? URL.createObjectURL(formData.profilePic)
                      : userProfilePic
                  }
                  width={40}
                  height={40}
                  alt="Profile Preview"
                  className="mt-4 object-cover rounded-full"
                />
              )}

              <div>
                <div className="flex relative text-gray-500 cursor-pointer items-center shadow-md w-[240px] mb-3 justify-center rounded-full p-3 gap-2 bg-white">
                  <p className="text-gray-400">Upload a new image</p>
                  <CloudUpload size={15} color="gray" />
                  <input
                    type="file"
                    onChange={handleProfilePicChange}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-400">
                  800x800 PNG, JPG recommended. Max file size: 2MB.
                </p>
              </div>
            </div>

            <form onSubmit={handleEdit} className="w-full my-7 lg:grid grid-cols-2 lg:gap-3">
  <div className="lg:mr-11">
    <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
      First Name:
    </label>
    <input
      type="text"
      value={formData.first_name}
      onChange={(e) =>
        setFormData({ ...formData, first_name: e.target.value || "" })
      }
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="lg:mr-11">
    <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
      Last Name:
    </label>
    <input
      type="text"
      value={formData.last_name}
      onChange={(e) =>
        setFormData({ ...formData, last_name: e.target.value || "" })
      }
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="mb-4 lg:mr-11">
    <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
      Email:
    </label>
    <input
      type="email"
      value={formData.email}
      disabled
      onChange={(e) =>
        setFormData({ ...formData, email: e.target.value || "" })
      }
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="lg:mr-11">
    <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
      Username:
    </label>
    <input
      type="text"
      value={formData.username}
      onChange={(e) =>
        setFormData({ ...formData, username: e.target.value || "" })
      }
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="mb-4 mt-4 lg:mt-0 lg:mr-11 flex items-center gap-2">
    <input
      type="checkbox"
      checked={formData.is_vehicle_owner}
      onChange={(e) =>
        setFormData({
          ...formData,
          is_vehicle_owner: e.target.checked,
        })
      }
      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    />
    <label className="text-gray-700 font-medium">Vehicle Owner?</label>
  </div>

  <div className="flex items-center gap-7 my-7">
    <button
      type="submit"
      className="px-4 py-2 w-36 bg-blue-800 text-white font-medium rounded-full"
    >
      Save Changes
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


            {alertMessage && (
              <div
                className={`fixed top-4 right-4 transition duration-300 ease-in z-50 px-4 py-2 rounded-md shadow-md text-white ${
                  alertType === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {alertMessage}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
