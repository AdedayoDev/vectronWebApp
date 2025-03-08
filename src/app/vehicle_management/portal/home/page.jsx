"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import {
  Truck,
  Car,
  Wrench,
  Settings,
  DollarSign,
  MessageCircle,
  Cpu,
} from "lucide-react";

import FinancialInsights from "../_component/FinancialInsights";
import VechtronDashboard from "../../../../app/test/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/useStore";
import DiagnosisInsights from "@app/vehicle_management/portal/_component/DiagnosisInsights";
import AddVehicleOnly from "../_component/AddVehicleOnly";
import api from "../../../../../src/lib/Api";
import { toast } from "react-toastify";
import VehicleInventory from "../_component/VehicleInventory";

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
    fetchVehicleList(data);
    return data;
  } catch (error) {
    console.error("Error fetching vehicle list:", error);
    toast.error("Failed to load vehicle list");
    return [];
  }
};

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
    if (isVehicleOwner) {
      return renderVehicleSection();
    } else {
      return <AddVehicleOnly />;
    }
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
  //  Render Dashboard
  // const renderDashboardSection = () => (
  //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 border border-red-500">
  //     {/* Alerts and Maintenance Schedule Side by Side */}
  //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 col-span-2">
  //       {/* Alerts */}
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Alerts</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="space-y-4">
  //             {vehicleData.alerts.map((alert) => (
  //               <div
  //                 key={alert.id}
  //                 className={`p-4 rounded-lg flex items-center justify-between ${
  //                   alert.type === "critical"
  //                     ? "bg-red-100 border border-red-300"
  //                     : alert.type === "warning"
  //                     ? "bg-yellow-50 border border-yellow-300"
  //                     : "bg-blue-100 border border-blue-300"
  //                 }`}
  //               >
  //                 <div className="flex items-center space-x-3">
  //                   <AlertTriangle
  //                     className={`h-5 w-5 ${
  //                       alert.type === "critical"
  //                         ? "text-red-500"
  //                         : alert.type === "moderate"
  //                         ? "text-yellow-500"
  //                         : "text-blue-500"
  //                     }`}
  //                   />
  //                   <div>
  //                     <p className="font-medium text-gray-900">
  //                       {alert.message}
  //                     </p>
  //                     <p className="text-sm text-gray-500">
  //                       {alert.component} | {alert.time}
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </CardContent>
  //       </Card>

  //       {/* Maintenance Schedule */}
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Maintenance Schedule</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="space-y-4">
  //             {vehicleData.maintenanceschedule.map((title, index) => (
  //               <div
  //                 key={index}
  //                 className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
  //               >
  //                 <div>
  //                   <p className="font-medium text-gray-900">{title}</p>
  //                   <p className="text-sm text-gray-500">
  //                     Click the calendar to set a reminder
  //                   </p>
  //                 </div>
  //                 <button onClick={() => setShowCalendar(title)}>
  //                   <Calendar className="h-5 w-5 text-[#000000] cursor-pointer" />
  //                 </button>
  //               </div>
  //             ))}
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>

  //     {/* Charts Section Directly Below Alerts and Maintenance */}
  //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 col-span-2">
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Performance Metrics</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="h-80">
  //             <ResponsiveContainer width="100%" height="100%">
  //               <BarChart data={performanceData}>
  //                 <CartesianGrid strokeDasharray="3 3" />
  //                 <XAxis dataKey="name" />
  //                 <YAxis />
  //                 <Tooltip />
  //                 <Legend />
  //                 <Bar
  //                   dataKey="mileage"
  //                   fill="#8884d8"
  //                   name="Monthly Mileage"
  //                 />
  //               </BarChart>
  //             </ResponsiveContainer>
  //           </div>
  //         </CardContent>
  //       </Card>

  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Vehicle Health Monitoring</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <div className="h-80">
  //             <ResponsiveContainer width="100%" height="100%">
  //               <LineChart data={performanceData}>
  //                 <CartesianGrid strokeDasharray="3 3" />
  //                 <XAxis dataKey="name" />
  //                 <YAxis />
  //                 <Tooltip />
  //                 <Legend />
  //                 <Line
  //                   type="monotone"
  //                   dataKey="health"
  //                   stroke="#10B981"
  //                   name="Health Score"
  //                 />
  //                 <Line
  //                   type="monotone"
  //                   dataKey="efficiency"
  //                   stroke="#3B82F6"
  //                   name="Efficiency"
  //                 />
  //               </LineChart>
  //             </ResponsiveContainer>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </div>
  // );

  // // Vehicle Inventory Section
  const renderVehicleInventorySection = () => (
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

  return (
    <div className=" w-full bg-white">
      <div className="w-11/12 mx-auto flex min-h-screen ">
        {/* Sidebar (Large Screens - Always Visible) */}
        <div
          className={`bg-white shadow-lg transition-all duration-300 ${
            isCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b flex justify-between items-center">
            {/* Vehicle Portal Text */}
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-800">
                Vehicle Portal
              </h1>
            )}

            {/* Collapsible Icon */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-10 h-10 flex justify-center items-center rounded-lg bg-transparent hover:bg-gray-300 transition"
            >
              {/* Custom Collapsible Icon (Rounded Square with Partition) */}
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

          {/* Sidebar Navigation Items */}
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                {
                  name: "Vehicle Dashboard",
                  icon: <Car />,
                  section: "vehicleDashboard",
                },
                {
                  name: "Vehicle Inventory",
                  icon: <Truck />,
                  section: "inventory",
                },
                {
                  name: "Maintenance",
                  icon: <Wrench />,
                  section: "maintenance",
                },
                {
                  name: "AI Troubleshooting",
                  icon: <Cpu />,
                  section: "ai-support",
                },
                {
                  name: "Financial Insights",
                  icon: <DollarSign />,
                  section: "financials",
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
                  {!isCollapsed && <span>Chat With Vechtron</span>}
                </div>

                {!isCollapsed && (
                  <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition-all duration-200" />
                )}
              </li>
            </ul>
          </nav>
        </div>{" "}
        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeSection === "dashboard" && "Dashboard Overview"}
              {activeSection === "inventory" && "Vehicle Inventory"}
              {activeSection === "financials" && "Financial Insights"}
              {activeSection === "ai-support" && "AI Troubleshooting"}
            </h1>
            <div className="flex items-center space-x-4">
              <select
                className="bg-white border px-4 py-2 rounded-lg shadow-md cursor-pointer text-gray-700"
                onChange={(e) => handleVehicleSelect(e.target.value)}
                value={selectedVehicleId || ""}
              >
                {vehicleInventory.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.id} - {vehicle.model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Content Rendering */}
          {activeSection === "dashboard" && renderDashboardSection()}
          {activeSection === "inventory" && <VehicleInventory />}

          {activeSection === "financials" && (
            <FinancialInsights
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          )}
          {activeSection === "ai-support" &&
            (vehicleList.length > 0 ? (
              <DiagnosisInsights
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                vehicleList={vehicleList}
              />
            ) : (
              <AddVehicleOnly />
            ))}

          {activeSection === "vehicleDashboard" && (
            <VechtronDashboard
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          )}
          {activeSection === "Vehicle Inventory" && (
            <VehicleInventory
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VehiclePortal;
