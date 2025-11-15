import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Clock, MapPin, Calendar, Users, FileText, Settings, LogOut, Menu } from 'lucide-react';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';
import { HRDivisionDashboard } from './hr-division/HRDivisionDashboard';
import { toast } from 'sonner';

interface DashboardProps {
  role: string;
  name: string;
  onLogout: () => void;
}

export function Dashboard({ role, name, onLogout }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isClockedIn, setIsClockedIn] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      'hr-admin': 'HR Admin',
      'hr-division': 'HR Division',
      'department-head': 'Department Head',
      'employee': 'Employee'
    };
    return roleMap[role] || role;
  };

  // For HR Division, show division-specific dashboard
  // In a real app, the division would be stored in user data
  // For demo, we'll show Training & Management division
  if (role === 'hr-division') {
    return (
      <HRDivisionDashboard 
        name={name}
        division="Training & Management"
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="TapTime Logo" className="w-12 h-12" />
              <div>
                <h1 className="text-white">TapTime</h1>
                <p className="text-blue-100 text-sm">{getRoleDisplayName(role)}</p>
              </div>
            </div>
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Welcome back,</p>
              <p className="text-white">{name}</p>
            </div>
            <Button 
              onClick={onLogout}
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Clock In/Out Card */}
        <Card className="p-6 mb-6 bg-white border-blue-200">
          <div className="text-center">
            <div className="text-gray-600 mb-2">Current Time</div>
            <div className="text-blue-900 text-4xl mb-4">{currentTime}</div>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Location Verified ✓</span>
            </div>
            <Button 
              onClick={handleClockAction}
              className={`w-full max-w-md py-6 text-lg ${
                isClockedIn 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              <Clock className="w-5 h-5 mr-2" />
              {isClockedIn ? 'Clock Out' : 'Clock In'}
            </Button>
            {isClockedIn && (
              <p className="text-sm text-green-600 mt-3">
                Clocked in at {new Date().toLocaleTimeString()}
              </p>
            )}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 bg-white border-l-4 border-l-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Hours This Week</p>
                <p className="text-blue-900 text-2xl">40.5</p>
              </div>
              <Clock className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-l-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Leave Balance</p>
                <p className="text-green-900 text-2xl">12 days</p>
              </div>
              <Calendar className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-l-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Overtime Hours</p>
                <p className="text-purple-900 text-2xl">5.5</p>
              </div>
              <Clock className="w-10 h-10 text-purple-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-1">My Timesheet</h3>
              <p className="text-sm text-gray-600">View attendance records</p>
            </div>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-3">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Leave Request</h3>
              <p className="text-sm text-gray-600">Apply for leave</p>
            </div>
          </Card>

          {(role === 'hr-admin' || role === 'department-head') && (
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-1">Team Management</h3>
                <p className="text-sm text-gray-600">Manage team members</p>
              </div>
            </Card>
          )}

          <Card className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-3">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Settings</h3>
              <p className="text-sm text-gray-600">Account settings</p>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6 p-6 bg-white">
          <h3 className="text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 text-sm">Clocked In</p>
                  <p className="text-gray-500 text-xs">Today at 9:00 AM</p>
                </div>
              </div>
              <span className="text-green-600 text-sm">✓</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900 text-sm">Leave Request Approved</p>
                  <p className="text-gray-500 text-xs">Yesterday</p>
                </div>
              </div>
              <span className="text-green-600 text-sm">✓</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}