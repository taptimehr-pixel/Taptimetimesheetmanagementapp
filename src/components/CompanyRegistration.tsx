import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { MapPin, ChevronLeft, ChevronRight, Check, Download, FileText } from 'lucide-react';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';

interface CompanyRegistrationProps {
  onComplete: (companyCode: string, adminName: string, adminCode: string) => void;
  onBack: () => void;
}

export function CompanyRegistration({ onComplete, onBack }: CompanyRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    timezone: '',
    adminFullName: '',
    adminCode: '',
    locationName: '',
    latitude: '',
    longitude: '',
    wifiSSID: '',
    privacyPolicy: false,
    locationConsent: false,
    dataProcessing: false,
    notifications: false,
    emailVerificationCode: '',
    phoneVerificationCode: '',
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const progress = (step / 5) * 100;

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateFormData('latitude', position.coords.latitude.toFixed(6));
          updateFormData('longitude', position.coords.longitude.toFixed(6));
        },
        (error) => {
          console.error('Error detecting location:', error);
        }
      );
    }
  };

  const handleComplete = () => {
    const generatedCompanyCode = 'COMP' + Math.random().toString(36).substring(2, 8).toUpperCase();
    onComplete(generatedCompanyCode, formData.adminFullName, formData.adminCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="text-blue-600 hover:text-blue-700">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center flex-1">
            <img src={logoImage} alt="TapTime Logo" className="w-16 h-16 mx-auto mb-2" />
            <h2 className="text-blue-600">Company Registration</h2>
            <p className="text-sm text-gray-600">Step {step} of 5</p>
          </div>
          <div className="w-6"></div>
        </div>

        <Progress value={progress} className="mb-8" />

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-blue-900 mb-4">Company Information</h3>
            
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                placeholder="Enter company name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(val) => updateFormData('industry', val)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="companySize">Company Size</Label>
              <Select value={formData.companySize} onValueChange={(val) => updateFormData('companySize', val)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select number of employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501+">501+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input 
                id="businessEmail" 
                type="email"
                value={formData.businessEmail}
                onChange={(e) => updateFormData('businessEmail', e.target.value)}
                placeholder="company@example.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="businessPhone">Business Phone Number</Label>
              <Input 
                id="businessPhone" 
                type="tel"
                value={formData.businessPhone}
                onChange={(e) => updateFormData('businessPhone', e.target.value)}
                placeholder="+63 XXX XXX XXXX"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input 
                id="businessAddress" 
                value={formData.businessAddress}
                onChange={(e) => updateFormData('businessAddress', e.target.value)}
                placeholder="Enter business address"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={formData.timezone} onValueChange={(val) => updateFormData('timezone', val)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Manila">Asia/Manila (PHT - UTC+8)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST - UTC+9)</SelectItem>
                  <SelectItem value="Asia/Singapore">Asia/Singapore (SGT - UTC+8)</SelectItem>
                  <SelectItem value="America/New_York">America/New York (EST - UTC-5)</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/Los Angeles (PST - UTC-8)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT - UTC+0)</SelectItem>
                  <SelectItem value="Australia/Sydney">Australia/Sydney (AEDT - UTC+11)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-blue-900 mb-4">Admin Information</h3>
            
            <div>
              <Label htmlFor="adminFullName">Admin Full Name</Label>
              <Input 
                id="adminFullName" 
                value={formData.adminFullName}
                onChange={(e) => updateFormData('adminFullName', e.target.value)}
                placeholder="Enter admin full name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="adminCode">Admin Custom Created Code</Label>
              <Input 
                id="adminCode" 
                type="password"
                value={formData.adminCode}
                onChange={(e) => updateFormData('adminCode', e.target.value)}
                placeholder="Create a secure code"
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                This code will be used to access your admin account. Keep it secure.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-blue-900 mb-4">Location Setup</h3>
            
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Google Map Integration</p>
                <p className="text-sm text-gray-500">Click on map to set exact location</p>
              </div>
            </div>

            <Button 
              onClick={detectLocation}
              variant="outline" 
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Detect Current Location
            </Button>

            <div>
              <Label htmlFor="locationName">Location Name</Label>
              <Input 
                id="locationName" 
                value={formData.locationName}
                onChange={(e) => updateFormData('locationName', e.target.value)}
                placeholder="Main Office, Headquarters"
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input 
                  id="latitude" 
                  value={formData.latitude}
                  onChange={(e) => updateFormData('latitude', e.target.value)}
                  placeholder="14.599512"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input 
                  id="longitude" 
                  value={formData.longitude}
                  onChange={(e) => updateFormData('longitude', e.target.value)}
                  placeholder="120.984222"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="wifiSSID">Office Wi-Fi SSID (Optional)</Label>
              <Input 
                id="wifiSSID" 
                value={formData.wifiSSID}
                onChange={(e) => updateFormData('wifiSSID', e.target.value)}
                placeholder="Company-WiFi-Name"
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                This provides an additional layer of location verification
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-blue-900 mb-4">Privacy & Security</h3>
            
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h4 className="text-blue-900 mb-3">Security and Privacy</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Data Privacy Confirmation: Required acceptance before log-in</li>
                <li>• Secure Transaction: Encrypted data handling</li>
                <li>• Offline Access: GPS or Wi-Fi SSID validation</li>
                <li>• Company Isolation: Data is siloed to prevent mix-ups between companies</li>
              </ul>
            </Card>

            <div className="space-y-3">
              <h4 className="text-gray-700">Required Consents:</h4>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onCheckedChange={(checked) => updateFormData('privacyPolicy', checked)}
                />
                <label htmlFor="privacyPolicy" className="text-sm text-gray-700 cursor-pointer">
                  I agree to the Privacy Policy and Terms of Service
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="locationConsent"
                  checked={formData.locationConsent}
                  onCheckedChange={(checked) => updateFormData('locationConsent', checked)}
                />
                <label htmlFor="locationConsent" className="text-sm text-gray-700 cursor-pointer">
                  I consent to location data collection for attendance tracking
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="dataProcessing"
                  checked={formData.dataProcessing}
                  onCheckedChange={(checked) => updateFormData('dataProcessing', checked)}
                />
                <label htmlFor="dataProcessing" className="text-sm text-gray-700 cursor-pointer">
                  I authorize TapTime to process employee data for payroll and HR purposes
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) => updateFormData('notifications', checked)}
                />
                <label htmlFor="notifications" className="text-sm text-gray-700 cursor-pointer">
                  I would like to receive product updates and security notifications
                </label>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-gray-700 mb-3">Security Commitment:</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Mayor's Permit
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View National Privacy Commission (NPC) Registration
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-blue-900 mb-4">Verification</h3>
            
            <div>
              <Label htmlFor="emailVerification">Verify Business Email</Label>
              <p className="text-sm text-gray-600 mb-2">
                We sent a verification code to {formData.businessEmail}
              </p>
              <Input 
                id="emailVerification" 
                value={formData.emailVerificationCode}
                onChange={(e) => updateFormData('emailVerificationCode', e.target.value)}
                placeholder="Enter email verification code"
                className="mt-2"
              />
              <button className="text-sm text-blue-600 hover:underline mt-2">
                Didn't receive? Click to resend
              </button>
            </div>

            <div>
              <Label htmlFor="phoneVerification">Verify Business Phone</Label>
              <p className="text-sm text-gray-600 mb-2">
                We sent a verification code to {formData.businessPhone}
              </p>
              <Input 
                id="phoneVerification" 
                value={formData.phoneVerificationCode}
                onChange={(e) => updateFormData('phoneVerificationCode', e.target.value)}
                placeholder="Enter phone verification code (Demo code only)"
                className="mt-2"
              />
              <button className="text-sm text-blue-600 hover:underline mt-2">
                Didn't receive? Click to resend
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button 
              onClick={prevStep}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
          
          {step < 5 ? (
            <Button 
              onClick={nextStep}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Complete Registration
              <Check className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
