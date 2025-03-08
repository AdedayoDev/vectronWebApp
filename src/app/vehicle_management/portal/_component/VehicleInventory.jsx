// VehicleInventory.js
"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@components/ui/card";
import { toast } from "react-toastify";
import api from "@lib/Api";  // Ensure the import path is correct
import AddVehicleOnly from "../_component/AddVehicleOnly";

// Function to check if a vehicle has a complete profile
const hasCompleteProfile = (vehicle) => {
  // Check if essential fields are filled out
  return (
    vehicle.model &&
    vehicle.type &&
    vehicle.plateNumber &&
    vehicle.status &&
    vehicle.make &&
    vehicle.year &&
    vehicle.colour
  );
};

const VehicleInventory = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedVehicleData, setSelectedVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRegisteredVehicle, setHasRegisteredVehicle] = useState(false);

  // Fetch vehicle list from the server
  const fetchVehicleList = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles", {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch vehicle list");
      }
      const data = response.data.vehicles;

      if (data.length > 0) {
        setVehicleList(data);
        setHasRegisteredVehicle(true);
        setSelectedVehicleId(data[0].id); // Select first vehicle by default
      } else {
        setHasRegisteredVehicle(false);
      }
    } catch (error) {
      console.error("Error fetching vehicle list:", error);
      toast.error("Failed to load vehicle list");
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed vehicle data
  const fetchVehicleData = async (vehicleId) => {
    try {
      const response = await api.get(`/vehicle/api/v1/vehicles/${vehicleId}`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;

      if (hasCompleteProfile(data)) {
        setSelectedVehicleData(data);
      } else {
        toast.warn("Incomplete vehicle profile. Please update your vehicle information.");
        setSelectedVehicleData(null);
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      toast.error(`Failed to load data for vehicle ${vehicleId}`);
    }
  };

  // Fetch vehicle list when component mounts
  useEffect(() => {
    fetchVehicleList();
  }, []);

  // Fetch selected vehicle data when selection changes
  useEffect(() => {
    if (selectedVehicleId) {
      fetchVehicleData(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  // Render loading state
  if (loading) {
    return <div>Loading vehicle inventory...</div>;
  }

  // Render if no registered vehicles
  if (!hasRegisteredVehicle) {
    return <AddVehicleOnly />;
  }

  // Render if registered but no valid data
  if (vehicleList.length === 0) {
    return <AddVehicleOnly />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vehicleList.map((vehicle) => (
        <Card key={vehicle.id} className="p-4 shadow-lg rounded-lg">
          <h2 className="font-bold text-lg">{vehicle.model}</h2>
          <p>Type: {vehicle.type}</p>
          <p>Plate Number: {vehicle.plateNumber}</p>
          <p>Status: {vehicle.status}</p>
          <button
            onClick={() => handleVehicleSelect(vehicle.id)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            View Details
          </button>
        </Card>
      ))}
    </div>
  );
};

export default VehicleInventory;
