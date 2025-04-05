import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  Activity
} from 'lucide-react';
import ComingSoonOverlay from './ComingSoon1';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define TypeScript interfaces
interface MaintenanceItem {
  id: string;
  type: string;
  description: string;
  interval_months: number;
  interval_kilometers: number;
  last_service: string;
  next_service: string;
  status: 'upcoming' | 'overdue' | 'completed';
  risk_level: 'low' | 'medium' | 'high';
}

interface MaintenanceHistoryRecord {
  id: string;
  type: string;
  date: string;
  mileage: number;
  cost: string;
  notes: string;
}

interface StatusBadgeProps {
  status: 'upcoming' | 'overdue' | 'completed';
}

const MaintenancePage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'overdue' | 'completed'>('all');
  const [showCalendar, setShowCalendar] = useState<string | null>(null);

  // Sample maintenance data
  const maintenanceItems: MaintenanceItem[] = [
    {
      id: "maint-001",
      type: "oil_change",
      description: "Oil Change",
      interval_months: 3,
      interval_kilometers: 5000,
      last_service: "2023-12-15",
      next_service: "2024-03-15",
      status: "upcoming",
      risk_level: "medium"
    },
    {
      id: "maint-002",
      type: "tire_rotation",
      description: "Tire Rotation",
      interval_months: 6,
      interval_kilometers: 10000,
      last_service: "2023-10-10",
      next_service: "2024-04-10",
      status: "upcoming",
      risk_level: "low"
    },
    {
      id: "maint-003",
      type: "brake_inspection",
      description: "Brake Inspection",
      interval_months: 6,
      interval_kilometers: 10000,
      last_service: "2023-09-22",
      next_service: "2024-03-22",
      status: "overdue",
      risk_level: "high"
    },
    {
      id: "maint-004",
      type: "air_filter",
      description: "Air Filter Replacement",
      interval_months: 12,
      interval_kilometers: 20000,
      last_service: "2023-05-15",
      next_service: "2024-05-15",
      status: "upcoming",
      risk_level: "low"
    },
    {
      id: "maint-005",
      type: "transmission_fluid",
      description: "Transmission Fluid Check",
      interval_months: 12,
      interval_kilometers: 30000,
      last_service: "2023-02-28",
      next_service: "2024-02-28",
      status: "completed",
      risk_level: "medium"
    }
  ];

  // Filter maintenance items based on selected filter
  const filteredItems = selectedFilter === 'all' 
    ? maintenanceItems 
    : maintenanceItems.filter(item => item.status === selectedFilter);

  // Sample maintenance history
  const maintenanceHistory: MaintenanceHistoryRecord[] = [
    {
      id: "hist-001",
      type: "Oil Change",
      date: "2023-12-15",
      mileage: 45230,
      cost: "$65.99",
      notes: "Synthetic oil used. Filter replaced."
    },
    {
      id: "hist-002",
      type: "Tire Rotation",
      date: "2023-10-10",
      mileage: 43120,
      cost: "$45.00",
      notes: "All tires rotated. Pressure adjusted to manufacturer specs."
    },
    {
      id: "hist-003",
      type: "Brake Inspection",
      date: "2023-09-22",
      mileage: 42050,
      cost: "$30.00",
      notes: "Brake pads at 60% remaining. No issues found."
    }
  ];

  // Status badge component
  const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusDetails = () => {
      switch(status) {
        case 'upcoming':
          return { color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-4 w-4 mr-1" /> };
        case 'overdue':
          return { color: 'bg-red-100 text-red-800', icon: <AlertTriangle className="h-4 w-4 mr-1" /> };
        case 'completed':
          return { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4 mr-1" /> };
        default:
          return { color: 'bg-gray-100 text-gray-800', icon: null };
      }
    };

    const { color, icon } = getStatusDetails();
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ml-2`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <ComingSoonOverlay title="Maintenance Dashboard">
      <div className="space-y-6">
        {/* Header section with filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Vehicle Maintenance</h1>
          
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <Button 
              variant={selectedFilter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
              className={selectedFilter === 'all' ? 'bg-primary text-white' : ''}
            >
              All
            </Button>
            <Button 
              variant={selectedFilter === 'upcoming' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedFilter('upcoming')}
              className={selectedFilter === 'upcoming' ? 'bg-blue-600 text-white' : ''}
            >
              Upcoming
            </Button>
            <Button 
              variant={selectedFilter === 'overdue' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedFilter('overdue')}
              className={selectedFilter === 'overdue' ? 'bg-red-600 text-white' : ''}
            >
              Overdue
            </Button>
            <Button 
              variant={selectedFilter === 'completed' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedFilter('completed')}
              className={selectedFilter === 'completed' ? 'bg-green-600 text-white' : ''}
            >
              Completed
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Maintenance Schedule Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                Maintenance Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium text-gray-900">
                          {item.description}
                        </p>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.risk_level === "high" ? (
                          <span className="text-red-500 font-medium">
                            Priority: High risk
                          </span>
                        ) : (
                          <>
                            Interval: Every {item.interval_months} months or{" "}
                            {item.interval_kilometers.toLocaleString()} km
                          </>
                        )}
                      </p>
                      {item.next_service && (
                        <p className="text-sm text-gray-500">
                          Next service: {new Date(item.next_service).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <button onClick={() => setShowCalendar(item.type)}>
                      <Calendar className="h-5 w-5 text-[#000000] cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Maintenance Health Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Overall Maintenance Health</h3>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700">Up-to-date</h4>
                    <p className="text-2xl font-bold text-green-600">3</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700">Upcoming</h4>
                    <p className="text-2xl font-bold text-blue-600">1</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700">Overdue</h4>
                    <p className="text-2xl font-bold text-red-600">1</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700">Total Services</h4>
                    <p className="text-2xl font-bold text-gray-600">5</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service History Section */}
        <Card>
          <CardHeader>
            <CardTitle>Service History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mileage
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {maintenanceHistory.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.mileage.toLocaleString()} km
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.cost}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {record.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Section */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Brake Inspection Recommended</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on your driving patterns and last service date, we recommend scheduling a brake inspection soon.
                    </p>
                    <Button size="sm" className="mt-3">
                      Schedule Service
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <Activity className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Winter Maintenance Package</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Prepare your vehicle for winter conditions with our comprehensive maintenance package including fluid checks, tire inspection, and battery testing.
                    </p>
                    <Button size="sm" variant="outline" className="mt-3">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComingSoonOverlay>
  );
};

export default MaintenancePage;