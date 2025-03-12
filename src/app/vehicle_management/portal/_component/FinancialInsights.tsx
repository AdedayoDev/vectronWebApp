"use client";

import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MessageCircle } from "lucide-react";
import CustomChatPopup from "./ChatPopup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Graph {
  id: number;
  title: string;
}

const FinancialInsights: React.FC = () => {
  // Labels for X-Axis
  const labels: string[] = ["July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [openPopups, setOpenPopups] = useState<{ [key: number]: boolean }>({});

  const toggleChat = (id: number) => {
    setOpenPopups((prev) => (prev[id] ? {} : { [id]: true }));
  };

  // Ensure the Y-Axis labels always display these values
  const yAxisTicks = {
    beginAtZero: true,
    max: 100000,
    stepSize: 25000,
    callback: (value: number) => value.toLocaleString(),
  };

  // Graph Categories
  const graphs: Graph[] = [
    { id: 1, title: "General Service" },
    { id: 2, title: "Oil Change" },
    { id: 3, title: "Coolant Level" },
    { id: 4, title: "Brake Fluid" },
  ];

  // Default Graph Data
  const defaultGraphData: { [key: number]: number[] } = {
    1: [10000, 18000, 25000, 19000, 30000, 22000],
    2: [22000, 25000, 20000, 27000, 24000, 28000],
    3: [15000, 20000, 18000, 21000, 23000, 19000],
    4: [10000, 17000, 13000, 18000, 16000, 20000],
  };

  // State for selected months & graph data
  const [selectedMonths, setSelectedMonths] = useState<{
    [key: number]: string;
  }>(
    graphs.reduce((acc, graph) => {
      acc[graph.id] = "Last 6 Months";
      return acc;
    }, {} as { [key: number]: string })
  );

  const [graphData, setGraphData] = useState<{ [key: number]: number[] }>(
    defaultGraphData
  );

  // Function to adjust graph dynamically based on the selected range
  const adjustGraphData = (data: number[], months: string) => {
    const monthRanges: { [key: string]: number } = {
      "Last 6 Months": 6,
      "Last 5 Months": 5,
      "Last 4 Months": 4,
      "Last 3 Months": 3,
      "Last 2 Months": 2,
      "Last 1 Month": 1,
    };

    const range = monthRanges[months];
    return data.slice(-range);
  };

  // Simulated API Fetch (Replace with actual API call in the future)
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from API...");

      setTimeout(() => {
        setGraphData({
          1: adjustGraphData(
            [10000, 18000, 25000, 19000, 30000, 22000],
            selectedMonths[1]
          ),
          2: adjustGraphData(
            [22000, 25000, 20000, 27000, 24000, 28000],
            selectedMonths[2]
          ),
          3: adjustGraphData(
            [15000, 20000, 18000, 21000, 23000, 19000],
            selectedMonths[3]
          ),
          4: adjustGraphData(
            [10000, 17000, 13000, 18000, 16000, 20000],
            selectedMonths[4]
          ),
        });
      }, 500); // Simulated quick API response
    };

    fetchData();
  }, [selectedMonths]); // Runs when the selected month changes

  // Handle month selection change
  const handleMonthChange = (id: number, value: string) => {
    setSelectedMonths((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {graphs.map((graph) => (
          <div
            key={graph.id}
            ref={(el) => {
              cardRefs.current[graph.id] = el;
            }}
            className="bg-gray-50 shadow-md rounded-lg p-4 relative"
          >
            {/* Graph Title & Month Selector */}
            <div className="flex justify-between items-center mb-4 p-2 rounded-md">
              <h3 className="text-lg font-bold text-gray-800 px-6 py-2 rounded-lg bg-[#DBB4FF] truncate">
                {graph.title}
              </h3>

              <div className="flex items-center gap-2">
                <select
                  value={selectedMonths[graph.id]}
                  onChange={(e) => handleMonthChange(graph.id, e.target.value)}
                  className="border p-2 rounded-md text-gray-700"
                >
                  <option value="Last 6 Months">Last 6 Months</option>
                  <option value="Last 5 Months">Last 5 Months</option>
                  <option value="Last 4 Months">Last 4 Months</option>
                  <option value="Last 3 Months">Last 3 Months</option>
                  <option value="Last 2 Months">Last 2 Months</option>
                  <option value="Last 1 Month">Last 1 Month</option>
                </select>

                {/* Message Icon */}
                <MessageCircle
                  className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 relative"
                  onClick={() => toggleChat(graph.id)}
                />

                {/* Conditional Chat Popup */}
                {openPopups[graph.id] && (
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10"
                    style={{ zIndex: 100, width: "90%" }}
                  >
                    <CustomChatPopup
                      onClose={() => setOpenPopups({})} 
                      parentWidth={`${
                        cardRefs.current[graph.id]?.clientWidth
                      }px`}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Line Chart */}
            <div className="h-72">
              <Line
                data={{
                  labels: labels.slice(-graphData[graph.id].length),
                  datasets: [
                    {
                      data: graphData[graph.id],
                      borderColor: "green",
                      backgroundColor: "rgba(0, 128, 0, 0.2)",
                      tension: 0.4,
                      pointRadius: 0,
                      borderWidth: 3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100000,
                      ticks: {
                        stepSize: 25000,
                        callback: (value: number | string) =>
                          value.toLocaleString(),
                      } as any,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: () => "",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialInsights;
