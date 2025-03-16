"use client";
import { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { AlertTriangle, MessageCircle } from "lucide-react"; // Alert icon
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
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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

interface GraphData {
  id: number;
  title: string;
  buttonText: string;
  data: number[];
}

interface GraphCardProps {
  graph: GraphData;
}

const GraphCard: React.FC<GraphCardProps> = ({ graph }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(6);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [openPopupId, setOpenPopupId] = useState<number | null>(null);

  const toggleChat = (id: number) => {
    setOpenPopupId((prev) => (prev === id ? null : id));
  };

  const labels = ["July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const getFilteredData = () => {
    return graph.data.slice(0, selectedMonth);
  };

  const filteredData = getFilteredData();
  const latestValue =
    filteredData.length > 0 ? filteredData[filteredData.length - 1] : 0;

  // Determine Status, Message & Card Color
  let status = "Good";
  let message = "Current Value: 6000 - Immediate and above";

  if (latestValue < 4000 && latestValue >= 2000) {
    status = "Warning";
    message = "Current Value: 4500 - Immediate attention required";
  } else if (latestValue < 2000) {
    status = "Critical";
    message = "Current Value: 2500 - Intermediate attention required";
  }

  return (
    <Card
      ref={(el) => {
        cardRefs.current[graph.id] = el;
      }}
    >
      {/* Title and Dropdown */}
      <div className=" relative flex pt-6 px-4 justify-between items-center">
        <CardTitle className="bg-[#DBB4FF] rounded-md px-4 py-2 h-auto font-inter font-bold text-sm">
          {graph.title}
        </CardTitle>

        {/* Dropdown for month selection */}
        <div className="flex item-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border p-2 rounded bg-gray-100 text-gray-800"
          >
            {[6, 5, 4, 3, 2, 1].map((month) => (
              <option key={month} value={month}>
                Last {month} Month{month > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <MessageCircle
            className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => toggleChat(graph.id)}
          />

{openPopupId === graph.id && (
  <div className="absolute inset-0 bg-white shadow-lg rounded-lg z-10 p-4">
    <CustomChatPopup
      onClose={() => setOpenPopupId(null)}
      parentWidth={`${cardRefs.current[graph.id]?.clientWidth}px`}
    />
  </div>
)}
        </div>
      </div>

      {/* Alert Section */}
      <div
        className={`flex items-center w-80  ml-4 gap-3 px-4 py-2 rounded-md mt-3 ${
          status === "Good"
            ? "bg-green-100  border border-green-300"
            : status === "Critical"
            ? "bg-yellow-100 border border-yellow-300"
            : "bg-red-100"
        }`}
      >
        <AlertTriangle
          className={
            status === "Good"
              ? "text-green-600 "
              : status === "Warning"
              ? "text-yellow-600"
              : "text-red-600 w-10 h-10"
          }
          size={24}
        />
        <div>
          <p className="text-sm font-semibold">{`Status: ${status}`}</p>
          <p className="text-xs text-gray-600">{message}</p>
        </div>
      </div>

      {/* Chart */}
      <CardContent className="h-[350px] flex items-center justify-center overflow-hidden">
        <div className="w-full h-full max-w-[550px] relative py-4">
          <Line
            data={{
              labels: labels.slice(0, selectedMonth),
              datasets: [
                {
                  label: graph.title,
                  data: filteredData,
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  tension: 0.4,
                  pointRadius: 4,
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                x: {
                  ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 6,
                  },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphCard;
