"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GraphCard from "@app/vehicle_management/portal/_component/GraphCard";

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
  Check,
  Settings,
  AlertCircle,
  Activity,
  Gauge,
  Bell,
  Calendar,
  Car,
  Heart,
  HeartCrack,
  HeartIcon,
  HeartPulseIcon,
  GaugeIcon,
  GaugeCircle,
} from "lucide-react";

const graphs = [
  {
    id: 1,
    title: "General Service",
    buttonText: "General Service",
    data: [10000, 18000, 25000, 19000, 30000, 22000],
  },
  {
    id: 2,
    title: "Oil Change",
    buttonText: "Oil Change",
    data: [22000, 25000, 20000, 27000, 24000, 28000], 
  },
  {
    id: 3,
    title: "Coolant Level",
    buttonText: "Coolant Level",
    data: [15000, 20000, 18000, 21000, 23000, 19000],
  },
  {
    id: 4,
    title: "Brake Fluid",
    buttonText: "Brake Fluid",
    data: [10000, 17000, 13000, 18000, 16000, 20000], 
  },
];

const VechtronDashboard = () => {
  // Sample data - replace with real data from your backend
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Vechtron AI Vehicle Dashboard
        </h1>
        <p className="text-gray-600">
          Vehicle ID: VEH-2024-001 | Toyota Camry 2020
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Quick Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Overall Health
                </p>
                <p className="text-2xl font-bold text-green-600">85%</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Fuel Efficiency
                </p>
                <p className="text-2xl font-bold text-blue-600">28 MPG</p>
              </div>
              <Gauge className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Alerts
                </p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <Bell className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Next Service
                </p>
                <p className="text-2xl font-bold text-purple-600">15 days</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Engine Performance
                </p>
                <p className="text-2xl font-bold text-[#708090]">90%</p>
                <p className="text-xl font-bold text-[#708090] leading-8">
                  In the last 6 Months
                </p>
              </div>
              <Car className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Battery Health
                </p>
                <p className="text-2xl font-bold text-green-600">88%</p>
              </div>
              <HeartPulseIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Averege Speed
                </p>
                <p className="text-2xl font-bold text-[#1E3A8A]">45mph</p>
              </div>
              <GaugeCircle className="h-8 w-8 text-[#1E3A8A]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Health Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Health Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="health"
                    stroke="#10B981"
                    name="Health Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#3B82F6"
                    name="Efficiency"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">
                  Engine Performance
                </p>
                <p className="text-lg font-bold text-gray-900">92%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">
                  Battery Health
                </p>
                <p className="text-lg font-bold text-gray-900">88%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnostics & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
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
                          : alert.type === "warning"
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
          </CardContent>
        </Card>

        {/* Maintenance Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Oil Change</p>
                  <p className="text-sm text-gray-500">Due in 15 days</p>
                </div>
                <Calendar className="h-5 w-5 text-[#000000]" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Tire Rotation</p>
                  <p className="text-sm text-gray-500">Due in 30 days</p>
                </div>
                <Calendar className="h-5 w-5 text-[#000000]" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Break Inspection</p>
                  <p className="text-sm text-gray-500">Due in 45 days</p>
                </div>
                <Calendar className="h-5 w-5 text-[#000000]" />
              </div>
            </div>

            <div className=" px-6 py-4 shadow-lg rounded-xl my-6">
              {/* Heading */}
              <div className="flex items-center gap-4 pt-6 mb-3">
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
                  <li>Schedule a visit to change your coolant</li>
                  <li>Consider changing your vehicle oil</li>
                  <li>
                    Your vehicle brake fluid is low, refill it as soon as
                    possible
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="mileage"
                    fill="#8884d8"
                    name="Monthly Mileage"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Avg Speed</p>
                <p className="text-lg font-bold text-gray-900">45 mph</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">
                  Fuel Economy
                </p>
                <p className="text-lg font-bold text-gray-900">28 mpg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
};

export default VechtronDashboard;
