import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronLeft, Shield, Lock, Database, UserCheck } from 'lucide-react';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

export function PrivacyPolicyScreen({ onBack }: PrivacyPolicyScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 my-8">
          <button onClick={onBack} className="text-blue-600 hover:text-blue-700 mb-6 flex items-center">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <div className="text-center mb-8">
            <img src={logoImage} alt="TapTime Logo" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-blue-900 mb-2">SECURITY AND PRIVACY</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <button className="p-4 border-b-2 border-blue-600 text-blue-600 hover:bg-blue-50">
              Data Collection
            </button>
            <button className="p-4 border-b-2 border-transparent text-gray-600 hover:bg-gray-50">
              Data Security
            </button>
            <button className="p-4 border-b-2 border-transparent text-gray-600 hover:bg-gray-50">
              Data Usage
            </button>
            <button className="p-4 border-b-2 border-transparent text-gray-600 hover:bg-gray-50">
              Your Rights
            </button>
          </div>

          <div className="space-y-8">
            <Card className="p-6 border-blue-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-blue-900 mb-2">Data Collection</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Name and Codes</li>
                    <li>• Time and attendance records</li>
                    <li>• Location data (only during clock-in/out)</li>
                    <li>• Leave and overtime requests</li>
                    <li>• Department assignments</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-blue-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-blue-900 mb-2">Data Security</h3>
                  <p className="text-gray-700 mb-3">We implement industry-standard security:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Encrypted data transmission</li>
                    <li>• Secure local storage</li>
                    <li>• Company data isolation</li>
                    <li>• Access control via unique codes</li>
                    <li>• No unauthorized data sharing</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-blue-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-blue-900 mb-2">Data Usage</h3>
                  <p className="text-gray-700 mb-3">Your data is used exclusively for:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Attendance tracking</li>
                    <li>• Payroll calculation</li>
                    <li>• Leave Management</li>
                    <li>• HR Reporting</li>
                    <li>• Improving app functionality</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-blue-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-blue-900 mb-2">Your Rights</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Access your personal data</li>
                    <li>• Request data correction</li>
                    <li>• Opt-out of location tracking</li>
                    <li>• File privacy complaints</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-gray-700 text-center mb-2">
              For privacy concerns, contact your HR Administrator or email us at
            </p>
            <p className="text-blue-600 text-center">
              TapTimeHr@gmail.com
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By using TapTime, you agree to this privacy policy.
            </p>
            <p className="text-sm text-gray-500 mt-2">@TapTime2027</p>
          </div>
        </div>
      </div>
    </div>
  );
}
