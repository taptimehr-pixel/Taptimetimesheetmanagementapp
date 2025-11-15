import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, BarChart, CheckCircle, Download, FileText, Settings } from 'lucide-react';

export function RecordsDivisionDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [reportType, setReportType] = useState('');

  const departments = ['Finance', 'HR', 'Marketing', 'Technical'];
  const reportTypes = ['DTR Report', 'Payroll Report', 'Attendance Summary', 'Leave Report'];

  const handleGenerateReport = () => {
    console.log('Generating report...');
    // In real app, this would generate and download the report
  };

  return (
    <div className="space-y-6">
      {/* Quick Navigation */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Scheduling Config</p>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Compliance</p>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <BarChart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Analytics</p>
          </button>
        </div>
      </Card>

      {/* Generate Report */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-gray-900">GENERATE REPORT</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">Date Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGenerateReport}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate & Download Report
          </Button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="text-blue-600">ℹ️ Note:</span> Reports are generated in PDF format and include detailed breakdowns by department and employee.
          </p>
        </div>
      </Card>

      {/* Manage DTR & Payroll */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-green-600" />
          <h3 className="text-gray-900">MANAGE DTR & PAYROLL</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-6 border-2 border-blue-200 rounded-lg hover:bg-blue-50 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900">DTR Management</p>
                <p className="text-sm text-gray-600">View and edit employee DTR</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 ml-14">
              <li>• View daily time records</li>
              <li>• Edit time entries</li>
              <li>• Calculate work hours</li>
              <li>• Export DTR reports</li>
            </ul>
          </button>

          <button className="p-6 border-2 border-green-200 rounded-lg hover:bg-green-50 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-900">Payroll Management</p>
                <p className="text-sm text-gray-600">Process employee payroll</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 ml-14">
              <li>• Calculate salaries</li>
              <li>• Manage deductions</li>
              <li>• Process overtime</li>
              <li>• Generate payslips</li>
            </ul>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Pending DTR Reviews</p>
            <p className="text-blue-900 text-2xl">12</p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <p className="text-sm text-gray-600 mb-1">Payroll Queue</p>
            <p className="text-green-900 text-2xl">8</p>
          </Card>
          <Card className="p-4 bg-purple-50 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Records Updated</p>
            <p className="text-purple-900 text-2xl">156</p>
          </Card>
        </div>
      </Card>

      {/* WFH Approvals */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-orange-600" />
          <h3 className="text-gray-900">WFH TIME IN APPROVALS</h3>
        </div>

        <div className="space-y-3">
          <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">John Doe - Marketing</p>
                <p className="text-sm text-gray-600">Requesting WFH approval for today</p>
                <p className="text-xs text-gray-500">Requested: 8:30 AM</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Approve
                </Button>
                <Button size="sm" variant="outline" className="border-red-600 text-red-600">
                  Reject
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Sarah Williams - Technical</p>
                <p className="text-sm text-gray-600">Requesting WFH approval for today</p>
                <p className="text-xs text-gray-500">Requested: 8:45 AM</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Approve
                </Button>
                <Button size="sm" variant="outline" className="border-red-600 text-red-600">
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>✓ As Records Division, you approve WFH time-in requests from employees</p>
          <p>✓ Approved requests will be logged in the system automatically</p>
        </div>
      </Card>

      {/* Scheduling Configuration */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-6 h-6 text-blue-600" />
          <h3 className="text-gray-900">Scheduling Configuration</h3>
        </div>

        <div className="space-y-3">
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="text-gray-900">Work Schedule Settings</p>
            <p className="text-sm text-gray-600">Configure work hours and shifts per department</p>
          </button>
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="text-gray-900">Holiday Calendar</p>
            <p className="text-sm text-gray-600">Manage company holidays and special non-working days</p>
          </button>
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="text-gray-900">Cutoff Periods</p>
            <p className="text-sm text-gray-600">Set payroll cutoff dates and periods</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
