"use client";

import { Check, CloudUpload } from "lucide-react";
import SettingsSideBar from "../../settings/components/SettingsSideBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@components/navbar/chatNav";
import api from "../../../lib/protectedapi";
import { useS3Upload } from "../../../lib/hooks/useS3Upload";
import { S3Image } from "@components/shared/S3Image";
import { useAuthStore } from "@store/useStore";

export const dynamic = "force-dynamic";

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: null,
    is_vehicle_owner: true,
    username: "",
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");
  const { user, updateProfilePics } = useAuthStore();
  const [userProfilePic, setUserProfilePic] = useState(
    user?.profile_picture ?? "/assets/icons/avatar.png"
  );

  useEffect(() => {
    const fetchUserProfile = async (retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await api.get("/auth/api/v1/users/get-profile/");
          if (response) {
            const {
              first_name,
              last_name,
              email,
              profile_picture,
              username,
              is_vehicle_owner,
            } = response;
            setFormData({
              first_name: first_name || "",
              last_name: last_name || "",
              email: email || "",
              username: username || "",
              profile_picture: null,
              is_vehicle_owner: is_vehicle_owner ?? true,
            });
            setUserProfilePic(profile_picture || "/assets/icons/avatar.png");
          }
        } catch (error) {
          if (error.response?.status === 429 && i < retries - 1) {
            await new Promise((resolve) =>
              setTimeout(resolve, delay * Math.pow(2, i))
            );
            continue;
          }
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();
      // console.log("here " , url);
      setFormData((prev) => ({ ...prev, profile_picture: url }));
    } catch (error) {
      setAlertMessage("Failed to upload image");
      setAlertType("error");
    }
  };
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setUserProfilePic(URL.createObjectURL(file));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call
      const response = await api.post("/auth/api/v1/users/update-profile/", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        profile_picture: formData.profile_picture,
      });
      console.log("API Response:", response);

      if (response) {
        console.log("pic", response.data.profile_picture);
        await updateProfilePics(response.data.profile_picture);
        setAlertMessage("Profile updated successfully!");
        setAlertType("success");

        // Wait for storage update and alert
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Redirect with retry logic for profile fetch
        const MAX_RETRIES = 3;
        let retryCount = 0;

        const redirectWithRetry = async () => {
          try {
            router.push("/settings");
          } catch (error) {
            if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
              retryCount++;
              await new Promise((resolve) =>
                setTimeout(resolve, 1000 * Math.pow(2, retryCount))
              );
              return redirectWithRetry();
            }
            throw error;
          }
        };

        await redirectWithRetry();
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      // Failure alert
      setAlertMessage("Failed to update profile. Please try again.");
      setAlertType("error");

      // Auto-hide the alert
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
              {formData.profile_picture ? (
                <S3Image
                  s3Key={formData.profile_picture}
                  width={40}
                  height={40}
                  alt="Profile"
                  className="mt-4 object-cover rounded-full"
                />
              ) : (
                <Image
                  src="/assets/icons/avatar.png"
                  width={40}
                  height={40}
                  alt="Default Profile"
                  className="mt-4 object-cover rounded-full"
                />
              )}

              <div>
                <div className="flex relative text-gray-500 cursor-pointer items-center shadow-md w-[240px] mb-3 justify-center rounded-full p-3 gap-2 bg-white">
                  <p className="text-gray-400">Upload a new image</p>
                  <CloudUpload size={15} color="gray" />
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    // disabled={isUploading}
                  />
                </div>
                {/* {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>} */}
                <p className="text-sm text-gray-400">
                  800x800 PNG, JPG recommended. Max file size: 2MB.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleEdit}
              className="w-full my-7 lg:grid grid-cols-2"
            >
              <div className="lg:mr-11">
                <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
                  First Name:
                </label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      first_name: e.target.value || "",
                    })
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
                    setFormData({
                      ...formData,
                      last_name: e.target.value || "",
                    })
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

              <div className="mb-4 lg:mr-11 flex items-center gap-2">
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
                <label className="text-gray-700 font-medium">
                  Vehicle Owner?
                </label>
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
