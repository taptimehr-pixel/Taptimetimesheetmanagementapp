import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, Calendar, Users, BarChart, CheckCircle, Settings, FileText } from 'lucide-react';

interface TrainingSchedule {
  id: string;
  name: string;
  department: string;
  schedule: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface Task {
  id: string;
  title: string;
  division: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  documentation?: string;
}

export function TrainingMaintenanceDashboard() {
  const [isAddTrainingOpen, setIsAddTrainingOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const hrDivisions = ['Administrative', 'Records', 'Training & Management', 'Recruitment & Placement'];
  const departments = ['Finance', 'HR', 'Marketing', 'Technical'];

  const [trainings, setTrainings] = useState<TrainingSchedule[]>([
    {
      id: '1',
      name: 'New HR Policies Workshop',
      department: 'All Departments',
      schedule: '2025-10-20',
      time: '9:00 AM - 12:00 PM',
      venue: 'Conference Room A',
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'Safety Training',
      department: 'Technical',
      schedule: '2025-10-18',
      time: '2:00 PM - 4:00 PM',
      venue: 'Training Center',
      status: 'ongoing',
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Update training materials',
      division: 'Training & Management',
      dueDate: '2025-10-25',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Review employee records',
      division: 'Records',
      dueDate: '2025-10-22',
      status: 'pending',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'ongoing': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-gray-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
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
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Compliance</p>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
            <BarChart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-900">Analytics</p>
          </button>
        </div>
      </Card>

      {/* Task Section */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">TASK</h3>
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Task for Division</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Task Title</Label>
                  <Input placeholder="Enter task title" className="mt-2" />
                </div>
                <div>
                  <Label>Assign to Division</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      {hrDivisions.map(div => (
                        <SelectItem key={div} value={div}>{div}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input type="date" className="mt-2" />
                </div>
                <div>
                  <Label>Task Description</Label>
                  <Textarea placeholder="Enter task description" className="mt-2" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-gray-900">{task.title}</p>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Division: {task.division}</p>
                  <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Check Documentation
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Training Schedules */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">TRAINING SCHEDULES</h3>
          <Dialog open={isAddTrainingOpen} onOpenChange={setIsAddTrainingOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Training
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Training</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Training Name</Label>
                  <Input placeholder="Enter training name" className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Department Involved</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
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
                    <Label>Schedule</Label>
                    <Input type="date" className="mt-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Time</Label>
                    <Input placeholder="e.g., 9:00 AM - 12:00 PM" className="mt-2" />
                  </div>
                  <div>
                    <Label>Venue</Label>
                    <Input placeholder="Enter venue" className="mt-2" />
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Schedule Training
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name of Training</TableHead>
                <TableHead>Department Involved</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainings.map(training => (
                <TableRow key={training.id}>
                  <TableCell className="text-gray-900">{training.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{training.department}</Badge>
                  </TableCell>
                  <TableCell>{new Date(training.schedule).toLocaleDateString()}</TableCell>
                  <TableCell>{training.time}</TableCell>
                  <TableCell>{training.venue}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(training.status)}>
                      {training.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Company Settings */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-blue-600" />
          <h3 className="text-gray-900">COMPANY SETTING</h3>
        </div>
        <div className="mt-4 space-y-3">
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="text-gray-900">Training Preferences</p>
            <p className="text-sm text-gray-600">Configure training settings and notifications</p>
          </button>
          <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <p className="text-gray-900">Documentation Requirements</p>
            <p className="text-sm text-gray-600">Set documentation standards for tasks</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
