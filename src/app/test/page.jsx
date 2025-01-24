"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Check, Settings, AlertCircle, Activity, Gauge, Bell, Calendar } from 'lucide-react';
 
const VechtronDashboard = () => {
  // Sample data - replace with real data from your backend
  const performanceData = [
    { name: 'Jan', efficiency: 85, health: 90, mileage: 2500 },
    { name: 'Feb', efficiency: 82, health: 88, mileage: 2300 },
    { name: 'Mar', efficiency: 88, health: 85, mileage: 2800 },
    { name: 'Apr', efficiency: 86, health: 82, mileage: 2400 },
  ];
 
  const alerts = [
    { id: 1, type: 'critical', message: 'Engine temperature high', component: 'Engine', time: '10 min ago' },
    { id: 2, type: 'warning', message: 'Oil change due', component: 'Maintenance', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'Tire pressure optimal', component: 'Tires', time: '2 hours ago' },
  ];
 
  return (
<div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
<div className="mb-6">
<h1 className="text-2xl font-bold text-gray-800">Vechtron AI Vehicle Dashboard</h1>
<p className="text-gray-600">Vehicle ID: VEH-2024-001 | Toyota Camry 2020</p>
</div>
 
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Quick Stats */}
<Card>
<CardContent className="p-4">
<div className="flex items-center justify-between">
<div>
<p className="text-sm font-medium text-gray-500">Overall Health</p>
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
<p className="text-sm font-medium text-gray-500">Fuel Efficiency</p>
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
<p className="text-sm font-medium text-gray-500">Active Alerts</p>
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
<p className="text-sm font-medium text-gray-500">Next Service</p>
<p className="text-2xl font-bold text-purple-600">15 days</p>
</div>
<Calendar className="h-8 w-8 text-purple-500" />
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
<Line type="monotone" dataKey="health" stroke="#10B981" name="Health Score" />
<Line type="monotone" dataKey="efficiency" stroke="#3B82F6" name="Efficiency" />
</LineChart>
</ResponsiveContainer>
</div>
<div className="grid grid-cols-2 gap-4 mt-4">
<div className="bg-gray-50 p-4 rounded-lg">
<p className="text-sm font-medium text-gray-500">Engine Performance</p>
<p className="text-lg font-bold text-gray-900">92%</p>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<p className="text-sm font-medium text-gray-500">Battery Health</p>
<p className="text-lg font-bold text-gray-900">88%</p>
</div>
</div>
</CardContent>
</Card>
 
        {/* Diagnostics & Alerts */}
<Card>
<CardHeader>
<CardTitle>Diagnostics & Alerts</CardTitle>
</CardHeader>
<CardContent>
<div className="space-y-4">
              {alerts.map((alert) => (
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
<p className="font-medium text-gray-900">Break Inspection</p>
<p className="text-sm text-gray-500">Due in 45 days</p>
</div>
<Calendar className="h-5 w-5 text-gray-400" />
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
<Bar dataKey="mileage" fill="#8884d8" name="Monthly Mileage" />
</BarChart>
</ResponsiveContainer>
</div>
<div className="grid grid-cols-2 gap-4 mt-4">
<div className="bg-gray-50 p-4 rounded-lg">
<p className="text-sm font-medium text-gray-500">Avg Speed</p>
<p className="text-lg font-bold text-gray-900">45 mph</p>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<p className="text-sm font-medium text-gray-500">Fuel Economy</p>
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