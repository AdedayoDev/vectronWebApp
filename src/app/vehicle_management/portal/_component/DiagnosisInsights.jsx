"use client";

import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa"; // Settings icon
import { BadgeCheck, Exclamation, CheckCircle, Wrench, Cpu } from "lucide-react"; // Icons for status and headers
import Link from "next/link";
import  AddVehiclePrompt from "@app/vehicle_management/portal/_component/AddVehiclePrompt";
import ComingSoonOverlay from './ComingSoon1';

const DiagnosisInsights = () => {
  
  const [vehicleList, setVehicleList] = useState([
    
    { id: "VEH-001", model: "Toyota Camry", make: "Toyota" },
    { id: "VEH-002", model: "Ford F-150", make: "Ford" },
  ]);

  // Static data for diagnosis insights
  const diagnosisData = [
    {
      title: "Coolant Level",
      diagnosis: "Low coolant level detected, please check your reservoir",
      priority: "Warning",
      issueId: "F110",
      confidence: "85%",
      status: "Due for service",
    },
    {
      title: "Oil Change",
      diagnosis: "Low oil level detected, please check your reservoir",
      priority: "Caution",
      issueId: "F111",
      confidence: "70%",
      status: "Due for service",
    },
    {
      title: "Brake Fluid",
      diagnosis: "Low brake fluid level detected, please check your reservoir",
      priority: "Caution",
      issueId: "F112",
      confidence: "80%",
      status: "Pending",
    },
    {
      title: "Engine Performance",
      diagnosis: "Low oil level detected, please check your reservoir",
      priority: "Good",
      issueId: "F113",
      confidence: "80%",
      status: "Done",
    },
  ];

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
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Diagnosis Report</th>
            <th className="py-2 px-4 border-b">Priority</th>
            <th className="py-2 px-4 border-b">Issue ID</th>
            <th className="py-2 px-4 border-b">Confidence Level</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {diagnosisData.map((item) => (
            <tr
              key={item.issueId}
              className="text-gray-800 hover:bg-gray-50 transition"
            >
              <td className="py-2 px-4 border-b">{item.title}</td>
              <td className="py-2 px-4 border-b">{item.diagnosis}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.priority === "Warning"
                      ? "bg-red-100 text-red-800"
                      : item.priority === "Caution"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {item.priority}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{item.issueId}</td>
              <td className="py-2 px-4 border-b">{item.confidence}</td>
              <td className="py-2 px-4 border-b">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render Maintenance Insights
  const renderMaintenanceInsights = () => (
    <div className="w-full bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-black  py-2 px-4 rounded-t-lg flex items-center">
        <Wrench className="mr-2" />
        Maintenance Insights
      </h2>
      <div className="p-6 flex flex-col items-center">
        <div className="flex items-center text-gray-700 mb-4">
          <FaCog className="text-xl mr-2" />
          <h3 className="text-lg font-semibold ">AI Diagnosis</h3>
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
            <span className="block mb-1">Vehicle: Toyota Camry</span>
            <p className="text-gray-800 mb-1">
              AI Diagnosis: Potential fuel injection system malfunction
            </p>
            <p className="text-gray-500">Confidence Level: 85%</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Conditional rendering based on whether vehicles are registered
  return (
    <ComingSoonOverlay title="Maintenance Dashboard">
    <div className="min-h-screen p-6">
      {vehicleList.length > 0 ? (
        <>
          {renderDiagnosisTable()}
          {renderMaintenanceInsights()}
        </>
      ) : (
        <AddVehiclePrompt /> 
      )}
    </div>
    </ComingSoonOverlay>
  );
};

export default DiagnosisInsights;
