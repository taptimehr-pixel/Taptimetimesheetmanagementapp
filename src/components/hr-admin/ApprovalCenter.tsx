import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Check, X, Clock, Calendar } from 'lucide-react';

interface ApprovalRequest {
  id: string;
  employeeName: string;
  department: string;
  type: 'overtime' | 'undertime' | 'leave';
  reason: string;
  date: string;
  hours?: number;
  leaveType?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function ApprovalCenter() {
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterEmployee, setFilterEmployee] = useState('all');

  const [requests, setRequests] = useState<ApprovalRequest[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      department: 'Finance',
      type: 'overtime',
      reason: 'Month-end closing reports',
      date: '2025-10-10',
      hours: 3,
      status: 'pending'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      department: 'HR',
      type: 'leave',
      reason: 'Medical appointment',
      date: '2025-10-15',
      leaveType: 'Sick Leave',
      status: 'pending'
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      department: 'Marketing',
      type: 'undertime',
      reason: 'Family emergency',
      date: '2025-10-08',
      hours: 2,
      status: 'pending'
    },
    {
      id: '4',
      employeeName: 'Sarah Williams',
      department: 'Technical',
      type: 'overtime',
      reason: 'System deployment',
      date: '2025-10-12',
      hours: 4,
      status: 'pending'
    },
    {
      id: '5',
      employeeName: 'Tom Brown',
      department: 'Finance',
      type: 'leave',
      reason: 'Vacation',
      date: '2025-10-20',
      leaveType: 'Vacation Leave',
      status: 'pending'
    },
  ]);

  const departments = ['Finance', 'HR', 'Marketing', 'Technical'];
  const employees = Array.from(new Set(requests.map(r => r.employeeName)));

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'overtime': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'undertime': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'leave': return <Calendar className="w-5 h-5 text-purple-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'overtime': return 'bg-blue-100 border-blue-500';
      case 'undertime': return 'bg-orange-100 border-orange-500';
      case 'leave': return 'bg-purple-100 border-purple-500';
      default: return 'bg-gray-100 border-gray-500';
    }
  };

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'Finance': return 'bg-red-500';
      case 'HR': return 'bg-blue-500';
      case 'Marketing': return 'bg-green-500';
      case 'Technical': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesDepartment = filterDepartment === 'all' || req.department === filterDepartment;
    const matchesEmployee = filterEmployee === 'all' || req.employeeName === filterEmployee;
    return matchesDepartment && matchesEmployee;
  });

  const pendingRequests = filteredRequests.filter(r => r.status === 'pending');
  const overtimeRequests = filteredRequests.filter(r => r.type === 'overtime');
  const undertimeRequests = filteredRequests.filter(r => r.type === 'undertime');
  const leaveRequests = filteredRequests.filter(r => r.type === 'leave');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Approval Center</h2>
        <Badge className="bg-orange-500">
          {pendingRequests.length} Pending Approvals
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Overtime Requests</p>
              <p className="text-blue-900 text-3xl">{overtimeRequests.length}</p>
            </div>
            <Clock className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Undertime Requests</p>
              <p className="text-orange-900 text-3xl">{undertimeRequests.length}</p>
            </div>
            <Clock className="w-10 h-10 text-orange-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Leave Requests</p>
              <p className="text-purple-900 text-3xl">{leaveRequests.length}</p>
            </div>
            <Calendar className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
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
            <Select value={filterEmployee} onValueChange={setFilterEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map(emp => (
                  <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Requests Tabs */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Requests ({filteredRequests.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="overtime">Overtime ({overtimeRequests.length})</TabsTrigger>
            <TabsTrigger value="undertime">Undertime ({undertimeRequests.length})</TabsTrigger>
            <TabsTrigger value="leave">Leave ({leaveRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {filteredRequests.map(request => (
              <div 
                key={request.id}
                className={`p-4 border-l-4 ${getTypeColor(request.type)} rounded-lg`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded-lg">
                      {getTypeIcon(request.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-900">{request.employeeName}</p>
                        <div className={`w-3 h-3 ${getDepartmentColor(request.department)} rounded-full`}></div>
                        <Badge variant="outline">{request.department}</Badge>
                        <Badge className={
                          request.type === 'overtime' ? 'bg-blue-600' :
                          request.type === 'undertime' ? 'bg-orange-600' :
                          'bg-purple-600'
                        }>
                          {request.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Reason:</span> {request.reason}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Date:</span> {new Date(request.date).toLocaleDateString()}
                      </p>
                      {request.hours && (
                        <p className="text-sm text-gray-600">
                          <span className="text-gray-900">Hours:</span> {request.hours} hours
                        </p>
                      )}
                      {request.leaveType && (
                        <p className="text-sm text-gray-600">
                          <span className="text-gray-900">Leave Type:</span> {request.leaveType}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {request.status === 'pending' ? (
                      <>
                        <Button 
                          onClick={() => handleApprove(request.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
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
                      </>
                    ) : (
                      <Badge className={request.status === 'approved' ? 'bg-green-600' : 'bg-red-600'}>
                        {request.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredRequests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No requests found
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-3">
            {pendingRequests.map(request => (
              <div 
                key={request.id}
                className={`p-4 border-l-4 ${getTypeColor(request.type)} rounded-lg`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded-lg">
                      {getTypeIcon(request.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-900">{request.employeeName}</p>
                        <Badge variant="outline">{request.department}</Badge>
                        <Badge className={
                          request.type === 'overtime' ? 'bg-blue-600' :
                          request.type === 'undertime' ? 'bg-orange-600' :
                          'bg-purple-600'
                        }>
                          {request.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Reason:</span> {request.reason}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-900">Date:</span> {new Date(request.date).toLocaleDateString()}
                      </p>
                      {request.hours && (
                        <p className="text-sm text-gray-600">
                          <span className="text-gray-900">Hours:</span> {request.hours} hours
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApprove(request.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
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
            ))}
            {pendingRequests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No pending requests
              </div>
            )}
          </TabsContent>

          <TabsContent value="overtime" className="space-y-3">
            {overtimeRequests.map(request => (
              <div 
                key={request.id}
                className={`p-4 border-l-4 ${getTypeColor(request.type)} rounded-lg`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded-lg">
                      {getTypeIcon(request.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-900">{request.employeeName}</p>
                        <Badge variant="outline">{request.department}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Reason:</span> {request.reason}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Date:</span> {new Date(request.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-900">Hours:</span> {request.hours} hours
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {request.status === 'pending' ? (
                      <>
                        <Button 
                          onClick={() => handleApprove(request.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
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
                      </>
                    ) : (
                      <Badge className={request.status === 'approved' ? 'bg-green-600' : 'bg-red-600'}>
                        {request.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="undertime" className="space-y-3">
            {undertimeRequests.map(request => (
              <div 
                key={request.id}
                className={`p-4 border-l-4 ${getTypeColor(request.type)} rounded-lg`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded-lg">
                      {getTypeIcon(request.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-900">{request.employeeName}</p>
                        <Badge variant="outline">{request.department}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Reason:</span> {request.reason}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Date:</span> {new Date(request.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-900">Hours:</span> {request.hours} hours
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {request.status === 'pending' ? (
                      <>
                        <Button 
                          onClick={() => handleApprove(request.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
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
                      </>
                    ) : (
                      <Badge className={request.status === 'approved' ? 'bg-green-600' : 'bg-red-600'}>
                        {request.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="leave" className="space-y-3">
            {leaveRequests.map(request => (
              <div 
                key={request.id}
                className={`p-4 border-l-4 ${getTypeColor(request.type)} rounded-lg`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-2 rounded-lg">
                      {getTypeIcon(request.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-900">{request.employeeName}</p>
                        <Badge variant="outline">{request.department}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Leave Type:</span> {request.leaveType}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-gray-900">Reason:</span> {request.reason}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-900">Date:</span> {new Date(request.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {request.status === 'pending' ? (
                      <>
                        <Button 
                          onClick={() => handleApprove(request.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
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
                      </>
                    ) : (
                      <Badge className={request.status === 'approved' ? 'bg-green-600' : 'bg-red-600'}>
                        {request.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
