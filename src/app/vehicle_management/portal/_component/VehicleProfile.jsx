
"use client";
import Image from "next/image";
import api from "@lib/protectedapi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../components/ComfirmationModal";

const VehicleProfile = ({ vehicleId, onBack, onDelete }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    nickname: "",
    vin: "",
    license_plate: "",
    odometer_unit: "",
    odometer: "",
  });
  
  const [basicInfo, setBasicInfo] = useState({
    vehicleId: "",
    year: "",
    make: "",
    model: "",
    type: "",
  });
  
  const [alert, setAlert] = useState("");

  async function handleEdit() {
    try {
      const editInfo = {
        name: formData.nickname,
        vin: formData.vin,
        license_plate: formData.license_plate,
        odometer_unit: formData.odometer_unit,
        odometer: formData.odometer,
        year: basicInfo.year,
        make: basicInfo.make,
        model: basicInfo.model,
        type: basicInfo.type,
      };
      
      const response = await api.put(`/vehicle/api/v1/vehicles/${vehicleId}`, editInfo);

      if (response.status_code === 200 || response.status_code === 204) {
        setAlert("Vehicle updated successfully!");
        setTimeout(() => {
          setAlert("");
          // If onBack callback is provided, use it instead of router navigation
          if (onBack) {
            onBack();
          }
        }, 2000);
      } else {
        throw new Error("Failed to update vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error.message);
      setError("An error occurred while updating the vehicle. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/vehicle/api/v1/vehicles/${vehicleId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status_code === 201 || response.status_code === 204) {
        setAlert("Vehicle deleted successfully!");
        setShowModal(false);
        
        setTimeout(() => {
          setAlert("");
          // Use the onDelete callback if provided
          if (onDelete) {
            onDelete(vehicleId);
          }
          if (onBack) {
            onBack();
          }
        }, 2000);
      } else {
        throw new Error("Failed to delete vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error.message);
      setError("An error occurred while deleting the vehicle. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const openConfirmModal = () => {
    setShowModal(true);
  };

  // Fetch vehicle by Id
  useEffect(() => {
    if (vehicleId) {
      setIsLoading(true);
      const fetchVehicle = async () => {
        try {
          const response = await api.get(`/vehicle/api/v1/vehicles/${vehicleId}`);

          if (response.data) {
            const vehicle = response.data.vehicle;

            // Update the form data with the vehicle details
            setBasicInfo({
              vehicleId: vehicle.id || "",
              year: vehicle.year || "",
              make: vehicle.make || "",
              model: vehicle.model || "",
              type: vehicle.type?.toString() || "",
            });

            setFormData({
              nickname: vehicle.name || "",
              vin: vehicle.vin || "",
              license_plate: vehicle.license_plate || "",
              odometer_unit: vehicle.odometer_unit?.toString() || "",
              odometer: vehicle.odometer?.toString() || "",
            });
          }
        } catch (error) {
          console.error("Error fetching Vehicle profile", error);
          setError("Unable to load vehicle details. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchVehicle();
    }
  }, [vehicleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div className="w-full text-center py-8">Loading vehicle details...</div>;
  }

  return (
    <div className="w-full bg-white rounded-sm shadow p-6">
      {/* Alert Messages */}
      {alert && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {alert}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-2xl">Vehicle Profile</h1>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          Back to List
        </button>
      </div>
      
      <div>
        <section className="w-full block lg:flex mt-4 items-start gap-20">
          <div>
            <h1 className="font-medium text-gray-700 mb-4">
              {basicInfo.make} {basicInfo.model}
            </h1>
            <div className="w-full">
              {Object.keys(basicInfo).length > 0 ? (
                Object.entries(basicInfo).map(([field, value]) => (
                  <div key={field} className="mb-4">
                    <label className="block text-gray-700 font-medium capitalize mb-1">
                      {field === "vehicleId" ? "Vehicle ID" : field.replace(/([A-Z])/g, " $1")}:
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={value || ""} 
                      disabled
                      className="w-full lg:w-[361px] px-4 py-2 border rounded-md bg-gray-100"
                    />
                  </div>
                ))
              ) : (
                <p>No vehicle information available.</p>
              )}
            </div>
          </div>

          <div className="mt-7 lg:mt-0">
            <h1 className="font-medium text-gray-700 mb-4">
              Additional Information
            </h1>
            <div className="w-full">
              {Object.keys(formData).length > 0 ? (
                Object.entries(formData).map(([field, value]) => (
                  <div key={field} className="mb-4">
                    <label className="block text-gray-700 font-medium capitalize mb-1">
                      {field === "nickname" ? "Name" : 
                      field === "license_plate" ? "License Plate" : 
                      field === "odometer_unit" ? "Odometer Unit" : 
                      field.replace(/([A-Z])/g, " $1")}:
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={value || ""}
                      onChange={handleChange}
                      className="w-full lg:w-[361px] px-4 text-black outline-none py-2 border rounded-md bg-gray-100"
                    />
                  </div>
                ))
              ) : (
                <p>No additional information available.</p>
              )}
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center mx-auto w-full gap-11 mt-6">
          <button
            onClick={handleEdit}
            className="px-6 py-2 w-36 bg-blue-800 text-white font-medium rounded-full hover:bg-blue-700 focus:bg-blue-600 focus:outline-none"
          >
            Update
          </button>
          <button
            onClick={openConfirmModal}
            className="px-6 py-1 w-32 font-medium border-4 border-solid border-purple-400 rounded-full hover:bg-purple-50 focus:outline-none"
          >
            Delete
          </button>
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
  );
};

export default VehicleProfile;