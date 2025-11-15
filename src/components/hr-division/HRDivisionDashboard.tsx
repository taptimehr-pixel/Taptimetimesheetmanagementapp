import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, MapPin, Users, Bell, FileText, Calendar, Settings, LogOut, AlertCircle } from 'lucide-react';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';
import { TrainingMaintenanceDashboard } from './TrainingMaintenanceDashboard';
import { RecordsDivisionDashboard } from './RecordsDivisionDashboard';
import { RecruitmentPlacementDashboard } from './RecruitmentPlacementDashboard';
import { AdministrativeDivisionDashboard } from './AdministrativeDivisionDashboard';
import { toast } from 'sonner';

interface HRDivisionDashboardProps {
  name: string;
  division: 'Administrative' | 'Records' | 'Training & Management' | 'Recruitment & Placement';
  onLogout: () => void;
}

export function HRDivisionDashboard({ name, division, onLogout }: HRDivisionDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isWFHMode, setIsWFHMode] = useState(false);
  const [wfhApprovalPending, setWfhApprovalPending] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock user data
  const userData = {
    name: name,
    department: 'HR',
    position: `${division} Staff`,
    contract: 'Regular',
  };

  const handleClockAction = () => {
    if (isWFHMode && !isClockedIn) {
      setWfhApprovalPending(true);
      toast.info('Approval Request Sent', {
        description: 'Waiting for HR Division Records approval...'
      });
      // In real app, this would send approval request
      setTimeout(() => {
        setWfhApprovalPending(false);
        setIsClockedIn(true);
        toast.success('WFH Approved', {
          description: 'Your work from home request has been approved'
        });
      }, 2000);
    } else {
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
    }
  };

  const renderDivisionContent = () => {
    switch (division) {
      case 'Training & Management':
        return <TrainingMaintenanceDashboard />;
      case 'Records':
        return <RecordsDivisionDashboard />;
      case 'Recruitment & Placement':
        return <RecruitmentPlacementDashboard />;
      case 'Administrative':
        return <AdministrativeDivisionDashboard />;
      default:
        return null;
    }
  };

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
                <p className="text-blue-100 text-sm">HR Division Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                <Bell className="w-4 h-4" />
              </Button>
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
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Card */}
        <Card className="p-6 bg-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <button className="text-blue-600 hover:underline mb-2">
                Name (Click Profile)
              </button>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Name: {userData.name}</p>
                <p>Department: {userData.department}</p>
                <p>Position: {userData.position}</p>
                <p>Contract: {userData.contract}</p>
              </div>
            </div>
            <Badge className="bg-blue-600">{division}</Badge>
          </div>
        </Card>

        {/* Dashboard Section */}
        <Card className="p-6 bg-white mb-6">
          <h3 className="text-gray-900 mb-4">DASHBOARD</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Check inside the premises</span>
            </div>
            
            <div className="text-center py-4">
              <p className="text-gray-600 mb-2">Current Time</p>
              <p className="text-blue-900 text-3xl mb-4">{currentTime}</p>
              
              {isWFHMode && !isClockedIn && (
                <p className="text-sm text-orange-600 mb-3">
                  If WFH - Click for Approval, wait until the HR DIVISION Records approved
                </p>
              )}
              
              {wfhApprovalPending && (
                <div className="flex items-center justify-center gap-2 text-orange-600 mb-3">
                  <AlertCircle className="w-5 h-5" />
                  <span>Waiting for approval...</span>
                </div>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={handleClockAction}
                  disabled={wfhApprovalPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  TIME IN
                </Button>
                <Button 
                  onClick={() => setIsClockedIn(false)}
                  disabled={!isClockedIn}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  TIME OUT
                </Button>
              </div>
              
              {isClockedIn && (
                <p className="text-sm text-green-600 mt-3">
                  Clocked in at {new Date().toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Employees</p>
                <p className="text-blue-900 text-2xl">47</p>
              </div>
              <Users className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Attendance Monitoring</p>
                <p className="text-green-900 text-2xl">38 Present</p>
              </div>
              <MapPin className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">System Alerts</p>
                <p className="text-red-900 text-2xl">5</p>
              </div>
              <Bell className="w-10 h-10 text-red-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Personal Record */}
        <Card className="p-6 bg-white mb-6">
          <h3 className="text-gray-900 mb-4">PERSONAL RECORD:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-900">View DTR</p>
            </button>
            <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-900">VIEW Payroll</p>
            </button>
            <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-900">VIEW LEAVE BENEFITS</p>
            </button>
            <div className="p-4 border border-blue-200 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Mode</p>
              <button 
                onClick={() => setIsWFHMode(!isWFHMode)}
                className={`text-sm ${isWFHMode ? 'text-orange-600' : 'text-blue-600'}`}
              >
                {isWFHMode ? 'Approval For WFM' : 'Personal'}
              </button>
            </div>
          </div>
          {isWFHMode && (
            <div className="mt-4">
              <button className="p-4 w-full border border-orange-200 rounded-lg hover:bg-orange-50 text-left">
                <p className="text-sm text-gray-900">Task & Documentation from WFH</p>
              </button>
            </div>
          )}
        </Card>

        {/* Division Specific Content */}
        {renderDivisionContent()}
      </div>
    </div>
  );
}