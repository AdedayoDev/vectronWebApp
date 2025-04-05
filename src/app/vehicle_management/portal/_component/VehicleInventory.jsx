"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import AddVehicleOnly from "../_component/AddVehicleOnly";
import api from "../../../../lib/protectedapi";

const VehicleInventory = () => {
  const [vehicleLists, setVehicleLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Fetch vehicle data
  const fetchVehicleData = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles", {
        headers: {
          "Content-type": "application/json",
        },
      });

      const dataList = response.data.vehicles;

      setVehicleLists(dataList || []);
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
  if (vehicleLists.length === 0) {
    return <AddVehicleOnly />;
  }

  return (
    <div className="p-6">
      {selectedVehicle ? (
        /** Vehicle Details View */
        <Card className="max-w-xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Vehicle Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Vehicle ID:</strong> {selectedVehicle.id}</p>
            <p><strong>Make:</strong> {selectedVehicle.make}</p>
            <p><strong>Model:</strong> {selectedVehicle.model}</p>
            <p><strong>Plate Number:</strong> {selectedVehicle.plateNumber}</p>
            <p><strong>Year:</strong> {selectedVehicle.year}</p>
            <p><strong>Colour:</strong> {selectedVehicle.colour}</p>
            <button
              onClick={() => setSelectedVehicle(null)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Back to Inventory
            </button>
          </CardContent>
        </Card>
      ) : (
        /** Vehicle Inventory List View */
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Inventory</h2>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[800px] shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full w-full bg-white border-gray-300">
                <thead className="w-full bg-gray-300 text-gray-800">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-bold border-b border-gray-400">
                      Vehicle ID
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-bold border-b border-gray-400">
                      Make
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-bold border-b border-gray-400">
                      Plate Number
                    </th>
                    <th className="hidden md:block py-3 px-4 text-left text-sm font-bold border-b border-gray-400">
                      Model
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-bold border-b border-gray-400">
                      Year
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-bold border-b border-gray-400">
                      Colour
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {vehicleLists.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                      onClick={() => setSelectedVehicle(vehicle)}
                    >
                      <td className="py-3 px-4 whitespace-nowrap text-sm">{vehicle.id}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">{vehicle.make}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">{vehicle.plateNumber}</td>
                      <td className="hidden md:block py-3 px-4 whitespace-nowrap text-sm">{vehicle.model}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">{vehicle.year}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">{vehicle.colour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleInventory;
