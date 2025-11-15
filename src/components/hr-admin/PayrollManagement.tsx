import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { Download, DollarSign } from 'lucide-react';
import { Badge } from '../ui/badge';

interface PayrollEmployee {
  id: string;
  name: string;
  department: string;
  status: 'Regular' | 'Part-time' | 'Probationary';
  baseSalary: number;
  overtime: number;
  undertime: number;
  deductions: {
    pagibig: number;
    gsis: number;
    sss: number;
  };
  netSalary: number;
}

export function PayrollManagement() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const departments = [
    { id: '1', name: 'Finance', color: 'red' },
    { id: '2', name: 'HR', color: 'blue' },
    { id: '3', name: 'Marketing', color: 'green' },
    { id: '4', name: 'Technical', color: 'yellow' },
  ];

  // Mock payroll data
  const [payrollData, setPayrollData] = useState<PayrollEmployee[]>([
    {
      id: '1',
      name: 'John Doe',
      department: 'Finance',
      status: 'Regular',
      baseSalary: 50000,
      overtime: 2500,
      undertime: 500,
      deductions: { pagibig: 200, gsis: 1500, sss: 1200 },
      netSalary: 49100
    },
    {
      id: '2',
      name: 'Jane Smith',
      department: 'HR',
      status: 'Regular',
      baseSalary: 55000,
      overtime: 1500,
      undertime: 0,
      deductions: { pagibig: 200, gsis: 1650, sss: 1320 },
      netSalary: 53330
    },
    {
      id: '3',
      name: 'Mike Johnson',
      department: 'Marketing',
      status: 'Probationary',
      baseSalary: 35000,
      overtime: 1000,
      undertime: 300,
      deductions: { pagibig: 200, gsis: 1050, sss: 840 },
      netSalary: 33610
    },
    {
      id: '4',
      name: 'Sarah Williams',
      department: 'Technical',
      status: 'Regular',
      baseSalary: 60000,
      overtime: 3000,
      undertime: 0,
      deductions: { pagibig: 200, gsis: 1800, sss: 1440 },
      netSalary: 59560
    },
  ]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Regular': return 'bg-green-600';
      case 'Part-time': return 'bg-blue-600';
      case 'Probationary': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredPayroll = payrollData.filter(emp => {
    const matchesDepartment = !selectedDepartment || emp.department === selectedDepartment;
    const matchesStatus = !selectedStatus || emp.status === selectedStatus;
    return matchesDepartment && matchesStatus;
  });

  const toggleEmployeeSelection = (id: string) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter(empId => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.length === filteredPayroll.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredPayroll.map(emp => emp.id));
    }
  };

  const handleDownloadPayroll = () => {
    const selectedData = payrollData.filter(emp => selectedEmployees.includes(emp.id));
    
    const headers = ['Name', 'Department', 'Status', 'Base Salary', 'Overtime', 'Undertime', 'Pag-IBIG', 'GSIS', 'SSS', 'Net Salary'];
    const rows = selectedData.map(emp => [
      emp.name,
      emp.department,
      emp.status,
      emp.baseSalary,
      emp.overtime,
      emp.undertime,
      emp.deductions.pagibig,
      emp.deductions.gsis,
      emp.deductions.sss,
      emp.netSalary
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payroll_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalSalaries = filteredPayroll.reduce((sum, emp) => sum + emp.netSalary, 0);
  const totalOvertime = filteredPayroll.reduce((sum, emp) => sum + emp.overtime, 0);
  const totalDeductions = filteredPayroll.reduce((sum, emp) => 
    sum + emp.deductions.pagibig + emp.deductions.gsis + emp.deductions.sss, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Payroll Management</h2>
        <Button 
          onClick={handleDownloadPayroll}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={selectedEmployees.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Download Payroll ({selectedEmployees.length})
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Payroll</p>
              <p className="text-blue-900 text-2xl">₱{totalSalaries.toLocaleString()}</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Overtime</p>
              <p className="text-green-900 text-2xl">₱{totalOvertime.toLocaleString()}</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Deductions</p>
              <p className="text-red-900 text-2xl">₱{totalDeductions.toLocaleString()}</p>
            </div>
            <DollarSign className="w-10 h-10 text-red-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Employees</p>
              <p className="text-purple-900 text-2xl">{filteredPayroll.length}</p>
            </div>
            <DollarSign className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </Card>
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
        <h3 className="text-gray-900 mb-4">Payroll Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Employee Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Probationary">Probationary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Payroll Table */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Employee Payroll ({filteredPayroll.length})</h3>
          <button onClick={toggleSelectAll} className="text-sm text-blue-600 hover:underline">
            {selectedEmployees.length === filteredPayroll.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedEmployees.length === filteredPayroll.length && filteredPayroll.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Undertime</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayroll.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{employee.name}</p>
                      <p className="text-xs text-gray-500">{employee.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
                  </TableCell>
                  <TableCell>₱{employee.baseSalary.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">
                    {employee.overtime > 0 ? `+₱${employee.overtime.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="text-red-600">
                    {employee.undertime > 0 ? `-₱${employee.undertime.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs space-y-1">
                      <p className="text-gray-600">Pag-IBIG: ₱{employee.deductions.pagibig}</p>
                      <p className="text-gray-600">GSIS: ₱{employee.deductions.gsis}</p>
                      <p className="text-gray-600">SSS: ₱{employee.deductions.sss}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-600">₱{employee.netSalary.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="text-blue-600">Note:</span> Overtime is automatically calculated from the system. Undertime values are sourced from DTR records. Salaries are editable and GSIS/Pag-IBIG deductions are automatically calculated.
          </p>
        </div>
      </Card>
    </div>
  );
}
