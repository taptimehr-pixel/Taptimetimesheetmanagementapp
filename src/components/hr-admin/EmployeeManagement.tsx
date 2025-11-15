import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: 'Regular' | 'Part-time' | 'Probationary';
  salaryGrade: string;
  employeeCode: string;
  hrDivision?: string;
}

interface Department {
  id: string;
  name: string;
  color: string;
  employeeCount: number;
}

export function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Finance', color: 'red', employeeCount: 12 },
    { id: '2', name: 'HR', color: 'blue', employeeCount: 8 },
    { id: '3', name: 'Marketing', color: 'green', employeeCount: 15 },
    { id: '4', name: 'Technical', color: 'yellow', employeeCount: 12 },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'John Doe', position: 'Finance Manager', department: 'Finance', status: 'Regular', salaryGrade: 'SG-5', employeeCode: 'FIN001' },
    { id: '2', name: 'Jane Smith', position: 'HR Head', department: 'HR', status: 'Regular', salaryGrade: 'SG-6', employeeCode: 'HR001', hrDivision: 'Administrative' },
    { id: '3', name: 'Mike Johnson', position: 'Marketing Associate', department: 'Marketing', status: 'Probationary', salaryGrade: 'SG-3', employeeCode: 'MKT001' },
    { id: '4', name: 'Sarah Williams', position: 'Technical Lead', department: 'Technical', status: 'Regular', salaryGrade: 'SG-7', employeeCode: 'TEC001' },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    status: 'Regular' as const,
    salaryGrade: '',
    employeeCode: '',
    hrDivision: '',
    pagibig: '',
    gsis: '',
    sss: '',
    workHours: '8',
  });

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    color: 'blue',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Regular': return 'bg-green-600';
      case 'Part-time': return 'bg-blue-600';
      case 'Probationary': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getDepartmentColor = (dept: string) => {
    const department = departments.find(d => d.name === dept);
    switch (department?.color) {
      case 'red': return 'bg-red-500';
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddEmployee = () => {
    const employee: Employee = {
      id: Date.now().toString(),
      name: newEmployee.name,
      position: newEmployee.position,
      department: newEmployee.department,
      status: newEmployee.status,
      salaryGrade: newEmployee.salaryGrade,
      employeeCode: newEmployee.employeeCode,
      hrDivision: newEmployee.department === 'HR' ? newEmployee.hrDivision : undefined,
    };
    setEmployees([...employees, employee]);
    setIsAddEmployeeOpen(false);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      status: 'Regular',
      salaryGrade: '',
      employeeCode: '',
      hrDivision: '',
      pagibig: '',
      gsis: '',
      sss: '',
      workHours: '8',
    });
    toast.success('Employee added successfully!', {
      description: `${employee.name} has been added to the system.`
    });
  };

  const handleAddDepartment = () => {
    const dept: Department = {
      id: Date.now().toString(),
      name: newDepartment.name,
      color: newDepartment.color,
      employeeCount: 0,
    };
    setDepartments([...departments, dept]);
    setIsAddDepartmentOpen(false);
    setNewDepartment({ name: '', color: 'blue' });
    toast.success('Department added successfully!', {
      description: `${dept.name} department has been created.`
    });
  };

  const handleDeleteEmployee = (id: string, name: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast.success('Employee removed', {
      description: `${name} has been removed from the system.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Employee List</h2>
        <div className="flex gap-2">
          <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-600 text-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Department Name</Label>
                  <Input 
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                    placeholder="Enter department name"
                  />
                </div>
                <div>
                  <Label>Department Color</Label>
                  <Select value={newDepartment.color} onValueChange={(val) => setNewDepartment({...newDepartment, color: val})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="yellow">Yellow</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddDepartment} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Department
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input 
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label>Employee Code</Label>
                    <Input 
                      value={newEmployee.employeeCode}
                      onChange={(e) => setNewEmployee({...newEmployee, employeeCode: e.target.value})}
                      placeholder="e.g., FIN001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Department</Label>
                    <Select value={newEmployee.department} onValueChange={(val) => setNewEmployee({...newEmployee, department: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Input 
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                      placeholder="Job position"
                    />
                  </div>
                </div>

                {newEmployee.department === 'HR' && (
                  <div>
                    <Label>HR Division</Label>
                    <Select value={newEmployee.hrDivision} onValueChange={(val) => setNewEmployee({...newEmployee, hrDivision: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select HR division" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrative">Administrative</SelectItem>
                        <SelectItem value="Records">Records</SelectItem>
                        <SelectItem value="Training & Management">Training & Management</SelectItem>
                        <SelectItem value="Recruitment & Placement">Recruitment & Placement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Employee Status</Label>
                    <Select value={newEmployee.status} onValueChange={(val: any) => setNewEmployee({...newEmployee, status: val})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Probationary">Probationary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Salary Grade</Label>
                    <Select value={newEmployee.salaryGrade} onValueChange={(val) => setNewEmployee({...newEmployee, salaryGrade: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select salary grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SG-1">SG-1</SelectItem>
                        <SelectItem value="SG-2">SG-2</SelectItem>
                        <SelectItem value="SG-3">SG-3</SelectItem>
                        <SelectItem value="SG-4">SG-4</SelectItem>
                        <SelectItem value="SG-5">SG-5</SelectItem>
                        <SelectItem value="SG-6">SG-6</SelectItem>
                        <SelectItem value="SG-7">SG-7</SelectItem>
                        <SelectItem value="SG-8">SG-8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Work Hours per Day</Label>
                  <Input 
                    type="number"
                    value={newEmployee.workHours}
                    onChange={(e) => setNewEmployee({...newEmployee, workHours: e.target.value})}
                    placeholder="8"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Pag-IBIG</Label>
                    <Input 
                      value={newEmployee.pagibig}
                      onChange={(e) => setNewEmployee({...newEmployee, pagibig: e.target.value})}
                      placeholder="Pag-IBIG number"
                    />
                  </div>
                  <div>
                    <Label>GSIS</Label>
                    <Input 
                      value={newEmployee.gsis}
                      onChange={(e) => setNewEmployee({...newEmployee, gsis: e.target.value})}
                      placeholder="GSIS number"
                    />
                  </div>
                  <div>
                    <Label>SSS</Label>
                    <Input 
                      value={newEmployee.sss}
                      onChange={(e) => setNewEmployee({...newEmployee, sss: e.target.value})}
                      placeholder="SSS number"
                    />
                  </div>
                </div>

                <Button onClick={handleAddEmployee} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Employee
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Departments Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {departments.map(dept => (
          <Card key={dept.id} className={`p-4 border-l-4 border-l-${dept.color}-500`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${getDepartmentColor(dept.name)} rounded-lg`}></div>
              <div>
                <p className="text-gray-900">{dept.name}</p>
                <p className="text-sm text-gray-600">{dept.employeeCount} employees</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card className="p-4 bg-white">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or employee code..."
              className="pl-10"
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Employee List */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">All Employees ({filteredEmployees.length})</h3>
        <div className="space-y-3">
          {filteredEmployees.map(employee => (
            <div key={employee.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${getDepartmentColor(employee.department)} rounded-lg flex items-center justify-center text-white`}>
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-gray-900">{employee.name}</p>
                  <p className="text-sm text-gray-600">{employee.position} • {employee.employeeCode}</p>
                  {employee.hrDivision && (
                    <p className="text-xs text-blue-600">HR Division: {employee.hrDivision}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{employee.department}</Badge>
                <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
                <Badge variant="outline">{employee.salaryGrade}</Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => handleDeleteEmployee(employee.id, employee.name)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}