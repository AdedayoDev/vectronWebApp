// VehicleInventory.js
"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@components/ui/card";
import { toast } from "react-toastify";
import AddVehicleOnly from "../_component/AddVehicleOnly";



const VehicleInventory = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasRegisteredVehicle, setHasRegisteredVehicle] = useState(false);

  const fetchVehicledata = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles", {
        headers: {
          "Content-type": "application/json",
        },
      });
  
      const dataList = await response.data;
  
     if (dataList > 0 ){
      setVehicleList(dataList)
      setHasRegisteredVehicle(true)
     }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      toast.error("Failed to load vehicle data");
    } finally {
      setLoading(false)
    }
  };
  
  useEffect(() => {
   fetchVehicleList()
  }, []);

  // 🟢 Simulate API call with hardcoded data
  const fetchVehicleList = async () => {
    try {
      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use sample data for now
      if (sampleVehicleData.length > 0) {
        setVehicleList(sampleVehicleData);
        setHasRegisteredVehicle(true);
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

  // Fetch vehicle list when component mounts
  useEffect(() => {
    fetchVehicleList();
  }, []);

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

  // 🟢 Render vehicle table if user has registered vehicles
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Vehicle Inventory
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300">
          <thead className="bg-gray-300 text-gray-800">
            <tr>
              <th className="py-3 px-4 text-left border-b border-gray-400">
                Vehicle ID
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-400">
                Make
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-400">
                Plate Number
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-400">
                Model
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-400">
                Year
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-400">
                Colour
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {vehicleList.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
              >
                <td className="py-3 px-4">{vehicle.id}</td>
                <td className="py-3 px-4">{vehicle.make}</td>
                <td className="py-3 px-4">{vehicle.plateNumber}</td>
                <td className="py-3 px-4">{vehicle.model}</td>
                <td className="py-3 px-4">{vehicle.year}</td>
                <td className="py-3 px-4">{vehicle.colour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleInventory;
