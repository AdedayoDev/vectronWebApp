"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GraphCard from "@app/vehicle_management/portal/_component/GraphCard";
import { graphs } from "@app/vehicle_management/portal/_component/Graph";

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

const VechtronDashboard = () => {
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
    <div className="md:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="w-full md:w-11/12 mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Vechtron AI Vehicle Dashboard
          </h1>
          <p className="text-gray-600">
            Vehicle ID: VEH-2024-001 | Toyota Camry 2020
          </p>
        </div>

        <div className="w-full mx-auto p-0">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[
              {
                label: "Overall Health",
                value: "85%",
                color: "text-green-600",
                icon: Activity,
                iconColor: "text-green-500",
              },
              {
                label: "Fuel Efficiency",
                value: "28 MPG",
                color: "text-blue-600",
                icon: Gauge,
                iconColor: "text-blue-500",
              },
              {
                label: "Active Alerts",
                value: "3",
                color: "text-red-600",
                icon: Bell,
                iconColor: "text-red-500",
              },
              {
                label: "Next Service",
                value: "15 days",
                color: "text-purple-600",
                icon: Calendar,
                iconColor: "text-purple-500",
              },
              {
                label: "Engine Performance",
                value: "90%",
                color: "text-[#708090]",
                icon: Car,
                iconColor: "text-green-500",
              },
              {
                label: "Battery Health",
                value: "88%",
                color: "text-green-600",
                icon: HeartPulseIcon,
                iconColor: "text-green-500",
              },
              {
                label: "Average Speed",
                value: "45mph",
                color: "text-[#1E3A8A]",
                icon: GaugeCircle,
                iconColor: "text-[#1E3A8A]",
              },
            ].map((item, index) => (
              <Card key={index} className="w-full lg:w-[280px] xl:w-[320px]">
                <CardContent className="py-4 flex flex-col justify-between h-32">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className={`text-2xl font-bold ${item.color}`}>
                      {item.value}
                    </p>
                  </div>
                  <item.icon className={`h-8 w-8 ${item.iconColor} self-end`} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {graphs.map((graph) => (
          <GraphCard key={graph.id} graph={graph} />
        ))}
      </div>
    </div>
  );
};

export default VechtronDashboard;
