import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { MapPin, Wifi, Settings, Home } from 'lucide-react';

export function SystemConfiguration() {
  const [workMode, setWorkMode] = useState<'personal' | 'off-location'>('personal');
  const [locationTracking, setLocationTracking] = useState(true);
  const [wifiVerification, setWifiVerification] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleWorkModeChange = (mode: 'personal' | 'off-location') => {
    setWorkMode(mode);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">System Configuration</h2>
        <Badge className="bg-blue-600">Admin Only</Badge>
      </div>

      {/* Work Mode Configuration */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-gray-900">Work Mode Configuration</h3>
            <p className="text-sm text-gray-600">Set the default work mode for all employees</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleWorkModeChange('personal')}
            className={`p-6 border-2 rounded-lg transition-all ${
              workMode === 'personal'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-full ${
                workMode === 'personal' ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                <MapPin className={`w-6 h-6 ${
                  workMode === 'personal' ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="text-left">
                <p className={`${workMode === 'personal' ? 'text-blue-900' : 'text-gray-900'}`}>
                  Personal (On-Location)
                </p>
                <p className="text-sm text-gray-600">Time in/out by premises</p>
              </div>
            </div>
            <div className="text-left text-sm text-gray-600 space-y-1">
              <p>✓ GPS verification required</p>
              <p>✓ Wi-Fi SSID validation</p>
              <p>✓ Location-based attendance</p>
            </div>
          </button>

          <button
            onClick={() => handleWorkModeChange('off-location')}
            className={`p-6 border-2 rounded-lg transition-all ${
              workMode === 'off-location'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-full ${
                workMode === 'off-location' ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                <Home className={`w-6 h-6 ${
                  workMode === 'off-location' ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="text-left">
                <p className={`${workMode === 'off-location' ? 'text-blue-900' : 'text-gray-900'}`}>
                  Off-Location (Work From Home)
                </p>
                <p className="text-sm text-gray-600">Task-based management</p>
              </div>
            </div>
            <div className="text-left text-sm text-gray-600 space-y-1">
              <p>✓ Task assignment system</p>
              <p>✓ No location verification</p>
              <p>✓ Division-based tasks</p>
            </div>
          </button>
        </div>

        {workMode === 'personal' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="text-blue-600">Active:</span> Employees must be within designated premises to clock in/out. GPS and Wi-Fi verification enabled.
            </p>
          </div>
        )}

        {workMode === 'off-location' && (
          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-900">
              <span className="text-orange-600">Active:</span> Task-based mode enabled. Employees can work remotely and complete assigned tasks. See Task Management section.
            </p>
          </div>
        )}
      </Card>

      {/* Location Settings */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-gray-900">Location Verification Settings</h3>
            <p className="text-sm text-gray-600">Configure location-based attendance verification</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <Label htmlFor="location-tracking" className="text-gray-900">GPS Location Tracking</Label>
              <p className="text-sm text-gray-600">Track employee location during clock in/out</p>
            </div>
            <Switch 
              id="location-tracking"
              checked={locationTracking}
              onCheckedChange={setLocationTracking}
            />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <Label htmlFor="wifi-verification" className="text-gray-900">Wi-Fi SSID Verification</Label>
              <p className="text-sm text-gray-600">Verify employees are on company Wi-Fi network</p>
            </div>
            <Switch 
              id="wifi-verification"
              checked={wifiVerification}
              onCheckedChange={setWifiVerification}
            />
          </div>
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Settings className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-gray-900">System Settings</h3>
            <p className="text-sm text-gray-600">General system configurations</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <Label htmlFor="auto-save" className="text-gray-900">Auto-Save DTR Changes</Label>
              <p className="text-sm text-gray-600">Automatically save DTR and payroll edits</p>
            </div>
            <Switch 
              id="auto-save"
              checked={autoSave}
              onCheckedChange={setAutoSave}
            />
          </div>
        </div>
      </Card>

      {/* Department Settings */}
      <Card className="p-6 bg-white">
        <h3 className="text-gray-900 mb-4">Department-Specific Settings</h3>
        
        <div className="space-y-3">
          <div className="p-4 border-l-4 border-l-red-500 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900">Finance Department</p>
              <Badge className="bg-red-500">Active</Badge>
            </div>
            <p className="text-sm text-gray-600">Work Hours: 8 hours/day • Color: Red</p>
          </div>

          <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900">HR Department</p>
              <Badge className="bg-blue-500">Active</Badge>
            </div>
            <p className="text-sm text-gray-600">Work Hours: 8 hours/day • Color: Blue</p>
            <p className="text-xs text-gray-600 mt-1">Divisions: Administrative, Records, Training & Management, Recruitment & Placement</p>
          </div>

          <div className="p-4 border-l-4 border-l-green-500 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900">Marketing Department</p>
              <Badge className="bg-green-500">Active</Badge>
            </div>
            <p className="text-sm text-gray-600">Work Hours: 8 hours/day • Color: Green</p>
          </div>

          <div className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900">Technical Department</p>
              <Badge className="bg-yellow-500 text-gray-900">Active</Badge>
            </div>
            <p className="text-sm text-gray-600">Work Hours: 8 hours/day • Color: Yellow</p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Settings className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
