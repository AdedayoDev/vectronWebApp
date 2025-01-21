"use client";
import Image from "next/image";
import SettingsSideBar from "../../settings/components/SettingsSideBar";
import api from "@lib/protectedapi";
import { Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationModal from "../components/ComfirmationModal";

export const dynamic = "force-dynamic";
export default function Vehicle_Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
  const [basicInfo, setBasicInfo] = useState({});
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

  function handleEdit() {
    const id = searchParams.get("id");
    router.push(`/vehicle_management/vehicle_profile?id=${id}`);
  }

  const handleDelete = async () => {
    const id = searchParams.get("id");
    try {
      const response = await api.delete(`/vehicle/api/v1/vehicles/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 204) {
        setAlert("Vehicle deleted successfully!");
        setShowModal(false);

        setTimeout(() => {
          setAlert("");
          router.push("/vehicle_management/vehicle_profile_list");
        }, 3000);
      } else {
        throw new Error("Failed to delete vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error.message);

      setError(
        "An error occurred while deleting the vehicle. Please try again."
      );
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const openConfirmModal = () => {
    setShowModal(true);
  };

  //Fetch vehicle by Id
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const fetchVehicle = async () => {
        try {
          const response = await api.get(`/vehicle/api/v1/vehicles/${id}`);

          if (response.data) {
            const vehicle = response.data.vehicle;

            // Update the form data with the vehicle details
            setBasicInfo({
              vehicleId: vehicle.id || "",
              year: vehicle.year || "",
              make: vehicle.make || "",
              model: vehicle.model || "",
              vin: vehicle.vin || "",
            });

            setFormData({
              nickname: vehicle.nickname || "",
              type: vehicle.type?.toString() || "",
              trim: vehicle.trim || "",
              license_plate: vehicle.license_plate || "",
              mileage: vehicle.mileage?.toString() || "",
            });
          }
        } catch (error) {
          console.error("Error fetching Vehicle profile", error);
        }
      };

      fetchVehicle();
    }
  }, [searchParams]);

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
                href="/settings"
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
                  <h1 className=" font-medium text-gray-700 mb-4">
                    {basicInfo.make}
                  </h1>
                  <form className="w-full">
                    {Object.keys(basicInfo).length > 0 ? (
                      Object.entries(basicInfo).map(([field, value]) => {
                        // console.log(
                        //   `Rendering field: ${field} with value: ${value}`
                        // ); // Debug log
                        return (
                          <div key={field}>
                            <label className="block text-gray-700 font-medium capitalize mb-1">
                              {field.replace(/([A-Z])/g, " $1")}:
                            </label>
                            <input
                              type="text"
                              name={field}
                              value={value || ""} // Ensure value is never undefined
                              disabled
                              className="w-full lg:w-[361px] mb-3 px-4 py-2 border rounded-md bg-gray-100"
                            />
                          </div>
                        );
                      })
                    ) : (
                      <p>Loading vehicle information...</p>
                    )}
                  </form>
                </div>

                <div className="mt-7 lg:mt-0">
                  <h1 className=" font-medium text-gray-700 mb-4">
                    Additional Information
                  </h1>
                  <form className="w-full">
                    {Object.keys(formData).length > 0 ? (
                      Object.entries(formData).map(([field, value]) => {
                        // console.log(
                        //   `Rendering field: ${field} with value: ${value}`
                        // ); // Debug log
                        return (
                          <div key={field}>
                            <label className="block text-gray-700 font-medium capitalize mb-1">
                              {field.replace(/([A-Z])/g, " $1")}:
                            </label>
                            <input
                              type="text"
                              name={field}
                              value={value || ""}
                              disabled={!isEditing}
                              className="w-full lg:w-[361px] mb-3 px-4 text-black outline-none py-2 border rounded-md bg-gray-100"
                            />
                          </div>
                        );
                      })
                    ) : (
                      <p>Loading vehicle information...</p>
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
                  onClick={openConfirmModal}
                  className="px-6 py-1 w-32 font-medium border-4 border-solid border-purple-400 rounded-full focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <ConfirmationModal
            show={showModal}
            message="Are you sure you want to delete this vehicle?"
            onConfirm={handleDelete}
            onCancel={handleCancelDelete}
            button1="Cancel"
            button2="Delete"
          />
        </div>
      </section>
    </>
  );
}
