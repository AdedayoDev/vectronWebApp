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
    is_vehicle_owner: true,
    phone: "",
    location: "",
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
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      validationErrors.phone = "Invalid phone number. Enter 10-15 digits only.";
    }

    if (!formData.location.trim()) {
      validationErrors.location = "Location is required.";
    }
    return validationErrors;
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/auth/api/v1/users/get-profile/");

        if (response) {
          const {
            first_name,
            last_name,
            email,
            profile_picture,
            phone,
            location,
          } = response;

          const updatedData = {
            fullName: `${first_name} ${last_name}`,
            email: email,
            profilePic: null,
            phone: phone || "",
            location: location || "",
          };

          setFormData(updatedData);
          setUserProfilePic(profile_picture || "/assets/icons/avatar.png");
        } else {
          console.warn("Response is null or undefined.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        console.log("Error details:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setUserProfilePic(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleEdit = async (e) => {
    e.preventDefault();

    // Split fullName into first_name and last_name
    const [first_name, ...lastNameArr] = formData.fullName.split(" ");
    const last_name = lastNameArr.join(" ");

    const updatedProfileData = {
      first_name,
      last_name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", first_name);
    formDataToSend.append("last_name", last_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("location", formData.location);
    formDataToSend.append(
      "profile_picture",
      userProfilePic instanceof File ? userProfilePic : null
    );
    console.log("Payload sent:", updatedProfileData);

    try {
      const response = await api.post(
        "/auth/api/v1/users/update-profile/",
        updatedProfileData
      );
      console.log("Server response:", response);
      alert("Profile updated successfully!");

      if (response.status === 200 || response.status === 201) {
        alert("Profile updated successfully!");

        // Update form data with the latest changes
        setFormData((prevState) => ({
          ...prevState,
          fullName: `${response.data.first_name} ${response.data.last_name}`,
        }));
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserProfilePic(file);
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
              {userProfilePic && (
                    <Image
                      src={
                        userProfilePic instanceof File
                          ? URL.createObjectURL(userProfilePic)
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
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-400">
                  800x800 PNG, JPG recommended. Max file size: 2MB.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleEdit}
              className="w-full my-7 lg:grid grid-cols-2"
            >
              <div className=" lg:mr-11">
                <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
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

              <div className="mb-4 lg:mr-11">
                <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
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

              <div className=" lg:mr-11">
                <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
                  Phone:
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className=" lg:mr-11">
                <label className="block text-gray-700 font-medium mb-2 lg:mb-0">
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

              <div className="flex items-center gap-7 my-7">
                <button
                  type="submit"
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
