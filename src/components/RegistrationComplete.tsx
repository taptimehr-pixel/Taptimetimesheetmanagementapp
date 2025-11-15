import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check, Download } from 'lucide-react';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';

interface RegistrationCompleteProps {
  companyCode: string;
  adminName: string;
  adminCode: string;
  onGoToDashboard: () => void;
}

export function RegistrationComplete({ 
  companyCode, 
  adminName, 
  adminCode, 
  onGoToDashboard 
}: RegistrationCompleteProps) {
  const downloadCredentials = () => {
    const credentials = `
TapTime Account Credentials
============================

Company Code: ${companyCode}
Admin Name: ${adminName}
Admin Code: ${adminCode}

Keep these credentials secure!
Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([credentials], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taptime-credentials.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-blue-900 mb-2">REGISTRATION COMPLETE!</h2>
          <p className="text-gray-600">
            Your TapTime account has been successfully created. Here are your account details:
          </p>
        </div>

        <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Company Code</p>
              <p className="text-blue-900">{companyCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Admin Name</p>
              <p className="text-blue-900">{adminName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Admin Code</p>
              <p className="text-blue-900">{'•'.repeat(adminCode.length)}</p>
            </div>
          </div>
        </Card>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 text-center">
            <span className="text-yellow-700">⚠️ Important:</span> Please save these credentials securely. You will need them to access your account.
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={downloadCredentials}
            variant="outline"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Credentials
          </Button>
          <Button 
            onClick={onGoToDashboard}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Go to Dashboard
          </Button>
        </div>

        <div className="mt-8 text-center">
          <img src={logoImage} alt="TapTime Logo" className="w-12 h-12 mx-auto mb-2" />
          <p className="text-sm text-gray-500">@TapTime2027</p>
        </div>
      </div>
    </div>
  );
}
