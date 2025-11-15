import { useState } from 'react';
import { Button } from './ui/button';
import { Shield, Lock, MapPin, Smartphone } from 'lucide-react';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';

interface SecurityPrivacyConfirmationProps {
  onAccept: () => void;
}

export function SecurityPrivacyConfirmation({ onAccept }: SecurityPrivacyConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logoImage} alt="TapTime Logo" className="w-24 h-24" />
          </div>
          <h1 className="text-blue-600 mb-2">TapTime</h1>
          <p className="text-gray-600">Secure Timesheet Management</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full shrink-0">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-900 mb-1">Secure Transaction</h3>
              <p className="text-gray-600 text-sm">
                All your data is encrypted and securely stored. We use industry-standard security measures to protect your information.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full shrink-0">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-900 mb-1">Location Privacy</h3>
              <p className="text-gray-600 text-sm">
                GPS tracking is only active during time in/time out operations and only within company premises. Location tracking stops immediately after logout.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-900 mb-1">Company Isolation</h3>
              <p className="text-gray-600 text-sm">
                Your company data is completely isolated from other companies. No data mixing or unauthorized access between organizations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full shrink-0">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-900 mb-1">Device Security</h3>
              <p className="text-gray-600 text-sm">
                One account per device. Device changes require approval from your department head to prevent unauthorized access.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 text-center">
            By continuing, you acknowledge that you have read and agree to our data privacy and security measures.
          </p>
        </div>

        <Button 
          onClick={onAccept} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
        >
          Accept & Continue
        </Button>
      </div>
    </div>
  );
}
