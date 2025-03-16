import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell,
  ScatterChart, Scatter,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Option 1: If you have the card components but not tabs
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VehicleMaintenanceDashboard = ({chart_data}) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(!chart_data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (chart_data) {
      setChartData(chart_data);
      setLoading(false);
    }
  }, [chart_data]);

  if (loading) return <div className="flex justify-center items-center h-64">Loading vehicle maintenance data...</div>;
  if (error) return <div className="text-red-500 text-center h-64">{error}</div>;
  if (!chartData) return <div className="text-center h-64">No maintenance data available</div>;

  // Prepare data for various charts
  const monthLabels = chartData.labels;
  
  // 1. Maintenance Tasks by Risk Level (Pie Chart)
  const riskLevelCounts = chartData.datasets.reduce((acc, dataset) => {
    acc[dataset.risk_level] = (acc[dataset.risk_level] || 0) + 1;
    return acc;
  }, {});
  
  const riskLevelData = Object.entries(riskLevelCounts).map(([name, value]) => ({ name, value }));
  
  // 2. Maintenance Category Distribution (Bar Chart) 
  const categoryData = chartData.datasets.reduce((acc, dataset) => {
    acc[dataset.category] = (acc[dataset.category] || 0) + 1;
    return acc;
  }, {});
  
  const categoryChartData = Object.entries(categoryData).map(([name, count]) => ({ 
    name: name.charAt(0).toUpperCase() + name.slice(1), 
    count 
  }));

  // 3. Maintenance Interval Distribution (Line Chart)
  const intervalData = chartData.datasets.reduce((acc, dataset) => {
    const interval = dataset.interval_months;
    acc[interval] = (acc[interval] || 0) + 1;
    return acc;
  }, {});
  
  const intervalChartData = Object.entries(intervalData)
    .map(([interval, count]) => ({ interval: parseInt(interval), count }))
    .sort((a, b) => a.interval - b.interval);
  
  // 4. Risk Level vs Maintenance Interval (Scatter Plot)
  const riskLevelMap = {
    'low': 1,
    'moderate': 2,
    'high': 3,
    'critical': 4
  };
  
  const scatterData = chartData.datasets.map(dataset => ({
    interval: dataset.interval_months,
    risk: riskLevelMap[dataset.risk_level],
    name: dataset.label
  }));
  
  // 5. Radar Chart for Maintenance Categories by Risk Level
  const radarData = [];
  const categories = [...new Set(chartData.datasets.map(d => d.category))];
  const riskLevels = [...new Set(chartData.datasets.map(d => d.risk_level))];
  
  riskLevels.forEach(risk => {
    const dataPoint = { risk };
    categories.forEach(category => {
      const count = chartData.datasets.filter(d => 
        d.risk_level === risk && d.category === category
      ).length;
      dataPoint[category] = count;
    });
    radarData.push(dataPoint);
  });
  
  // 6. Monthly Maintenance Events (Area Chart)
  // Convert the sparse data arrays into a format suitable for an area chart
  const monthlyEvents = monthLabels.map((month, index) => {
    const dataPoint = { name: month };
    
    // Count events for each category in this month
    categories.forEach(category => {
      dataPoint[category] = chartData.datasets
        .filter(d => d.category === category)
        .reduce((sum, dataset) => sum + (dataset.data[index] || 0), 0);
    });
    
    return dataPoint;
  });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const RISK_COLORS = {
    'low': '#00C49F',
    'moderate': '#FFBB28',
    'high': '#FF8042',
    'critical': '#FF0000'
  };
  
  const CATEGORY_COLORS = {
    'maintenance': '#0088FE',
    'diagnosis': '#00C49F',
    'inspection': '#FFBB28'
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Vehicle Maintenance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Maintenance Tasks by Risk Level (Pie Chart) */}
        <div className="rounded-lg shadow bg-white p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Maintenance Tasks by Risk Level</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskLevelData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {riskLevelData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={RISK_COLORS[entry.name] || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Maintenance Category Distribution (Bar Chart) */}
        <div className="rounded-lg shadow bg-white p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Maintenance Category Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="count" 
                  fill="#8884d8" 
                  name="Number of Tasks"
                  barSize={60}
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CATEGORY_COLORS[entry.name.toLowerCase()] || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Maintenance Interval Distribution (Line Chart) */}
        <div className="rounded-lg shadow bg-white p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Maintenance Interval Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={intervalChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="interval" 
                  label={{ value: 'Months Between Services', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8" 
                  name="Number of Tasks"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Risk Level vs Maintenance Interval (Scatter Plot) */}
        <div className="rounded-lg shadow bg-white p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Risk Level vs Maintenance Interval</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="interval" 
                  name="Maintenance Interval (months)" 
                  domain={[0, 'dataMax']}
                />
                <YAxis 
                  type="number" 
                  dataKey="risk" 
                  name="Risk Level" 
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4]}
                  tickFormatter={(value) => {
                    const labels = ['', 'Low', 'Moderate', 'High', 'Critical'];
                    return labels[value] || '';
                  }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value, name, props) => {
                    if (name === 'risk') {
                      const labels = ['', 'Low', 'Moderate', 'High', 'Critical'];
                      return [labels[value], 'Risk Level'];
                    }
                    return [value, name];
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border rounded shadow-sm">
                          <p className="font-bold">{data.name}</p>
                          <p>Interval: {data.interval} months</p>
                          <p>Risk: {['', 'Low', 'Moderate', 'High', 'Critical'][data.risk]}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="Maintenance Tasks" 
                  data={scatterData} 
                  fill="#8884d8"
                  shape="circle"
                >
                  {scatterData.map((entry, index) => {
                    const riskName = Object.keys(riskLevelMap).find(key => riskLevelMap[key] === entry.risk);
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={RISK_COLORS[riskName] || COLORS[index % COLORS.length]} 
                      />
                    );
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Radar Chart for Maintenance Categories by Risk Level */}
        <div className="rounded-lg shadow bg-white p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Categories by Risk Level</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="risk" />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                {categories.map((category, index) => (
                  <Radar
                    key={category}
                    name={category.charAt(0).toUpperCase() + category.slice(1)}
                    dataKey={category}
                    stroke={CATEGORY_COLORS[category] || COLORS[index % COLORS.length]}
                    fill={CATEGORY_COLORS[category] || COLORS[index % COLORS.length]}
                    fillOpacity={0.6}
                  />
                ))}
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Monthly Maintenance Events (Area Chart) */}
        <div className="rounded-lg shadow bg-white p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Monthly Maintenance Events</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyEvents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {categories.map((category, index) => (
                  <Area
                    key={category}
                    type="monotone"
                    dataKey={category}
                    stackId="1"
                    stroke={CATEGORY_COLORS[category] || COLORS[index % COLORS.length]}
                    fill={CATEGORY_COLORS[category] || COLORS[index % COLORS.length]}
                    name={category.charAt(0).toUpperCase() + category.slice(1)}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleMaintenanceDashboard;