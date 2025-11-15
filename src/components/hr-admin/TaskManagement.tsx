import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Task {
  id: string;
  title: string;
  description: string;
  division: string;
  assignedTo: string[];
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export function TaskManagement() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const hrDivisions = [
    'Administrative',
    'Records',
    'Training & Management',
    'Recruitment & Placement',
  ];

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Update Employee Records',
      description: 'Update all employee records with new information from Q3',
      division: 'Records',
      assignedTo: ['Jane Smith', 'Tom Brown'],
      dueDate: '2025-10-20',
      status: 'in-progress',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Conduct Training Session',
      description: 'Organize and conduct training session on new HR policies',
      division: 'Training & Management',
      assignedTo: ['Emily Davis'],
      dueDate: '2025-10-25',
      status: 'pending',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Process New Hire Documents',
      description: 'Process documents for 3 new hires starting next month',
      division: 'Recruitment & Placement',
      assignedTo: ['Sarah Williams'],
      dueDate: '2025-10-15',
      status: 'completed',
      priority: 'high',
    },
    {
      id: '4',
      title: 'Prepare Monthly Reports',
      description: 'Compile and prepare monthly HR administrative reports',
      division: 'Administrative',
      assignedTo: ['Jane Smith'],
      dueDate: '2025-10-30',
      status: 'pending',
      priority: 'low',
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    division: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleAddTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      division: newTask.division,
      assignedTo: newTask.assignedTo.split(',').map(name => name.trim()),
      dueDate: newTask.dueDate,
      status: 'pending',
      priority: newTask.priority,
    };
    setTasks([...tasks, task]);
    setIsAddTaskOpen(false);
    setNewTask({
      title: '',
      description: '',
      division: '',
      assignedTo: '',
      dueDate: '',
      priority: 'medium',
    });
  };

  const updateTaskStatus = (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500 text-gray-900';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'in-progress': return <AlertCircle className="w-5 h-5" />;
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getDivisionColor = (division: string) => {
    switch (division) {
      case 'Administrative': return 'border-blue-500';
      case 'Records': return 'border-purple-500';
      case 'Training & Management': return 'border-green-500';
      case 'Recruitment & Placement': return 'border-orange-500';
      default: return 'border-gray-500';
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Task Management</h2>
          <p className="text-sm text-gray-600">For HR Department - Off Location Mode</p>
        </div>
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Task Title</Label>
                <Input 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea 
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>HR Division</Label>
                  <Select value={newTask.division} onValueChange={(val) => setNewTask({...newTask, division: val})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      {hrDivisions.map(division => (
                        <SelectItem key={division} value={division}>{division}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Priority</Label>
                  <Select value={newTask.priority} onValueChange={(val: any) => setNewTask({...newTask, priority: val})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Assigned To</Label>
                  <Input 
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                    placeholder="Name 1, Name 2"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple names with commas</p>
                </div>

                <div>
                  <Label>Due Date</Label>
                  <Input 
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button onClick={handleAddTask} className="w-full bg-blue-600 hover:bg-blue-700">
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Banner */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="text-blue-600">ℹ️ Off-Location Mode:</span> Create and assign tasks to HR division members when working remotely. Tasks help track productivity and compliance during work-from-home arrangements.
        </p>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border-l-4 border-l-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pending Tasks</p>
              <p className="text-orange-900 text-3xl">{pendingTasks.length}</p>
            </div>
            <Clock className="w-10 h-10 text-orange-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">In Progress</p>
              <p className="text-blue-900 text-3xl">{inProgressTasks.length}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Completed</p>
              <p className="text-green-900 text-3xl">{completedTasks.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Tasks by Division */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
            {hrDivisions.map(division => (
              <TabsTrigger key={division} value={division}>
                {division} ({tasks.filter(t => t.division === division).length})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {tasks.map(task => (
              <div 
                key={task.id}
                className={`p-4 border-l-4 ${getDivisionColor(task.division)} rounded-lg bg-gray-50`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-gray-900">{task.title}</p>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Division: {task.division}</span>
                      <span>•</span>
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Assigned to: {task.assignedTo.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {task.status !== 'completed' && (
                      <>
                        {task.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'in-progress')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Start
                          </Button>
                        )}
                        {task.status === 'in-progress' && (
                          <Button 
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Complete
                          </Button>
                        )}
                      </>
                    )}
                    {task.status === 'completed' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No tasks created yet
              </div>
            )}
          </TabsContent>

          {hrDivisions.map(division => (
            <TabsContent key={division} value={division} className="space-y-3">
              {tasks.filter(t => t.division === division).map(task => (
                <div 
                  key={task.id}
                  className={`p-4 border-l-4 ${getDivisionColor(task.division)} rounded-lg bg-gray-50`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-900">{task.title}</p>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Assigned to: {task.assignedTo.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {task.status !== 'completed' && (
                        <>
                          {task.status === 'pending' && (
                            <Button 
                              size="sm"
                              onClick={() => updateTaskStatus(task.id, 'in-progress')}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Start
                            </Button>
                          )}
                          {task.status === 'in-progress' && (
                            <Button 
                              size="sm"
                              onClick={() => updateTaskStatus(task.id, 'completed')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Complete
                            </Button>
                          )}
                        </>
                      )}
                      {task.status === 'completed' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm">Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.division === division).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No tasks for this division
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
