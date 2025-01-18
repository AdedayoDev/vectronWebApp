"use client";
import Image from "next/image";
import SettingsSideBar from "../../settings/components/SettingsSideBar";
import api from "@lib/protectedapi";
import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmationModal from "../components/ComfirmationModal";

export const dynamic = "force-dynamic";

export default function Vehicle_Profile() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("id");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleDelete = async () => {
    if (!vehicleId) {
      setError("Vehicle ID is missing.");
      return;
    }

    try {
      const response = await api.delete(
        `/vehicle/api/v1/vehicles/${vehicleId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAlert("Vehicle deleted successfully!");
        setTimeout(() => {
          setAlert("");
          router.push("/vehicles/vehicle_profile_list");
        }, 3000);
      } else {
        setError("Failed to delete vehicle. Please try again.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      setError(
        "An error occurred while deleting the vehicle. Please try again."
      );
      setTimeout(() => setError(""), 3000);
    } finally {
      setShowModal(false);
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
    if (!vehicleId) {
      setError("Vehicle ID is missing.");
      return;
    }
    const fetchVehicleDetails = async () => {
      try {
        const response = await api.get(
          `/vehicle/api/v1/vehicles/${vehicleId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setVehicle(response.data);
          setFormData((prev) => ({
            ...prev,
            vehicleId: response.data.vehicle.id || "",
            make: response.data.vehicle.make || "",
            vin: response.data.vehicle.vin || "",
            year: response.data.vehicle.year,
            model: response.data.vehicle.model || "",
            plate: response.data.vehicle.license_plate || "",
          }));
        } else {
          setError("Vehicle details not found.");
        }
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setError("Unable to fetch vehicle details. Please try again later.");
      }
    };

    fetchVehicleDetails();
  }, [vehicleId]);

  if (error) {
    return <p className="text-lg text-red-500">{error}</p>;
  }

  if (!vehicleId) {
    return <p className="text-lg">Loading vehicle details...</p>;
  }

  //Edit Vehicle Profile
  const handleEdit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await api.post(
          `/vehicle/api/v1/vehicles/${formData.vehicleId}`,
          {
            // make: formData.make,
            // model: formData.model,
            // vin: formData.vin,
            // license_plate: formData.plate,
            // year: formData.year,
            // type: formData.type,
            // trim: formData.trim,
            // nickname: formData.nickname,
            // mileage: formData.mileage,
            ...prev,
            make: formData.make,
            vin: formData.vin,
            year: formData.year,
            model: formData.model,
            license_plate: formData.plate,
          }
        );

        if (response.status === 200) {
          setAlert("Vehicle details updated successfully!");
          setTimeout(() => setAlert(""), 3000);

          setVehicle(response.data.vehicle);
        } else {
          setAlert("Failed to update vehicle details. Please try again.");
          setTimeout(() => setAlert(""), 3000);
        }
      } catch (error) {
        console.error("Error updating vehicle details:", error);
        setAlert("An error occurred while updating. Please try again.");
        setTimeout(() => setAlert(""), 3000);
      }
    } else {
      setTimeout(() => setErrors({}), 3000);
    }
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
                    Basic Information
                  </h1>
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
                  <h1 className=" font-medium text-gray-700 mb-4">
                    Additional Information
                  </h1>
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
                  onClick={openConfirmModal}
                  className="px-6 py-1 w-32 font-medium border-4 border-solid border-purple-400 rounded-full focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Custom Confirmation Modal */}
          <ConfirmationModal
            show={showModal}
            message="Are you sure you want to delete this vehicle?"
            onConfirm={handleDelete}
            onCancel={handleCancelDelete}
            button1="Cancel"
            button2="Confirm"
          />
        </div>
      </section>
    </>
  );
}
