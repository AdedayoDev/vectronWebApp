import React from "react";
import { Line } from "react-chartjs-2";

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
  const labels: string[] = ["July", "Aug", "Sept", "Oct", "Nov", "Dec"];

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
    <div className="w-96 h-72 border rounded-lg p-4 shadow flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <button className="bg-[#DBB4FF] text-[#333] px-4 py-2 rounded">
          {graph.buttonText}
        </button>
      </div>

      {/* Graph */}
      <div className="h-full flex items-center justify-center">
        <Line
          data={getChartData(graph.data)}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          height={100}
        />
      </div>
    </div>
  );
};

export default GraphCard;
