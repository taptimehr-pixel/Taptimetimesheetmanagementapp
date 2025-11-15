import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MapPin, Edit, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Employee {
  id: string;
  name: string;
  department: string;
  status: 'present' | 'absent' | 'on-leave' | 'travel-order';
  location: { lat: number; lng: number };
}

const departmentColors: Record<string, string> = {
  'Finance': 'red',
  'HR': 'blue',
  'Marketing': 'green',
  'Technical': 'yellow',
};

export function AttendanceMonitoring() {
  const [canEditLocation, setCanEditLocation] = useState(false);

  // Mock employee data
  const employees: Employee[] = [
    { id: '1', name: 'John Doe', department: 'Finance', status: 'present', location: { lat: 14.5995, lng: 120.9842 } },
    { id: '2', name: 'Jane Smith', department: 'HR', status: 'present', location: { lat: 14.5996, lng: 120.9843 } },
    { id: '3', name: 'Mike Johnson', department: 'Marketing', status: 'on-leave', location: { lat: 14.5997, lng: 120.9844 } },
    { id: '4', name: 'Sarah Williams', department: 'Technical', status: 'present', location: { lat: 14.5998, lng: 120.9845 } },
    { id: '5', name: 'Tom Brown', department: 'Finance', status: 'absent', location: { lat: 0, lng: 0 } },
    { id: '6', name: 'Emily Davis', department: 'HR', status: 'travel-order', location: { lat: 14.5999, lng: 120.9846 } },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'absent': return 'bg-red-500';
      case 'on-leave': return 'bg-yellow-500';
      case 'travel-order': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      case 'on-leave': return 'On-Leave';
      case 'travel-order': return 'Travel Order';
      default: return status;
    }
  };

  const getDepartmentEmployees = (dept: string) => 
    employees.filter(emp => emp.department === dept);

  const departments = ['Finance', 'HR', 'Marketing', 'Technical'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Attendance Monitoring</h2>
        <Button 
          variant="outline" 
          onClick={() => setCanEditLocation(!canEditLocation)}
          className="border-blue-600 text-blue-600"
        >
          <Edit className="w-4 h-4 mr-2" />
          {canEditLocation ? 'Lock Location' : 'Change Location'}
        </Button>
      </div>

      {/* Live Employee Map */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Live Employee Map</h3>
          <div className="flex gap-2">
            <Badge className="bg-green-500">Present: {employees.filter(e => e.status === 'present').length}</Badge>
            <Badge className="bg-red-500">Absent: {employees.filter(e => e.status === 'absent').length}</Badge>
            <Badge className="bg-yellow-500 text-gray-900">On-Leave: {employees.filter(e => e.status === 'on-leave').length}</Badge>
            <Badge className="bg-blue-500">Travel Order: {employees.filter(e => e.status === 'travel-order').length}</Badge>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Google Map Integration</p>
            <p className="text-sm text-gray-500">Real-time employee location tracking</p>
            <p className="text-sm text-gray-500">GPS or Wi-Fi based verification</p>
            {canEditLocation && (
              <p className="text-sm text-green-600 mt-2">Location editing enabled - Click map to change premises location</p>
            )}
          </div>
        </div>

        {/* Status Legend */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-3">STATUS LEGEND:</p>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">On-Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Travel Order</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Department Color Code */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Department Color Coding</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span className="text-gray-700">Finance</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <span className="text-gray-700">HR</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-gray-700">Marketing</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <span className="text-gray-700">Technical</span>
          </div>
        </div>
      </Card>

      {/* Attendance Check by Department */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Attendance Check by Department</h3>
        <Tabs defaultValue="Finance">
          <TabsList className="mb-4">
            {departments.map(dept => (
              <TabsTrigger key={dept} value={dept}>
                {dept} ({getDepartmentEmployees(dept).length})
              </TabsTrigger>
            ))}
          </TabsList>

          {departments.map(dept => (
            <TabsContent key={dept} value={dept}>
              <div className="space-y-3">
                {getDepartmentEmployees(dept).map(employee => (
                  <div 
                    key={employee.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                          departmentColors[dept] === 'red' ? 'bg-red-500' :
                          departmentColors[dept] === 'blue' ? 'bg-blue-500' :
                          departmentColors[dept] === 'green' ? 'bg-green-500' :
                          'bg-yellow-500'
                        }`}
                      >
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {employee.status === 'present' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">Inside Premises</span>
                        </div>
                      )}
                      {employee.status === 'absent' && (
                        <span className="text-sm text-red-600">Outside Premises</span>
                      )}
                      <Badge className={getStatusColor(employee.status)}>
                        {getStatusLabel(employee.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
