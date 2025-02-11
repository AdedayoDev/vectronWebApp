"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import GraphCard from "./GraphCard";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define Props
interface FinancialInsightsProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// Graph Data Type
interface GraphData {
  id: number;
  title: string;
  buttonText: string;
  data: number[];
}


const FinancialInsights: React.FC<FinancialInsightsProps> = () => {

  const labels: string[] = ["July", "Aug", "Sept", "Oct", "Nov", "Dec"];

 
  const graphs: GraphData[] = [
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

 
  const [selectedRanges, setSelectedRanges] = useState<{ [key: number]: string }>(
    graphs.reduce((acc, graph) => {
      acc[graph.id] = "Last 6 Months";
      return acc;
    }, {} as { [key: number]: string })
  );

  // Handle month selection for each graph
  const handleRangeChange = (id: number, value: string) => {
    setSelectedRanges((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Generate Chart Data
  const getChartData = (data: number[]) => ({
    labels,
    datasets: [
      {
        label: "Cost ($)",
        data,
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        tension: 0.4, 
        pointRadius: 0, 
        borderWidth: 2, 
      },
    ],
  });

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {graphs.map((graph) => (
          <GraphCard key={graph.id} graph={graph} />
        ))}
      </div>
    </div>
  );
};

export default FinancialInsights;
