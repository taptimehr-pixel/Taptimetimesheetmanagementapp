import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell,
  Menu,
  LayoutDashboard,
  UserCog,
  ClipboardList,
  DollarSign,
  CheckCircle,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';
import { AttendanceMonitoring } from './hr-admin/AttendanceMonitoring';
import { EmployeeManagement } from './hr-admin/EmployeeManagement';
import { DTRManagement } from './hr-admin/DTRManagement';
import { PayrollManagement } from './hr-admin/PayrollManagement';
import { ApprovalCenter } from './hr-admin/ApprovalCenter';
import { LeavesAndBenefits } from './hr-admin/LeavesAndBenefits';
import { SystemConfiguration } from './hr-admin/SystemConfiguration';
import { TaskManagement } from './hr-admin/TaskManagement';
import { toast } from 'sonner';

interface HRAdminDashboardProps {
  name: string;
  onLogout: () => void;
}

type ActiveView = 
  | 'overview' 
  | 'attendance' 
  | 'employees' 
  | 'dtr' 
  | 'payroll' 
  | 'approvals' 
  | 'leaves' 
  | 'settings'
  | 'tasks';

export function HRAdminDashboard({ name, onLogout }: HRAdminDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Mock data
  const totalEmployees = 47;
  const pendingApprovals = 8;
  const systemAlerts = {
    all: 12,
    unread: 5,
    high: 2,
    medium: 3
  };

  const handleClockAction = () => {
    setIsClockedIn(!isClockedIn);
    if (!isClockedIn) {
      toast.success('Clocked In', {
        description: `You clocked in at ${new Date().toLocaleTimeString()}`
      });
    } else {
      toast.success('Clocked Out', {
        description: `You clocked out at ${new Date().toLocaleTimeString()}`
      });
    }
  };

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'attendance', icon: MapPin, label: 'Attendance Monitoring' },
    { id: 'employees', icon: UserCog, label: 'Employee List' },
    { id: 'dtr', icon: ClipboardList, label: 'Manage DTR' },
    { id: 'payroll', icon: DollarSign, label: 'Payroll' },
    { id: 'approvals', icon: CheckCircle, label: 'Pending Approvals' },
    { id: 'leaves', icon: Calendar, label: 'Leaves & Benefits' },
    { id: 'tasks', icon: Briefcase, label: 'Task Management' },
    { id: 'settings', icon: Settings, label: 'System Configuration' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
              <img src={logoImage} alt="TapTime Logo" className="w-10 h-10" />
              {sidebarOpen && <span className="text-white">TapTime</span>}
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ActiveView)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id 
                    ? 'bg-white text-blue-600' 
                    : 'text-white hover:bg-blue-700'
                } ${!sidebarOpen && 'justify-center'}`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="mt-8">
            <Button
              onClick={onLogout}
              className="w-full bg-white text-blue-600 hover:bg-blue-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {sidebarOpen && 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-gray-900">HR Admin Dashboard</h2>
                <p className="text-sm text-gray-600">Welcome back, {name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  {systemAlerts.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {systemAlerts.unread}
                    </span>
                  )}
                </Button>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Time</p>
                <p className="text-blue-600">{currentTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* Clock In/Out Section */}
              <Card className="p-6 bg-white">
                <h3 className="text-gray-900 mb-4">HR Admin Personal Record</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Clock In/Out</p>
                      <p className="text-gray-900">Used by HR to log their own attendance</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleClockAction}
                    className={`${
                      isClockedIn 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {isClockedIn ? 'Time Out' : 'Time In'}
                  </Button>
                </div>
                {isClockedIn && (
                  <p className="text-sm text-green-600 mt-3 text-right">
                    Clocked in at {new Date().toLocaleTimeString()}
                  </p>
                )}
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-white border-l-4 border-l-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Total Employees</p>
                      <p className="text-blue-900 text-3xl">{totalEmployees}</p>
                    </div>
                    <Users className="w-12 h-12 text-blue-600 opacity-20" />
                  </div>
                </Card>

                <Card className="p-6 bg-white border-l-4 border-l-orange-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Pending Approvals</p>
                      <p className="text-orange-900 text-3xl">{pendingApprovals}</p>
                    </div>
                    <CheckCircle className="w-12 h-12 text-orange-600 opacity-20" />
                  </div>
                </Card>

                <Card className="p-6 bg-white border-l-4 border-l-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Present Today</p>
                      <p className="text-green-900 text-3xl">38</p>
                    </div>
                    <MapPin className="w-12 h-12 text-green-600 opacity-20" />
                  </div>
                </Card>

                <Card className="p-6 bg-white border-l-4 border-l-red-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">System Alerts</p>
                      <p className="text-red-900 text-3xl">{systemAlerts.unread}</p>
                    </div>
                    <AlertCircle className="w-12 h-12 text-red-600 opacity-20" />
                  </div>
                </Card>
              </div>

              {/* System Alerts */}
              <Card className="p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">System Alerts</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline">All ({systemAlerts.all})</Badge>
                    <Badge className="bg-blue-600">Unread ({systemAlerts.unread})</Badge>
                    <Badge variant="destructive">High ({systemAlerts.high})</Badge>
                    <Badge className="bg-orange-500">Medium ({systemAlerts.medium})</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 border-l-4 border-l-red-500 rounded">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-gray-900">New device login detected</p>
                        <p className="text-sm text-gray-600">John Doe - Finance Department</p>
                      </div>
                    </div>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 border-l-4 border-l-orange-500 rounded">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-gray-900">Multiple leave requests pending</p>
                        <p className="text-sm text-gray-600">5 requests awaiting approval</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-500">Medium</Badge>
                  </div>
                </div>
              </Card>

              {/* HR Admin Personal */}
              <Card className="p-6 bg-white">
                <h3 className="text-gray-900 mb-4">HR Admin Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <DollarSign className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-gray-900">View Payroll</p>
                    <p className="text-sm text-gray-600">Personal payroll history</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <Briefcase className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-gray-900">Benefits</p>
                    <p className="text-sm text-gray-600">Benefits acquired</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-gray-900">Leave Request</p>
                    <p className="text-sm text-gray-600">Apply for leave</p>
                  </button>
                </div>
              </Card>

              {/* Quick Navigation */}
              <Card className="p-6 bg-white">
                <h3 className="text-gray-900 mb-4">Quick Navigation</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveView('employees')}
                    className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                  >
                    <UserCog className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-900 text-sm">Employee List</p>
                  </button>
                  <button 
                    onClick={() => setActiveView('dtr')}
                    className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                  >
                    <ClipboardList className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-900 text-sm">Manage Records</p>
                  </button>
                  <button 
                    onClick={() => setActiveView('approvals')}
                    className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                  >
                    <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-900 text-sm">Overtime/Undertime</p>
                  </button>
                  <button 
                    onClick={() => setActiveView('leaves')}
                    className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                  >
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-900 text-sm">Leaves & Benefits</p>
                  </button>
                  <button 
                    onClick={() => setActiveView('attendance')}
                    className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                  >
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-900 text-sm">Attendance Monitoring</p>
                  </button>
                  <button 
                    onClick={() => setActiveView('payroll')}
                    className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                  >
                    <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-900 text-sm">Payroll</p>
                  </button>
                  <button 
                    onClick={() => setActiveView('settings')}
                    className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                  >
                    <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-900 text-sm">System Config</p>
                  </button>
                  <button 
                    onClick={() => setActiveView('tasks')}
                    className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                  >
                    <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-900 text-sm">Task Management</p>
                  </button>
                </div>
              </Card>
            </div>
          )}

          {activeView === 'attendance' && <AttendanceMonitoring />}
          {activeView === 'employees' && <EmployeeManagement />}
          {activeView === 'dtr' && <DTRManagement />}
          {activeView === 'payroll' && <PayrollManagement />}
          {activeView === 'approvals' && <ApprovalCenter />}
          {activeView === 'leaves' && <LeavesAndBenefits />}
          {activeView === 'settings' && <SystemConfiguration />}
          {activeView === 'tasks' && <TaskManagement />}
        </div>
      </div>
    </div>
  );
}