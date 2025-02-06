"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import {
  Truck,
  Car,
  Wrench,
  ChevronRight,
  ShieldCheck,
  FileText,
  Settings,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  MessageCircle,
  Zap,
  Cpu,
  Map,
  BookOpen,
} from "lucide-react";
import FinancialInsights from "../_component/FinancialInsights";

// Sample data structures
const vehicleInventory = [
  {
    id: "VEH-001",
    model: "Toyota Camry",
    type: "Sedan",
    status: "In Service",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15",
    mileage: 45230,
    condition: "Good",
    plateNumber: "MUS856KL",
    make: "Toyota",
    year: "2021",
    colour: "Black",
  },
  {
    id: "VEH-002",
    model: "Ford F-150",
    type: "Truck",
    status: "Available",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-05-10",
    mileage: 32450,
    condition: "Excellent",
    plateNumber: "IKD769FI",
    make: "Toyota",
    year: "2021",
    colour: "Blue",
  },
  {
    id: "VEH-003",
    model: "Tesla",
    type: "Truck",
    status: "Available",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-05-10",
    mileage: 32450,
    condition: "Excellent",
    plateNumber: "EKY5670P",
    make: "Toyota",
    year: "2021",
    colour: "Wine",
  },
];

const maintenanceSchedule = [
  {
    id: "MAINT-001",
    vehicleId: "VEH-001",
    type: "Regular Service",
    scheduledDate: "2024-04-15",
    estimatedDuration: "4 hours",
    estimatedCost: "$250",
    status: "Upcoming",
  },
];

const aiTroubleshootingCases = [
  {
    id: "CASE-001",
    vehicleId: "VEH-001",
    issue: "Engine Performance Drop",
    aiDiagnosis: "Potential fuel injection system malfunction",
    recommendedAction: "Detailed engine diagnostic test",
    confidence: "85%",
    status: "In Progress",
  },
];

const VehiclePortal = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

  //  Render Dashboard
  const renderDashboardSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 ">
      {/* Vehicle Fleet Overview */}
      <div className="bg-white shadow-lg rounded-lg p-6 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Truck className="mr-2 text-blue-500" /> Fleet Overview
          </h2>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
            {vehicleInventory.length} Vehicles
          </span>
        </div>
        <div className="space-y-3">
          {vehicleInventory.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div>
                <p className="font-medium">{vehicle.model}</p>
                <p className="text-sm text-gray-500">{vehicle.id}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  vehicle.status === "In Service"
                    ? "bg-yellow-100 text-yellow-800"
                    : vehicle.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {vehicle.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Insights */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
          <Wrench className="mr-2 text-green-500" /> Maintenance Insights
        </h2>
        <div className="space-y-3">
          {maintenanceSchedule.map((maintenance) => (
            <div key={maintenance.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">{maintenance.type}</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    maintenance.status === "Upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : maintenance.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {maintenance.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Vehicle: {maintenance.vehicleId}</p>
                <p>Estimated Cost: {maintenance.estimatedCost}</p>
                <p>Scheduled: {maintenance.scheduledDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Troubleshooting */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
          <Cpu className="mr-2 text-purple-500" /> AI Diagnostics
        </h2>
        <div className="space-y-3">
          {aiTroubleshootingCases.map((troubleCase) => (
            <div key={troubleCase.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">{troubleCase.issue}</p>
                <span
                  className={`px-2 py-1 md:px-3 md:py-2 w-5/12 text-center  rounded-full text-xs ${
                    troubleCase.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : troubleCase.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {troubleCase.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Vehicle: {troubleCase.vehicleId}</p>
                <p>AI Diagnosis: {troubleCase.aiDiagnosis}</p>
                <p>Confidence: {troubleCase.confidence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Vehicle Inventory
  const renderVehicleInventorySection = () => (
    <div className="bg-white shadow-lg rounded-lg p-6">
      

      {/* Table layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white  border-gray-300">
          {/* Table Header */}
          <thead className="bg-gray-300 text-gray-800 ">
            <tr>
              <th className="py-3 px-4 text-left border-b border-gray-400">
                VehicleID
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

          {/* Table Body */}
          <tbody className="text-gray-700">
            {vehicleInventory.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="hover:bg-gray-100 border-b border-gray-300"
              >
                <td className="py-3 px-4 flex flex-col items-center justify-center">
                  <span>{vehicle.id}</span>
                  <span>({vehicle.model})</span>
                </td>
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

  return (
    <div className="flex min-h-screen  bg-gray-100  mt-20">
      {/* Sidebar Navigation */}
      {/* Hamburger Menu (Mobile & Tablet) */}
      <div className="md:hidden fixed top-4 left-16 z-50">
        <FaBars
          className={`text-2xl text-black  shadow-lg cursor-pointer transition-transform duration-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Sidebar (Large Screens - Always Visible) */}
      <div className="hidden md:block w-64 bg-white shadow-lg">
        <div className="p-6 border-b flex items-center">
          <Image
            src="/assets/icons/Media.jpeg (1).png"
            alt="Vehicle Portal Logo"
            width={50}
            height={50}
            className="object-cover rounded-full mr-3"
          />
          <h1 className="text-xl font-bold text-gray-800">Vehicle Portal</h1>
        </div>

        <nav className="p-4 ">
          <ul className="space-y-2">
            {[
              {
                name: "Dashboard",
                icon: <Car className="mr-2" />,
                section: "dashboard",
              },
              {
                name: "Vehicle Inventory",
                icon: <Truck className="mr-2" />,
                section: "inventory",
              },
              {
                name: "Maintenance",
                icon: <Wrench className="mr-2" />,
                section: "maintenance",
              },
              {
                name: "AI Troubleshooting",
                icon: <Cpu className="mr-2" />,
                section: "ai-support",
              },
              {
                name: "Financial Insights",
                icon: <DollarSign className="mr-2" />,
                section: "financials",
              },
            ].map((item) => (
              <li
                key={item.section}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
                  activeSection === item.section
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveSection(item.section)}
              >
                {item.icon}
                {item.name}
                <ChevronRight className="ml-auto opacity-50" size={20} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar (Sliding in from Left) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition-all duration-500 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg border-r border-green-600 p-6 transform transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-end">
            <FaTimes
              className={`text-3xl text-red-600 cursor-pointer transition-transform duration-500 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Sidebar Content */}
          <div className="p-6 border-b flex items-center">
            <Image
              src="/assets/icons/Media.jpeg (1).png"
              alt="Vehicle Portal Logo"
              width={50}
              height={50}
              className="object-cover rounded-full mr-3"
            />
            <h1 className="text-xl font-bold text-gray-800">Vehicle Portal</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                {
                  name: "Dashboard",
                  icon: <Car className="mr-2" />,
                  section: "dashboard",
                },
                {
                  name: "Vehicle Inventory",
                  icon: <Truck className="mr-2" />,
                  section: "inventory",
                },
                {
                  name: "Maintenance",
                  icon: <Wrench className="mr-2" />,
                  section: "maintenance",
                },
                {
                  name: "AI Troubleshooting",
                  icon: <Cpu className="mr-2" />,
                  section: "ai-support",
                },
                {
                  name: "Financial Insights",
                  icon: <DollarSign className="mr-2" />,
                  section: "financials",
                },
              ].map((item) => (
                <li
                  key={item.section}
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
                    activeSection === item.section
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => {
                    setActiveSection(item.section);
                    setIsOpen(false);
                  }}
                >
                  {item.icon}
                  {item.name}
                  <ChevronRight className="ml-auto opacity-50" size={20} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeSection === "dashboard" && "Dashboard Overview"}
            {activeSection === "inventory" && "Vehicle Inventory"}
            {activeSection === "financials" && "Financial Insights"}
          </h1>
          <div className="flex items-center space-x-4">
            <MessageCircle className="text-gray-500 cursor-pointer" />
            <Settings className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Dynamic Content Rendering */}
        {activeSection === "dashboard" && renderDashboardSection()}
        {activeSection === "inventory" && renderVehicleInventorySection()}
        {activeSection === "financials" && <FinancialInsights activeSection={activeSection} setActiveSection={setActiveSection}/>}
      </div>
    </div>
  );
};

export default VehiclePortal;
