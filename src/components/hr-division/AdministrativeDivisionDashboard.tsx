import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, BarChart, CheckCircle, Briefcase, FileText, Clock, Check, X } from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
}

export function AdministrativeDivisionDashboard() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      department: 'Finance',
      leaveType: 'Vacation Leave',
      startDate: '2025-10-20',
      endDate: '2025-10-22',
      days: 3,
      status: 'pending',
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      department: 'Marketing',
      leaveType: 'Sick Leave',
      startDate: '2025-10-18',
      endDate: '2025-10-18',
      days: 1,
      status: 'pending',
    },
  ]);

  const handleApprove = (id: string) => {
    setLeaveRequests(requests =>
      requests.map(req => req.id === id ? { ...req, status: 'approved' as const } : req)
    );
  };

  const handleReject = (id: string) => {
    setLeaveRequests(requests =>
      requests.map(req => req.id === id ? { ...req, status: 'rejected' as const } : req)
    );
  };

  const pendingRequests = leaveRequests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Quick Navigation */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Leave Management</p>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Benefits</p>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Compliance</p>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <BarChart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Analytics</p>
          </button>
        </div>
      </Card>

      {/* Pending Approvals */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-orange-600" />
            <h3 className="text-gray-900">PENDING APPROVALS</h3>
          </div>
          <Badge className="bg-orange-500">{pendingRequests.length} Pending</Badge>
        </div>

        <div className="space-y-3">
          {pendingRequests.length > 0 ? (
            pendingRequests.map(request => (
              <div key={request.id} className="p-4 border-l-4 border-l-orange-500 bg-orange-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-gray-900">{request.employeeName}</p>
                      <Badge variant="outline">{request.department}</Badge>
                      <Badge className="bg-purple-600">{request.leaveType}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="text-gray-900">Duration:</span> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-900">Days:</span> {request.days} day{request.days > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      onClick={() => handleApprove(request.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleReject(request.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No pending approvals
            </div>
          )}
        </div>
      </Card>

      {/* Leave Management */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h3 className="text-gray-900">LEAVE MANAGEMENT</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Total Leave Requests</p>
            <p className="text-blue-900 text-2xl">24</p>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-green-900 text-2xl">18</p>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </Card>
          <Card className="p-4 bg-red-50 border-red-200">
            <p className="text-sm text-gray-600 mb-1">Rejected</p>
            <p className="text-red-900 text-2xl">4</p>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </Card>
        </div>

        <div className="space-y-3">
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">View All Leave Requests</p>
                <p className="text-sm text-gray-600">Manage and track employee leave applications</p>
              </div>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
          </button>
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Leave Balance Overview</p>
                <p className="text-sm text-gray-600">View remaining leave days per employee</p>
              </div>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
          </button>
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Leave Calendar</p>
                <p className="text-sm text-gray-600">View scheduled leaves across departments</p>
              </div>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>
      </Card>

      {/* Benefits Management */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-6 h-6 text-green-600" />
          <h3 className="text-gray-900">BENEFITS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-2 border-green-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-900">Government Benefits</p>
                <p className="text-sm text-gray-600">SSS, Pag-IBIG, PhilHealth</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 ml-11">
              <li>• Manage contributions</li>
              <li>• Track remittances</li>
              <li>• Generate reports</li>
            </ul>
          </div>

          <div className="p-4 border-2 border-blue-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900">Company Benefits</p>
                <p className="text-sm text-gray-600">HMO, Allowances, Incentives</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 ml-11">
              <li>• Enrollment management</li>
              <li>• Benefit utilization</li>
              <li>• Claims processing</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-3 bg-gray-50">
            <p className="text-xs text-gray-600 mb-1">SSS Active</p>
            <p className="text-gray-900">47</p>
          </Card>
          <Card className="p-3 bg-gray-50">
            <p className="text-xs text-gray-600 mb-1">Pag-IBIG Active</p>
            <p className="text-gray-900">47</p>
          </Card>
          <Card className="p-3 bg-gray-50">
            <p className="text-xs text-gray-600 mb-1">PhilHealth Active</p>
            <p className="text-gray-900">47</p>
          </Card>
          <Card className="p-3 bg-gray-50">
            <p className="text-xs text-gray-600 mb-1">HMO Enrolled</p>
            <p className="text-gray-900">42</p>
          </Card>
        </div>
      </Card>

      {/* Scheduling Config */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-purple-600" />
          <h3 className="text-gray-900">Scheduling Config</h3>
        </div>

        <div className="space-y-3">
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="text-gray-900">Work Shift Management</p>
            <p className="text-sm text-gray-600">Configure employee work schedules and shifts</p>
          </button>
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="text-gray-900">Holiday Management</p>
            <p className="text-sm text-gray-600">Manage company holidays and special working days</p>
          </button>
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="text-gray-900">Leave Policies</p>
            <p className="text-sm text-gray-600">Configure leave types and allowances</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
