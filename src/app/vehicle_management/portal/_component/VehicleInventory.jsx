"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@components/ui/card";
import { toast } from "react-toastify";
import AddVehicleOnly from "../_component/AddVehicleOnly";
import api from "../../../../lib/protectedapi";

const VehicleInventory = ({ vehicleList }) => {
  const [vehicleLists, setVehicleLists] = useState([]);
  console.log(vehicleList);
  const [loading, setLoading] = useState(true);

  // Fetch vehicle data
  const fetchVehicleData = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles", {
        headers: {
          "Content-type": "applicaition/json",
        },
      });

      const dataList = response.data.vehicles;

      if (dataList) {
        setVehicleLists(dataList);
      } else {
        setVehicleLists([]);
      }
    } catch (error) {
      console.log("Error Fetching Vehicle data", error);
      toast.error("Failed to load vehicle data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading vehicle inventory...</div>;
  }

  // Render AddVehicleOnly if no registered vehicles
  if (vehicleList.length === 0) {
    return <AddVehicleOnly />;
  }

  // Render vehicle list if registered vehicles exist
  return (
    <div>
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
              {vehicleLists.map((vehicle) => (
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
    </div>
  );
};

export default VehicleInventory;
