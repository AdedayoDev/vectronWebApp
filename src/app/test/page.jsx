"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GraphCard from "@app/vehicle_management/portal/_component/GraphCard";
import { graphs } from "@app/vehicle_management/portal/_component/Graph";
import VehicleMaintenanceDashboard from "@app/vehicle_management/portal/_component/DashboardChart";
import CalendarPopUp from "../vehicle_management/portal/_component/CalendarPopup";
import ReminderForm from "../vehicle_management/portal/_component/ReminderForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceHistoryChat from "../vehicle_management/portal/_component/ServiceHistoryChat";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  AlertTriangle,
  Activity,
  Gauge,
  Bell,
  Calendar,
  Car,
  HeartPulseIcon,
  GaugeCircle,
} from "lucide-react";
import api from "../../lib/protectedapi";

const VechtronDashboard = () => {
  const [showCalendar, setShowCalendar] = useState(null);
  const [showReminderForm, setShowReminderForm] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [reminders, setReminders] = useState([]);

  const handleSelectDate = (date, reminderType) => {
    setSelectedDate(date);
    setShowCalendar(null);
    setShowReminderForm(reminderType);
  };

  const handleSetReminder = (reminder) => {
    setReminders([...reminders, reminder]);
    toast.success(
      `Reminder set for ${reminder.title} on ${reminder.date} at ${reminder.time} (${reminder.timeZone})`
    );
  };

  const performanceData = [
    { name: "Jan", efficiency: 85, health: 90, mileage: 2500 },
    { name: "Feb", efficiency: 82, health: 88, mileage: 2300 },
    { name: "Mar", efficiency: 88, health: 85, mileage: 2800 },
    { name: "Apr", efficiency: 86, health: 82, mileage: 2400 },
  ];

  const alerts = [
    {
      id: 1,
      type: "critical",
      message: "Coolant level is low",
      component: "Maintenance",
      time: "10 min ago",
      done: "Done",
    },
    {
      id: 2,
      type: "warning",
      message: "Oil change due",
      component: "Maintenance",
      time: "2 hour ago",
      done: "Done",
    },
    {
      id: 3,
      type: "warning",
      message: "Break Fluid",
      component: "Maintenance",
      time: "2 hours ago",
      done: "Done",
    },
    {
      id: 4,
      type: "info",
      message: "Engine performance optimal",
      component: "Engine",
      time: "2 hours ago",
      done: "Done",
    },
  ];
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  // const currentVehicleData = vehiclesData[selectedVehicle];
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vehicleList, setVehicleList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [expandedms, setExpandedms] = useState(false);
  // Function to fetch vehicle list
  const fetchVehicleList = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles", {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
  const fetchVehicleData = async (vehicleId) => {
    setLoading(true);
    try {
      // Initialize vehicle data structure with default values
      const vehicleDataStructure = {
        model: "Unknown Model",
        performanceData: [
          { name: "Jan", efficiency: 85, health: 90, mileage: 2500 },
          { name: "Feb", efficiency: 82, health: 88, mileage: 2300 },
          { name: "Mar", efficiency: 88, health: 85, mileage: 2800 },
          { name: "Apr", efficiency: 86, health: 82, mileage: 2400 },
        ],
        alerts: [
          {
            id: 1,
            type: "info",
            message: "No alerts available",
            component: "System",
            time: "now",
          },
        ],
        overallHealth: 85,
        fuelEfficiency: 28,
        activeAlerts: 0,
        nextService: 30,
        enginePerformance: 90,
        batteryHealth: 85,
        avgSpeed: 45,
        fuelEconomy: 28,
      };

      // Fetch maintenance data - currently the only available endpoint
      const maintenanceResponse = await api.get(
        `/vehicle/api/v1/vehicles/${vehicleId}/maintenance-requirements`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (maintenanceResponse.status === "success") {
        const maintenanceData = await maintenanceResponse;
        console.log(maintenanceData.data);

        if (
          maintenanceData.status === "success" &&
          maintenanceData.data.requirements
        ) {
          // Generate alerts based on maintenance data
          console.log(maintenanceData.data.requirements);

          const maintenanceAlerts = maintenanceData.data.requirements.map(
            (item, index) => {
              if (
                !item ||
                typeof item !== "object" ||
                !item.type ||
                typeof item.type !== "string"
              ) {
                console.error("Invalid maintenance item:", item);
                return {
                  id: index + 1,
                  type: "info",
                  message: "Maintenance needed",
                  component: "Maintenance",
                  time: "Recently detected",
                };
              }
              // Map risk level to alert type
              let alertType;
              switch (item.risk_level) {
                case "high":
                  alertType = "critical";
                  break;
                case "moderate":
                  alertType = "warning";
                  break;
                case "low":
                default:
                  alertType = "info";
                  break;
              }

              // Format the type field to be more readable
              const formattedType = item.type
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              return {
                id: index + 1,
                type: alertType,
                message: `${formattedType} needed`,
                component: `${item.description}`,
                time: `${item.schedule_type}`,
              };
            }
          );

          // Update the data structure with maintenance information
          vehicleDataStructure.alerts = maintenanceAlerts;
          vehicleDataStructure.activeAlerts = maintenanceAlerts.length;

          // Calculate next service date (random value between 1-30 days based on maintenance items)
          vehicleDataStructure.nextService = Math.max(
            1,
            Math.min(30, 30 - maintenanceAlerts.length)
          );
        }
      }
      let activealertcount = 0;

      try {
        const maintenancescheduleResponse = await api.get(
          `/vehicle/api/v1/vehicles/${vehicleId}/due-maintenance`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (maintenancescheduleResponse.status === "success") {
          console.log("Got here");
          console.log(maintenancescheduleResponse);
          const detailsData = await maintenancescheduleResponse;
          if (
            detailsData.status === "success" &&
            detailsData.data.due_maintenance
          ) {
            // Update vehicle details if available
            vehicleDataStructure.maintenanceschedule =
              detailsData.data.due_maintenance || vehicleDataStructure.model;
            activealertcount = detailsData.data.due_maintenance.length;
            // Add any other fields that become available
          }
        }
      } catch (error) {
        console.log("Vehicle details endpoint not yet available");
      }

      try {
        const chartResponse = await api.get(
          `/vehicle/api/v1/vehicles/${vehicleId}/chart`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (chartResponse.status === "success") {
          console.log("Got here Chart");
          console.log(chartResponse);
          const detailsData = await chartResponse;
          if (detailsData.status === "success" && detailsData.data.chart_data) {
            // Update vehicle details if available
            vehicleDataStructure.chartdata =
              detailsData.data.chart_data || vehicleDataStructure.model;
            // Add any other fields that become available
          }
        }
      } catch (error) {
        console.log("Vehicle Chart Data details endpoint not yet available");
      }

      // Try to fetch performance data (for when this endpoint becomes available)
      try {
        const performanceResponse = await api.get(
          `/vehicle/api/v1/vehicles/${vehicleId}/metrics`
        );
        console.log("Got here to set the data");
        if (performanceResponse.status === "success") {
          const performanceData = await performanceResponse;
          console.log("Got here to set the data 0");
          if (performanceData.status === "success" && performanceData.data) {
            // Update performance data if available
            console.log("Got here to set the data 1");
            console.log(performanceData.data);
            vehicleDataStructure.performanceData = performanceData.data.metrics;

            // Create metrics array
            const metricsArray = [
              {
                label: "Overall Health",
                value:
                  performanceData.data.metrics.overall_health === "No Data" ||
                  performanceData.data.metrics.overall_health === undefined ||
                  performanceData.data.metrics.overall_health === null
                    ? "- %"
                    : `${performanceData.data.metrics.overall_health} %`,
                color: "text-green-600",
                icon: Activity,
                iconColor: "text-green-500",
              },
              {
                label: "Fuel Efficiency",
                value:
                  performanceData.data.metrics.fuel_efficiency === "No Data" ||
                  !performanceData.data.metrics.fuel_efficiency
                    ? "- MPG"
                    : `${performanceData.data.metrics.fuel_efficiency} MPG`,
                color: "text-blue-600",
                icon: Gauge,
                iconColor: "text-blue-500",
              },
              {
                label: "Active Maintenance Alerts",
                value: activealertcount,
                color: activealertcount > 0 ? "text-red-600" : "text-green-600",
                icon: activealertcount > 0 ? AlertTriangle : CheckCircle,
                iconColor:
                  activealertcount > 0 ? "text-red-500" : "text-green-500",
              },
              {
                label: "Engine Performance",
                value:
                  performanceData.data.metrics.engine_performance ===
                    "No Data" ||
                  !performanceData.data.metrics.engine_performance
                    ? "- MPG"
                    : `${performanceData.data.metrics.engine_performance} MPG`,
                color: "text-[#708090]",
                icon: Car,
                iconColor: "text-green-500",
                subText: "In the last 6 months",
              },
              {
                label: "Battery Health",
                value:
                  performanceData.data.metrics.battery_health === "No Data" ||
                  !performanceData.data.metrics.battery_health
                    ? "- MPG"
                    : `${performanceData.data.metrics.battery_health} MPG`,
                color: "text-green-600",
                icon: HeartPulseIcon,
                iconColor: "text-green-500",
              },
              {
                label: "Engine Health",
                value:
                  performanceData.data.metrics.engine_health === "No Data" ||
                  !performanceData.data.metrics.engine_health
                    ? "- MPG"
                    : `${performanceData.data.metrics.engine_health} MPG`,
                color: "text-green-600",
                icon: HeartPulseIcon,
                iconColor: "text-green-500",
              },
              {
                label: "Engine Temperature",
                value:
                  performanceData.data.metrics.engine_temp === "No Data" ||
                  !performanceData.data.metrics.engine_temp
                    ? "- MPG"
                    : `${performanceData.data.metrics.engine_temp} MPG`,
                color: "text-[#1E3A8A]",
                icon: GaugeCircle,
                iconColor: "text-[#1E3A8A]",
              },
              {
                label: "Tire Health",
                value:
                  performanceData.data.metrics.tire_health === "No Data" ||
                  !performanceData.data.metrics.tire_health
                    ? "- MPG"
                    : `${performanceData.data.metrics.tire_health} MPG`,
                color: "text-green-600",
                icon: HeartPulseIcon,
                iconColor: "text-green-500",
              },
              {
                label: "Transmission Health",
                value:
                  performanceData.data.metrics.transmission_health ===
                    "No Data" ||
                  !performanceData.data.metrics.transmission_health
                    ? "- MPG"
                    : `${performanceData.data.metrics.transmission_health} MPG`,
                color: "text-green-600",
                icon: HeartPulseIcon,
                iconColor: "text-green-500",
              },
            ];

            // Store the raw performance data in case it's needed elsewhere
            vehicleDataStructure.rawPerformanceData = metricsArray;

            // Add any other fields that become available
          }
        }
      } catch (error) {
        console.log(error);
        console.log("Performance endpoint not yet available");
      }

      // Set the constructed data
      setVehicleData(vehicleDataStructure);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      toast.error(`Failed to load data for vehicle ${vehicleId}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      const vehicles = await fetchVehicleList();
      if (vehicles.length > 0) {
        setSelectedVehicle(vehicles[0].id);
        await fetchVehicleData(vehicles[0].id);
      }
    };

    initializeDashboard();
  }, []);

  useEffect(() => {
    if (selectedVehicle) {
      fetchVehicleData(selectedVehicle);
    }
  }, [selectedVehicle]);

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
  };
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const toggleExpandms = () => {
    setExpandedms(!expandedms);
  };
  // const initialVisibleAlerts = vehicleData.alerts.slice(0, 5);
  if (loading || !vehicleData) {
    return (
      <div className="md:p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold">Loading vehicle data...</p>
        </div>
      </div>
    );
  }
  return (
    <div className=" md:p-6 bg-white min-h-auto ">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full flex justify-end mb-8">
        <div className=" w-64 flex items-center space-x-4">
          <select
            value={selectedVehicle}
            onChange={handleVehicleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            {vehicleList.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.id} - {vehicle.model}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Header */}
      <div className="w-full mx-auto p-0 ">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {vehicleData.rawPerformanceData.map((item, index) => (
            <Card
              key={index}
              className={`min-w-[162px] md:min-w-full w-full ${
                index === vehicleData.rawPerformanceData.length - 1
                  ? "col-span-2 md:col-span-1"
                  : ""
              }`}
            >
              <CardContent className="py-4 flex shadow-lg items-center rounded-xl justify-between h-auto">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">
                    {item.label}
                  </p>
                  {item.value === "92% In the last 6 months" ? (
                    <p className={`text-xl font-bold ${item.color}`}>
                      <span className="block text-sm">92%</span>
                      <span className="block text-xs text-gray-500">
                        In the last 6 months
                      </span>
                    </p>
                  ) : (
                    <p className={`text-sm md:text-xl font-bold ${item.color}`}>
                      {item.value}
                    </p>
                  )}
                </div>
                <div>
                  <item.icon
                    className={`w-5 md:h-8 h-5 md:w-8 ${item.iconColor} self-end`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnostics & Alerts */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`space-y-4  ${
                expanded ? "overflow-y-auto max-h-96 pr-2" : ""
              }`}
              style={{ scrollbarWidth: "thin" }}
            >
              {vehicleData.alerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg flex items-center justify-between ${
                    alert.type === "critical"
                      ? "bg-red-100 border border-red-300"
                      : alert.type === "warning"
                      ? "bg-yellow-50 border border-yellow-300"
                      : "bg-blue-100 border border-blue-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        alert.type === "critical"
                          ? "text-red-500"
                          : alert.type === "moderate"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {alert.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        {alert.component} | {alert.time}
                      </p>
                    </div>
                  </div>
                  <Bell
                    className={`h-5 w-5 ${
                      alert.type === "critical"
                        ? "text-red-500"
                        : alert.message === "Oil change due"
                        ? "text-[#1C1C1C]"
                        : alert.message === "Break Fluid"
                        ? "text-red-500"
                        : alert.message === "Engine performance optimal"
                        ? "text-blue-500"
                        : "text-black"
                    }`}
                  />
                </div>
              ))}

              {/* Only show remaining alerts when expanded */}
              {expanded &&
                vehicleData.alerts.slice(4).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg flex items-center justify-between ${
                      alert.type === "critical"
                        ? "bg-red-100 border border-red-300"
                        : alert.type === "warning"
                        ? "bg-yellow-50 border border-yellow-300"
                        : "bg-blue-100 border border-blue-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <AlertTriangle
                        className={`h-5 w-5 ${
                          alert.type === "critical"
                            ? "text-red-500"
                            : alert.type === "moderate"
                            ? "text-yellow-500"
                            : "text-blue-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {alert.message}
                        </p>
                        <p className="text-sm text-gray-500">
                          {alert.component} | {alert.time}
                        </p>
                      </div>
                    </div>
                    <Bell
                      className={`h-5 w-5 ${
                        alert.type === "critical"
                          ? "text-red-500"
                          : alert.message === "Oil change due"
                          ? "text-[#1C1C1C]"
                          : alert.message === "Break Fluid"
                          ? "text-red-500"
                          : alert.message === "Engine performance optimal"
                          ? "text-blue-500"
                          : "text-black"
                      }`}
                    />
                  </div>
                ))}
            </div>

            {/* Only show View More button if there are more than 5 alerts */}
            {vehicleData.alerts.length > 5 && (
              <Button
                variant="ghost"
                className="w-full mt-4 flex items-center justify-center text-gray-500"
                onClick={toggleExpand}
              >
                {expanded ? (
                  <>
                    View Less <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    View More <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Maintenance Schedule */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className={`space-y-4 ${
                  expandedms ? "overflow-y-auto max-h-96 pr-2" : ""
                }`}
                style={{ scrollbarWidth: "thin" }}
              >
                {vehicleData.maintenanceschedule.slice(0, 4).map((item) => (
                  <div
                    key={item.type}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.risk_level === "high" ||
                        item.risk_level === "critical" ? (
                          <span className="text-red-500 font-medium">
                            Priority:{" "}
                            {item.risk_level.charAt(0).toUpperCase() +
                              item.risk_level.slice(1)}{" "}
                            risk
                          </span>
                        ) : (
                          <>
                            Interval: Every {item.interval_months} months or{" "}
                            {item.interval_kilometers.toLocaleString()} km
                          </>
                        )}
                      </p>
                    </div>
                    <button onClick={() => setShowCalendar(item.type)}>
                      <Calendar className="h-5 w-5 text-[#000000] cursor-pointer" />
                    </button>
                  </div>
                ))}

                {expandedms &&
                  vehicleData.maintenanceschedule.slice(4).map((item) => (
                    <div
                      key={item.type}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.risk_level === "high" ||
                          item.risk_level === "critical" ? (
                            <span className="text-red-500 font-medium">
                              Priority:{" "}
                              {item.risk_level.charAt(0).toUpperCase() +
                                item.risk_level.slice(1)}{" "}
                              risk
                            </span>
                          ) : (
                            <>
                              Interval: Every {item.interval_months} months or{" "}
                              {item.interval_kilometers.toLocaleString()} km
                            </>
                          )}
                        </p>
                      </div>
                      <button onClick={() => setShowCalendar(item.type)}>
                        <Calendar className="h-5 w-5 text-[#000000] cursor-pointer" />
                      </button>
                    </div>
                  ))}
              </div>
              {vehicleData.alerts.length > 5 && (
                <Button
                  variant="ghost"
                  className="w-full mt-4 flex items-center justify-center text-gray-500"
                  onClick={toggleExpandms}
                >
                  {expandedms ? (
                    <>
                      View Less <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View More <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="w-full  md:w-auto px-6 py-4 shadow-lg rounded-xl my-6">
              {/* Heading */}
              <div className="flex  items-center gap-4 pt-6 mb-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-200 flex items-center justify-center">
                  <AlertTriangle className="text-black w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h2 className="text-[#1C1C1C] font-inter font-bold md:text-xl text-base ">
                  Recommended Action
                </h2>
              </div>

              {/* Bullets */}
              <div className="mt-8">
                <ul className="list-disc pl-5 space-y-4 text-[#1c1c1c] text-sm">
                  {vehicleData.maintenanceschedule
                    .filter(
                      (item) =>
                        item.risk_level === "high" ||
                        item.risk_level === "critical"
                    )
                    .map((item) => (
                      <li key={item.type}>
                        {item.risk_level === "critical" ? (
                          <span className="font-medium">
                            URGENT: {item.description}
                          </span>
                        ) : (
                          <span>
                            Schedule a visit to {item.description.toLowerCase()}
                          </span>
                        )}
                      </li>
                    ))}
                  {vehicleData.maintenanceschedule.filter(
                    (item) =>
                      item.risk_level === "high" ||
                      item.risk_level === "critical"
                  ).length === 0 && (
                    <li>No high-priority maintenance items at this time</li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
          {showCalendar && (
            <ServiceHistoryChat
              onClose={() => setShowCalendar(null)}
              maintenanceItem={vehicleData.maintenanceschedule.find(
                (item) => item.type === showCalendar
              )}
              vehicleId={selectedVehicle}
              onSuccess={(data) => {
                // Handle successful submission
                setShowCalendar(null);

                // Optionally refresh your data
                // fetchMaintenanceData(vehicleId);
              }}
            />
          )}

          {showReminderForm && (
            <ReminderForm
              onClose={() => setShowReminderForm(null)}
              selectedDate={selectedDate}
              onSetReminder={handleSetReminder}
              title={showReminderForm}
            />
          )}
        </Card>

        {/* Vehicle Health Monitoring */}
      </div>

            <VehicleMaintenanceDashboard chart_data={vehicleData.chartdata} />
    </div>
  );
};

export default VechtronDashboard;
