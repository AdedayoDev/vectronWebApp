export interface GraphData {
    id: number;
    title: string;
    buttonText: string;
    data: number[];
  }
  
  export const graphs: GraphData[] = [
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
  