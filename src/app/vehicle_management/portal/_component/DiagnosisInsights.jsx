"use client";

import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import { BadgeCheck, Exclamation, CheckCircle, Wrench, Cpu } from "lucide-react";
import AddVehiclePrompt from "@app/vehicle_management/portal/_component/AddVehiclePrompt";
import api from "../../../../lib/protectedapi";

const DiagnosisInsights = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicle data from API
  const fetchVehicleData = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataList = response.data.vehicles;
      console.log(dataList);

      if (dataList.length > 0) {
        setVehicleList(dataList);
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading vehicle data...</div>;
  }

  // Render if no registered vehicles
  if (vehicleList.length === 0) {
    return <AddVehiclePrompt />;
  }

  // Render diagnosis insights if vehicles are registered
  const renderDiagnosisTable = () => (
    <div className="w-full bg-white rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-black bg-blue-200 w-4/12 mb-12 py-2 px-4 rounded-lg flex items-center">
        <Cpu className="mr-2" />
        Diagnosis Insights
      </h2>
      <table className="min-w-full bg-white border-t border-gray-200 shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b">Vehicle ID</th>
            <th className="py-2 px-4 border-b">Make</th>
            <th className="py-2 px-4 border-b">Model</th>
            <th className="py-2 px-4 border-b">Year</th>
            <th className="py-2 px-4 border-b">Color</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicleList.map((vehicle) => (
            <tr
              key={vehicle.id}
              className="text-gray-800 hover:bg-gray-50 transition"
            >
              <td className="py-2 px-4 border-b">{vehicle.id}</td>
              <td className="py-2 px-4 border-b">{vehicle.make}</td>
              <td className="py-2 px-4 border-b">{vehicle.model}</td>
              <td className="py-2 px-4 border-b">{vehicle.year}</td>
              <td className="py-2 px-4 border-b">{vehicle.colour}</td>
              <td className="py-2 px-4 border-b">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render Maintenance Insights
  const renderMaintenanceInsights = () => (
    <div className="w-full bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-black py-2 px-4 rounded-t-lg flex items-center">
        <Wrench className="mr-2" />
        Maintenance Insights
      </h2>
      <div className="p-6 flex flex-col items-center">
        <div className="flex items-center text-gray-700 mb-4">
          <FaCog className="text-xl mr-2" />
          <h3 className="text-lg font-semibold">AI Diagnosis</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full max-w-xl">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold text-gray-800">
              Engine Performance Drop
            </h2>
            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
              In Progress
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="block mb-1">
              Vehicle: {vehicleList[0]?.make} {vehicleList[0]?.model}
            </span>
            <p className="text-gray-800 mb-1">
              AI Diagnosis: Potential fuel injection system malfunction
            </p>
            <p className="text-gray-500">Confidence Level: 85%</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      {renderDiagnosisTable()}
      {renderMaintenanceInsights()}
    </div>
  );
};

export default DiagnosisInsights;
