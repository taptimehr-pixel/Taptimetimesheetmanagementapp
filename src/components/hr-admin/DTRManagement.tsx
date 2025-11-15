import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Download, Edit, Save } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

// Helper function to format date
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

interface DTREntry {
  date: string;
  amTimeIn: string;
  amTimeOut: string;
  pmTimeIn: string;
  pmTimeOut: string;
  totalHours: number;
  undertime: number;
}

export function DTRManagement() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isEditing, setIsEditing] = useState(false);

  // Mock DTR data
  const [dtrEntries, setDtrEntries] = useState<DTREntry[]>([
    { date: '2025-10-01', amTimeIn: '08:00', amTimeOut: '12:00', pmTimeIn: '13:00', pmTimeOut: '17:00', totalHours: 8, undertime: 0 },
    { date: '2025-10-02', amTimeIn: '08:15', amTimeOut: '12:00', pmTimeIn: '13:00', pmTimeOut: '17:00', totalHours: 7.75, undertime: 0.25 },
    { date: '2025-10-03', amTimeIn: '08:00', amTimeOut: '12:00', pmTimeIn: '13:00', pmTimeOut: '16:30', totalHours: 7.5, undertime: 0.5 },
    { date: '2025-10-04', amTimeIn: '08:00', amTimeOut: '12:00', pmTimeIn: '13:00', pmTimeOut: '17:00', totalHours: 8, undertime: 0 },
    { date: '2025-10-05', amTimeIn: '08:00', amTimeOut: '12:00', pmTimeIn: '13:00', pmTimeOut: '17:00', totalHours: 8, undertime: 0 },
  ]);

  const departments = [
    { id: '1', name: 'Finance', color: 'red' },
    { id: '2', name: 'HR', color: 'blue' },
    { id: '3', name: 'Marketing', color: 'green' },
    { id: '4', name: 'Technical', color: 'yellow' },
  ];

  const employees = [
    { id: '1', name: 'John Doe', department: 'Finance' },
    { id: '2', name: 'Jane Smith', department: 'HR' },
    { id: '3', name: 'Mike Johnson', department: 'Marketing' },
    { id: '4', name: 'Sarah Williams', department: 'Technical' },
  ];

  const getDepartmentColor = (dept: string) => {
    const department = departments.find(d => d.name === dept);
    switch (department?.color) {
      case 'red': return 'border-red-500';
      case 'blue': return 'border-blue-500';
      case 'green': return 'border-green-500';
      case 'yellow': return 'border-yellow-500';
      default: return 'border-gray-500';
    }
  };

  const handleDownloadDTR = () => {
    // Create CSV content
    const headers = ['Date', 'AM Time In', 'AM Time Out', 'PM Time In', 'PM Time Out', 'Total Hours', 'Undertime'];
    const rows = dtrEntries.map(entry => [
      entry.date,
      entry.amTimeIn,
      entry.amTimeOut,
      entry.pmTimeIn,
      entry.pmTimeOut,
      entry.totalHours,
      entry.undertime
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const today = new Date().toISOString().split('T')[0];
    a.download = `DTR_${selectedEmployee}_${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEmployees = selectedDepartment 
    ? employees.filter(emp => emp.department === selectedDepartment)
    : employees;

  const totalHours = dtrEntries.reduce((sum, entry) => sum + entry.totalHours, 0);
  const totalUndertime = dtrEntries.reduce((sum, entry) => sum + entry.undertime, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">DTR Management</h2>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          className="border-blue-600 text-blue-600"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Enable Editing
            </>
          )}
        </Button>
      </div>

      {/* Department Color Legend */}
      <Card className="p-4 bg-white">
        <p className="text-sm text-gray-700 mb-3">Color Code:</p>
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Finance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">HR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Marketing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Technical</span>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className={`p-6 bg-white border-l-4 ${selectedDepartment ? getDepartmentColor(selectedDepartment) : 'border-l-gray-300'}`}>
        <h3 className="text-gray-900 mb-4">DTR Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label>Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Employee Name</Label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee} disabled={!selectedDepartment}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose employee" />
              </SelectTrigger>
              <SelectContent>
                {filteredEmployees.map(emp => (
                  <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full mt-2 justify-start">
                  {startDate ? formatDate(startDate) : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full mt-2 justify-start">
                  {endDate ? formatDate(endDate) : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button 
            onClick={handleDownloadDTR}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!selectedEmployee}
          >
            <Download className="w-4 h-4 mr-2" />
            Download DTR
          </Button>
        </div>
      </Card>

      {/* DTR Table */}
      {selectedEmployee && (
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900">DTR for {selectedEmployee}</h3>
              <p className="text-sm text-gray-600">{selectedDepartment} Department</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Hours: <span className="text-blue-600">{totalHours.toFixed(2)}</span></p>
              <p className="text-sm text-gray-600">Total Undertime: <span className="text-red-600">{totalUndertime.toFixed(2)}</span></p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>AM Time In</TableHead>
                  <TableHead>AM Time Out</TableHead>
                  <TableHead>PM Time In</TableHead>
                  <TableHead>PM Time Out</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Undertime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dtrEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(new Date(entry.date))}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input 
                          type="time" 
                          value={entry.amTimeIn}
                          onChange={(e) => {
                            const newEntries = [...dtrEntries];
                            newEntries[index].amTimeIn = e.target.value;
                            setDtrEntries(newEntries);
                          }}
                          className="w-32"
                        />
                      ) : (
                        entry.amTimeIn
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input 
                          type="time" 
                          value={entry.amTimeOut}
                          onChange={(e) => {
                            const newEntries = [...dtrEntries];
                            newEntries[index].amTimeOut = e.target.value;
                            setDtrEntries(newEntries);
                          }}
                          className="w-32"
                        />
                      ) : (
                        entry.amTimeOut
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input 
                          type="time" 
                          value={entry.pmTimeIn}
                          onChange={(e) => {
                            const newEntries = [...dtrEntries];
                            newEntries[index].pmTimeIn = e.target.value;
                            setDtrEntries(newEntries);
                          }}
                          className="w-32"
                        />
                      ) : (
                        entry.pmTimeIn
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input 
                          type="time" 
                          value={entry.pmTimeOut}
                          onChange={(e) => {
                            const newEntries = [...dtrEntries];
                            newEntries[index].pmTimeOut = e.target.value;
                            setDtrEntries(newEntries);
                          }}
                          className="w-32"
                        />
                      ) : (
                        entry.pmTimeOut
                      )}
                    </TableCell>
                    <TableCell className="text-blue-600">{entry.totalHours} hrs</TableCell>
                    <TableCell className={entry.undertime > 0 ? 'text-red-600' : 'text-gray-600'}>
                      {entry.undertime > 0 ? `${entry.undertime} hrs` : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="text-blue-600">Note:</span> DTR is editable and auto-saved. Changes will be reflected immediately in payroll calculations.
            </p>
          </div>
        </Card>
      )}

      {!selectedEmployee && (
        <Card className="p-12 bg-white text-center">
          <p className="text-gray-500">Please select a department and employee to view DTR records</p>
        </Card>
      )}
    </div>
  );
}
