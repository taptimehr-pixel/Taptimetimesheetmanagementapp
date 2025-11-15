import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Plus, Users, Calendar, BarChart, CheckCircle, UserPlus } from 'lucide-react';

interface NewEmployee {
  name: string;
  position: string;
  department: string;
  status: string;
  salaryGrade: string;
  startDate: string;
}

export function RecruitmentPlacementDashboard() {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<NewEmployee>({
    name: '',
    position: '',
    department: '',
    status: 'Probationary',
    salaryGrade: '',
    startDate: '',
  });

  const departments = ['Finance', 'HR', 'Marketing', 'Technical'];
  const salaryGrades = ['SG-1', 'SG-2', 'SG-3', 'SG-4', 'SG-5', 'SG-6', 'SG-7', 'SG-8'];

  const [recentHires, setRecentHires] = useState([
    { id: '1', name: 'Alice Johnson', position: 'Marketing Associate', department: 'Marketing', startDate: '2025-10-15', status: 'Probationary' },
    { id: '2', name: 'Bob Smith', position: 'Software Engineer', department: 'Technical', startDate: '2025-10-10', status: 'Probationary' },
  ]);

  const handleAddEmployee = () => {
    const employee = {
      id: Date.now().toString(),
      ...newEmployee,
    };
    setRecentHires([...recentHires, employee]);
    setIsAddEmployeeOpen(false);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      status: 'Probationary',
      salaryGrade: '',
      startDate: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Navigation */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Department Employee List</p>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Scheduling Config</p>
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

      {/* Add Employee Section */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <UserPlus className="w-6 h-6 text-blue-600" />
            <h3 className="text-gray-900">ADD EMPLOYEE</h3>
          </div>
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input 
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      placeholder="Enter full name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Input 
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                      placeholder="Enter position"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Department</Label>
                    <Select value={newEmployee.department} onValueChange={(val) => setNewEmployee({...newEmployee, department: val})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Employment Status</Label>
                    <Select value={newEmployee.status} onValueChange={(val) => setNewEmployee({...newEmployee, status: val})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Probationary">Probationary</SelectItem>
                        <SelectItem value="Contractual">Contractual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Salary Grade</Label>
                    <Select value={newEmployee.salaryGrade} onValueChange={(val) => setNewEmployee({...newEmployee, salaryGrade: val})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select salary grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {salaryGrades.map(grade => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input 
                      type="date"
                      value={newEmployee.startDate}
                      onChange={(e) => setNewEmployee({...newEmployee, startDate: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Pag-IBIG Number</Label>
                    <Input placeholder="Pag-IBIG #" className="mt-2" />
                  </div>
                  <div>
                    <Label>GSIS Number</Label>
                    <Input placeholder="GSIS #" className="mt-2" />
                  </div>
                  <div>
                    <Label>SSS Number</Label>
                    <Input placeholder="SSS #" className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="employee@company.com" className="mt-2" />
                  </div>
                  <div>
                    <Label>Contact Number</Label>
                    <Input type="tel" placeholder="+63 XXX XXX XXXX" className="mt-2" />
                  </div>
                </div>

                <Button onClick={handleAddEmployee} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Employee to System
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Active Job Postings</p>
            <p className="text-blue-900 text-2xl">5</p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <p className="text-sm text-gray-600 mb-1">Pending Applications</p>
            <p className="text-green-900 text-2xl">23</p>
          </Card>
          <Card className="p-4 bg-purple-50 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">New Hires This Month</p>
            <p className="text-purple-900 text-2xl">4</p>
          </Card>
        </div>
      </Card>

      {/* Recent Hires */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Recent Hires</h3>
        <div className="space-y-3">
          {recentHires.map(hire => (
            <div key={hire.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {hire.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-gray-900">{hire.name}</p>
                  <p className="text-sm text-gray-600">{hire.position} • {hire.department}</p>
                  <p className="text-xs text-gray-500">Start Date: {new Date(hire.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-yellow-500 text-gray-900">{hire.status}</Badge>
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recruitment Pipeline */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Recruitment Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border-2 border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-700">Application Review</p>
              <Badge variant="outline">12</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">Marketing Manager</div>
              <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">Sales Associate</div>
            </div>
          </div>

          <div className="p-4 border-2 border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-700">Interview Scheduled</p>
              <Badge variant="outline">8</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">Senior Developer</div>
              <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">HR Assistant</div>
            </div>
          </div>

          <div className="p-4 border-2 border-orange-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-700">Offer Extended</p>
              <Badge variant="outline">3</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">Accountant</div>
            </div>
          </div>

          <div className="p-4 border-2 border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-700">Onboarding</p>
              <Badge variant="outline">2</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">Project Manager</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Department Employee Overview */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Department Employee List</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border-l-4 border-l-red-500 bg-red-50 rounded-lg">
            <p className="text-gray-900">Finance</p>
            <p className="text-2xl text-red-900">12</p>
            <p className="text-xs text-gray-600">employees</p>
          </div>
          <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 rounded-lg">
            <p className="text-gray-900">HR</p>
            <p className="text-2xl text-blue-900">8</p>
            <p className="text-xs text-gray-600">employees</p>
          </div>
          <div className="p-4 border-l-4 border-l-green-500 bg-green-50 rounded-lg">
            <p className="text-gray-900">Marketing</p>
            <p className="text-2xl text-green-900">15</p>
            <p className="text-xs text-gray-600">employees</p>
          </div>
          <div className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50 rounded-lg">
            <p className="text-gray-900">Technical</p>
            <p className="text-2xl text-yellow-900">12</p>
            <p className="text-xs text-gray-600">employees</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
