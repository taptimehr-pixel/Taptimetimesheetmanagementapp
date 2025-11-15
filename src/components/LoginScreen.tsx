import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';
import { toast } from 'sonner';

interface LoginScreenProps {
  onRegisterCompany: () => void;
  onPrivacyClick: () => void;
  onLogin: (role: string, name: string, code: string) => void;
}

export function LoginScreen({ onRegisterCompany, onPrivacyClick, onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    if (selectedRole && name && code) {
      toast.success('Login Successful!', {
        description: `Welcome back, ${name}`
      });
      onLogin(selectedRole, name, code);
    } else {
      toast.error('Login Failed', {
        description: 'Please fill in all required fields'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logoImage} alt="TapTime Logo" className="w-20 h-20" />
          </div>
          <h1 className="text-blue-600">TapTime</h1>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-gray-700 mb-2 block">Select Your Role</Label>
            <p className="text-sm text-gray-500 mb-3">Choose your access level</p>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr-admin">HR Admin</SelectItem>
                <SelectItem value="hr-division">HR Division</SelectItem>
                <SelectItem value="department-head">Department Head</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name" className="text-gray-700">Name</Label>
            <Input 
              id="name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2" 
              placeholder="Enter your name"
            />
          </div>

          <div>
            <Label htmlFor="code" className="text-gray-700">Code</Label>
            <Input 
              id="code" 
              type="password" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-2" 
              placeholder="Enter your code"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              Forgot Code?
            </button>
          </div>

          <Button 
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            SIGN IN
          </Button>

          <div className="text-center space-y-3">
            <button 
              onClick={onRegisterCompany}
              className="text-blue-600 hover:underline block w-full"
            >
              Register your Company
            </button>
            <button 
              onClick={onPrivacyClick}
              className="text-gray-600 hover:underline block w-full"
            >
              Security and Privacy
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          @TapTime2027
        </div>
      </div>
    </div>
  );
}