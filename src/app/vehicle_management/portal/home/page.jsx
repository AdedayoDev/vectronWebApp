"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import {
  Car,
  Truck,
  Wrench,
  Cpu,
  DollarSign,
  MessageCircle,
  Settings,
  ClipboardList,
} from "lucide-react"; // ClipboardList for vehicle profile icon

import { FaIdCard } from "react-icons/fa";
import api from "../../../../lib/protectedapi";

import FinancialInsights from "../_component/FinancialInsights";
import MaintenancePage from "../_component/Maintenace";
import VechtronDashboard from "../../../../app/test/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/useStore";
import DiagnosisInsights from "@app/vehicle_management/portal/_component/DiagnosisInsights";
import AddVehicleOnly from "../_component/AddVehicleOnly";
import { toast } from "react-toastify";
import VehicleInventory from "../_component/VehicleInventory";
import VehicleProfileList from "../_component/VehicleProfileList";

const VehiclePortal = () => {
  const [activeSection, setActiveSection] = useState("vehicleDashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedVehicleData, setSelectedVehicleData] = useState(null);
  const { user } = useAuthStore();
  const router = useRouter();
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const isVehicleOwner = user?.is_vehicle_owner ?? false;

  const renderVehicleSection = () => {
    return isVehicleOwner ? (
      <VehicleInventory vehicleList={vehicleList} />
    ) : (
      <AddVehicleOnly />
    );
  };
  const fetchVehicleList = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.status_code != 200) {
        throw new Error("Failed to fetch vehicle list");
      }
      const data = await response.data.vehicles;
      setVehicleList(data);
      return data;
    } catch (error) {
      console.error("Error fetching vehicle list:", error);
      toast.error("Failed to load vehicle list");
      return [];
    }
  };
  // Function to fetch vehicle data from backend
  const fetchVehicleData = async (vehicleId) => {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`);
      const data = await response.json();
      //   setSelectedVehicleData(data);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  // useEffect(() => {
  //   if (activeSection === "profile") {
  //     if (vehicleList.length > 0) {
  //       router.push("/vehicle_management/vehicle_profile_list");
  //     } else {
  //       router.push("/vehicle_management/add_vehicle_profile");
  //     }
  //   }
  // }, [activeSection, vehicleList]);
  
  // Handle vehicle selection from dropdown
  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    fetchVehicleData(vehicleId);
  };
  useEffect(() => {
    const initializeDashboard = async () => {
      const vehicles = await fetchVehicleList();
      if (vehicles.length > 0) {
        // setSelectedVehicle(vehicles[0].id);
        await fetchVehicleData(vehicles[0].id);
      }
    };

    initializeDashboard();
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Main Flex Container */}
      <div className="w-full md:w-11/12 mx-auto flex min-h-screen">
        {/* Sidebar (Always Visible on Large Screens) */}
        <div
          className={`bg-white hidden md:block shadow-lg transition-all duration-300 ${
            isCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Sidebar Header */}
          <div
            className={`bg-white hidden md:block shadow-lg transition-all duration-300 ${
              isCollapsed ? "w-20" : "w-64"
            }`}
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b flex justify-between items-center">
              {!isCollapsed && (
                <h1 className="text-xl font-bold text-gray-800">
                  Vehicle Portal
                </h1>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-10 h-10 flex justify-center items-center rounded-lg bg-transparent hover:bg-gray-300 transition"
              >
                {/* Collapsible Icon */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="4"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <line
                    x1="15"
                    y1="5"
                    x2="15"
                    y2="19"
                    stroke="black"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar Navigation Items */}
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                {
                  name: "Vehicle Dashboard",
                  icon: <Car />,
                  section: "vehicleDashboard",
                  comingSoon: false,
                },
                {
                  name: "Vehicle Inventory",
                  icon: <Truck />,
                  section: "inventory",
                  comingSoon: false,
                },
                {
                  name: "Vehicle Profiles",
                  icon: <ClipboardList />, // changed icon here
                  section: "profile",
                  comingSoon: false,
                },
                {
                  name: "Maintenance",
                  icon: <Wrench />,
                  section: "maintenance",
                  comingSoon: true,
                },
                {
                  name: "AI Troubleshooting",
                  icon: <Cpu />,
                  section: "ai-support",
                  comingSoon: true,
                },
                {
                  name: "Financial Insights",
                  icon: <DollarSign />,
                  section: "financials",
                  comingSoon: true,
                },
              ].map((item) => (
                <li
                  key={item.section}
                  className={`flex items-center p-2 rounded-lg cursor-pointer justify-between transition ${
                    activeSection === item.section
                      ? "bg-[#1E3A8A] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveSection(item.section)}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className="transition-all duration-200 ease-in-out  group-hover:translate-x-1" // Icon hover animation
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      {item.comingSoon && (
                        <Image
                        src="/assets/icons/work-progress_8721365.png"
                        width={22}
                        height={22}
                        alt="Chat Icon"
                      />
                      )}
                    </div>
                  )}
                  {!isCollapsed && (
                    <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition-all duration-200" />
                  )}
                </li>
              ))}

              <li
                className="flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 text-gray-700 group"
                onClick={() => router.push("/chat/chatdetail")}
              >
                {/* Icon + Text */}
                <div className="flex items-center space-x-3">
                  <span className="transition-all duration-200 ease-in-out  group-hover:translate-x-1">
                    <Image
                      src="/assets/icons/Media.jpeg (1).png"
                      width={22}
                      height={22}
                      alt="Chat Icon"
                    />
                  </span>
                  {!isCollapsed && <span>Vechtron Chat</span>}
                </div>

                {!isCollapsed && (
                  <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition-all duration-200" />
                )}
              </li>
            </ul>
          </nav>
        </div>{" "}
        {/* Main Content Area (Fixing the Layout) */}
        <div className="flex-1 p-8  min-h-screen">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeSection === "dashboard" && "Dashboard Overview"}
              {activeSection === "profile" && "Vehicle Profiles"}
              {activeSection === "inventory" && "Vehicle Inventory"}
              {activeSection === "financials" && "Financial Insights"}
              {activeSection === "ai-support" && "AI Troubleshooting"}
            </h1>
          </div>

          {/* Dynamic Content Rendering */}
          {/* {activeSection === "dashboard" && renderDashboardSection()} */}
          {/* {activeSection === "profile" &&
            vehicleList.length > 0 &&
            router.push("/vehicle_management/vehicle_profile_list")}
          {activeSection === "profile" &&
            vehicleList.length === 0 &&
            router.push("/vehicle_management/add_vehicle_profile")} */}
          {activeSection === "profile" && (
            
              vehicleList.length > 0 ? (
                <VehicleProfileList vehicleList={vehicleList} />
              ) : (
                <AddVehicleOnly />
              )
            
          )}
          {activeSection === "inventory" && (
            <VehicleInventory vehicleList={vehicleList} />
          )}
          {activeSection === "maintenance" && <MaintenancePage />}
          {activeSection === "financials" && <FinancialInsights />}
          {activeSection === "ai-support" &&
            (vehicleList.length > 0 ? (
              <DiagnosisInsights vehicleList={vehicleList} />
            ) : (
              <AddVehicleOnly />
            ))}
          {activeSection === "vehicleDashboard" && <VechtronDashboard />}
        </div>
      </div>
    </div>
  );
};

export default VehiclePortal;
