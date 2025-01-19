"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Check, Activity, Gauge, Bell, Calendar } from 'lucide-react';

const VechtronDashboard = () => {
  // Vehicle data with different performance metrics
  const vehiclesData = {
    'VEH-2024-001': {
      model: 'Toyota Camry 2020',
      performanceData: [
        { name: 'Jan', efficiency: 85, health: 90, mileage: 2500 },
        { name: 'Feb', efficiency: 82, health: 88, mileage: 2300 },
        { name: 'Mar', efficiency: 88, health: 85, mileage: 2800 },
        { name: 'Apr', efficiency: 86, health: 82, mileage: 2400 },
      ],
      alerts: [
        { id: 1, type: 'critical', message: 'Engine temperature high', component: 'Engine', time: '10 min ago' },
        { id: 2, type: 'warning', message: 'Oil change due', component: 'Maintenance', time: '1 hour ago' },
        { id: 3, type: 'info', message: 'Tire pressure optimal', component: 'Tires', time: '2 hours ago' },
      ],
      overallHealth: 85,
      fuelEfficiency: 28,
      activeAlerts: 3,
      nextService: 15,
      enginePerformance: 92,
      batteryHealth: 88,
      avgSpeed: 45,
      fuelEconomy: 28
    },
    'VEH-2024-002': {
      model: 'Honda Civic 2021',
      performanceData: [
        { name: 'Jan', efficiency: 87, health: 92, mileage: 2200 },
        { name: 'Feb', efficiency: 85, health: 90, mileage: 2100 },
        { name: 'Mar', efficiency: 90, health: 88, mileage: 2400 },
        { name: 'Apr', efficiency: 88, health: 86, mileage: 2300 },
      ],
      alerts: [
        { id: 1, type: 'warning', message: 'Low tire pressure', component: 'Tires', time: '30 min ago' },
        { id: 2, type: 'info', message: 'Routine check completed', component: 'Maintenance', time: '2 hours ago' },
      ],
      overallHealth: 88,
      fuelEfficiency: 32,
      activeAlerts: 2,
      nextService: 20,
      enginePerformance: 95,
      batteryHealth: 90,
      avgSpeed: 48,
      fuelEconomy: 32
    }
  };

  const [selectedVehicle, setSelectedVehicle] = useState('VEH-2024-001');
  const currentVehicleData = vehiclesData[selectedVehicle];

  return (
    <div className="p-6 min-h-screen mt-20">
      {/* Header with Vehicle Selector */}
      <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
          <Image
            src="/assets/icons/Media.jpeg (1).png"
            alt="sidebar"
            width={50}
            height={50}
            className="object-cover rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vechtron AI Vehicle Dashboard</h1>
            <p className="text-gray-600">Dashboard for your fleet</p>
          </div>
        </div>
        <div className="relative w-64">
          <select 
            value={selectedVehicle} 
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.keys(vehiclesData).map((vehicleId) => (
              <option key={vehicleId} value={vehicleId}>
                {vehicleId} - {vehiclesData[vehicleId].model}
              </option>
            ))}
          </select>
        </div>
      </div>
 
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Quick Stats */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Health</p>
              <p className="text-2xl font-bold text-green-600">{currentVehicleData.overallHealth}%</p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </div>
 
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Fuel Efficiency</p>
              <p className="text-2xl font-bold text-blue-600">{currentVehicleData.fuelEfficiency} MPG</p>
            </div>
            <Gauge className="h-8 w-8 text-blue-500" />
          </div>
        </div>
 
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">{currentVehicleData.activeAlerts}</p>
            </div>
            <Bell className="h-8 w-8 text-red-500" />
          </div>
        </div>
 
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Next Service</p>
              <p className="text-2xl font-bold text-purple-600">{currentVehicleData.nextService} days</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Health Monitoring */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Vehicle Health Monitoring</h2>
          </div>
          <div className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentVehicleData.performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="health" stroke="#10B981" name="Health Score" />
                  <Line type="monotone" dataKey="efficiency" stroke="#3B82F6" name="Efficiency" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Engine Performance</p>
                <p className="text-lg font-bold text-gray-900">{currentVehicleData.enginePerformance}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Battery Health</p>
                <p className="text-lg font-bold text-gray-900">{currentVehicleData.batteryHealth}%</p>
              </div>
            </div>
          </div>
        </div>
 
        {/* Diagnostics & Alerts */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Diagnostics & Alerts</h2>
          </div>
          <div className="p-4 space-y-4">
            {currentVehicleData.alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg flex items-center justify-between ${
                  alert.type === 'critical' ? 'bg-red-50' : 
                  alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.type === 'critical' ? 'text-red-500' : 
                    alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-500">{alert.component} | {alert.time}</p>
                  </div>
                </div>
                <Check className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
 
        {/* Maintenance Schedule */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Maintenance Schedule</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Oil Change</p>
                <p className="text-sm text-gray-500">Due in 15 days</p>
              </div>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Tire Rotation</p>
                <p className="text-sm text-gray-500">Due in 30 days</p>
              </div>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Brake Inspection</p>
                <p className="text-sm text-gray-500">Due in 45 days</p>
              </div>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
 
        {/* Performance Metrics */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Performance Metrics</h2>
          </div>
          <div className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentVehicleData.performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="mileage" fill="#8884d8" name="Monthly Mileage" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Avg Speed</p>
                <p className="text-lg font-bold text-gray-900">{currentVehicleData.avgSpeed} mph</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Fuel Economy</p>
                <p className="text-lg font-bold text-gray-900">{currentVehicleData.fuelEconomy} mpg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default VechtronDashboard;