import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Calendar, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface LeaveType {
  id: string;
  name: string;
  duration: string;
  durationValue: number;
  unit: 'days' | 'weeks';
}

interface Benefit {
  id: string;
  name: string;
  description: string;
}

interface EmployeeLeaveHistory {
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
}

export function LeavesAndBenefits() {
  const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
  const [isAddBenefitOpen, setIsAddBenefitOpen] = useState(false);

  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { id: '1', name: 'Overtime', duration: '10 days/year', durationValue: 10, unit: 'days' },
    { id: '2', name: 'Sick Leave', duration: '15 days/year', durationValue: 15, unit: 'days' },
    { id: '3', name: 'Emergency Leave', duration: '5 days/year', durationValue: 5, unit: 'days' },
    { id: '4', name: 'Vacation Leave', duration: '15 days/year', durationValue: 15, unit: 'days' },
    { id: '5', name: 'Parental Leave', duration: '8 weeks', durationValue: 8, unit: 'weeks' },
    { id: '6', name: 'Magna Carta of Women', duration: '2 months', durationValue: 60, unit: 'days' },
  ]);

  const [benefits, setBenefits] = useState<Benefit[]>([
    { id: '1', name: 'SSS', description: 'Social Security System' },
    { id: '2', name: 'Pag-IBIG', description: 'Home Development Mutual Fund' },
    { id: '3', name: 'PhilHealth', description: 'Philippine Health Insurance Corporation' },
    { id: '4', name: 'GSIS', description: 'Government Service Insurance System' },
  ]);

  const [newLeave, setNewLeave] = useState({
    name: '',
    durationValue: '',
    unit: 'days' as 'days' | 'weeks',
  });

  const [newBenefit, setNewBenefit] = useState({
    name: '',
    description: '',
  });

  // Mock employee leave history
  const leaveHistory: EmployeeLeaveHistory[] = [
    { employeeId: '1', employeeName: 'John Doe', department: 'Finance', leaveType: 'Sick Leave', totalDays: 15, usedDays: 3, remainingDays: 12 },
    { employeeId: '2', employeeName: 'Jane Smith', department: 'HR', leaveType: 'Vacation Leave', totalDays: 15, usedDays: 5, remainingDays: 10 },
    { employeeId: '3', employeeName: 'Mike Johnson', department: 'Marketing', leaveType: 'Emergency Leave', totalDays: 5, usedDays: 2, remainingDays: 3 },
    { employeeId: '4', employeeName: 'Sarah Williams', department: 'Technical', leaveType: 'Sick Leave', totalDays: 15, usedDays: 1, remainingDays: 14 },
  ];

  const handleAddLeave = () => {
    const leave: LeaveType = {
      id: Date.now().toString(),
      name: newLeave.name,
      duration: `${newLeave.durationValue} ${newLeave.unit}${newLeave.unit === 'days' && '/year'}`,
      durationValue: parseInt(newLeave.durationValue),
      unit: newLeave.unit,
    };
    setLeaveTypes([...leaveTypes, leave]);
    setIsAddLeaveOpen(false);
    setNewLeave({ name: '', durationValue: '', unit: 'days' });
  };

  const handleDeleteLeave = (id: string) => {
    setLeaveTypes(leaveTypes.filter(leave => leave.id !== id));
  };

  const handleAddBenefit = () => {
    const benefit: Benefit = {
      id: Date.now().toString(),
      name: newBenefit.name,
      description: newBenefit.description,
    };
    setBenefits([...benefits, benefit]);
    setIsAddBenefitOpen(false);
    setNewBenefit({ name: '', description: '' });
  };

  const handleDeleteBenefit = (id: string) => {
    setBenefits(benefits.filter(benefit => benefit.id !== id));
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Leaves & Benefits Management</h2>
      </div>

      <Tabs defaultValue="leaves">
        <TabsList>
          <TabsTrigger value="leaves">Leave Types</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
        </TabsList>

        {/* Leave Types Tab */}
        <TabsContent value="leaves" className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Leave Types</h3>
              <Dialog open={isAddLeaveOpen} onOpenChange={setIsAddLeaveOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Leave Type
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Leave Type</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Leave Name</Label>
                      <Input 
                        value={newLeave.name}
                        onChange={(e) => setNewLeave({...newLeave, name: e.target.value})}
                        placeholder="e.g., Sick Leave"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <div className="flex gap-2 mt-2">
                        <Input 
                          type="number"
                          value={newLeave.durationValue}
                          onChange={(e) => setNewLeave({...newLeave, durationValue: e.target.value})}
                          placeholder="10"
                          className="flex-1"
                        />
                        <select 
                          value={newLeave.unit}
                          onChange={(e) => setNewLeave({...newLeave, unit: e.target.value as 'days' | 'weeks'})}
                          className="px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                        </select>
                      </div>
                    </div>
                    <Button onClick={handleAddLeave} className="w-full bg-blue-600 hover:bg-blue-700">
                      Add Leave Type
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leaveTypes.map(leave => (
                <div key={leave.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">{leave.name}</p>
                      <p className="text-sm text-gray-600">{leave.duration}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteLeave(leave.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="text-blue-600">Note:</span> Leave types and durations are editable. Changes will apply to all future leave requests.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Employee Benefits</h3>
              <Dialog open={isAddBenefitOpen} onOpenChange={setIsAddBenefitOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Benefit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Benefit</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Benefit Name</Label>
                      <Input 
                        value={newBenefit.name}
                        onChange={(e) => setNewBenefit({...newBenefit, name: e.target.value})}
                        placeholder="e.g., SSS"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input 
                        value={newBenefit.description}
                        onChange={(e) => setNewBenefit({...newBenefit, description: e.target.value})}
                        placeholder="e.g., Social Security System"
                        className="mt-2"
                      />
                    </div>
                    <Button onClick={handleAddBenefit} className="w-full bg-blue-600 hover:bg-blue-700">
                      Add Benefit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map(benefit => (
                <div key={benefit.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Briefcase className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">{benefit.name}</p>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteBenefit(benefit.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Leave History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="p-6 bg-white">
            <h3 className="text-gray-900 mb-4">Employee Leave History</h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Total Days</TableHead>
                    <TableHead>Used Days</TableHead>
                    <TableHead>Remaining Days</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveHistory.map((history) => {
                    const percentage = (history.usedDays / history.totalDays) * 100;
                    return (
                      <TableRow key={history.employeeId}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 ${getDepartmentColor(history.department)} rounded-full flex items-center justify-center text-white text-xs`}>
                              {history.employeeName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-gray-900">{history.employeeName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{history.department}</Badge>
                        </TableCell>
                        <TableCell>{history.leaveType}</TableCell>
                        <TableCell>{history.totalDays} days</TableCell>
                        <TableCell className="text-orange-600">{history.usedDays} days</TableCell>
                        <TableCell className="text-green-600">{history.remainingDays} days</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                percentage < 50 ? 'bg-green-600' : 
                                percentage < 80 ? 'bg-yellow-600' : 
                                'bg-red-600'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{percentage.toFixed(0)}% used</p>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="text-blue-600">Note:</span> Leave balances are automatically updated based on approved leave requests. Days/weeks available are calculated per employee.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
