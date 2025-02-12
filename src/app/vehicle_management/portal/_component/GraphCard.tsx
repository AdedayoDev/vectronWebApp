"use client";
import React from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


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
  const labels = ["July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const getChartData = (data: number[]) => ({
    labels,
    datasets: [
      {
        label: graph.title,
        data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 2,
      },
    ],
  });

  return (
    <Card className="w-full h-[500px] shadow-lg relative overflow-hidden"> 
      <CardHeader>
        <CardTitle>{graph.title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex items-center justify-center">
        <div className="w-full h-[400px] relative py-4"> 
          <Line
            data={getChartData(graph.data)}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "top", 
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
