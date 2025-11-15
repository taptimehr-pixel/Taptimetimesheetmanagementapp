import { useState } from 'react';
import { SecurityPrivacyConfirmation } from './components/SecurityPrivacyConfirmation';
import { LoginScreen } from './components/LoginScreen';
import { CompanyRegistration } from './components/CompanyRegistration';
import { RegistrationComplete } from './components/RegistrationComplete';
import { PrivacyPolicyScreen } from './components/PrivacyPolicyScreen';
import { Dashboard } from './components/Dashboard';
import { HRAdminDashboard } from './components/HRAdminDashboard';
import { HRDivisionDashboard } from './components/hr-division/HRDivisionDashboard';
import { DivisionSelector } from './components/DivisionSelector';
import { Toaster } from './components/ui/sonner';

type Screen = 
  | 'security-confirmation' 
  | 'login' 
  | 'registration' 
  | 'registration-complete' 
  | 'privacy-policy'
  | 'division-selector'
  | 'dashboard';

interface RegistrationData {
  companyCode: string;
  adminName: string;
  adminCode: string;
}

interface UserData {
  role: string;
  name: string;
  code: string;
  division?: 'Administrative' | 'Records' | 'Training & Management' | 'Recruitment & Placement';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('security-confirmation');
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleAcceptSecurity = () => {
    setCurrentScreen('login');
  };

  const handleRegisterCompany = () => {
    setCurrentScreen('registration');
  };

  const handlePrivacyClick = () => {
    setCurrentScreen('privacy-policy');
  };

  const handleRegistrationComplete = (companyCode: string, adminName: string, adminCode: string) => {
    setRegistrationData({ companyCode, adminName, adminCode });
    setCurrentScreen('registration-complete');
  };

  const handleLogin = (role: string, name: string, code: string) => {
    if (role === 'hr-division') {
      setUserData({ role, name, code });
      setCurrentScreen('division-selector');
    } else {
      setUserData({ role, name, code });
      setCurrentScreen('dashboard');
    }
  };

  const handleSelectDivision = (division: 'Administrative' | 'Records' | 'Training & Management' | 'Recruitment & Placement') => {
    if (userData) {
      setUserData({ ...userData, division });
      setCurrentScreen('dashboard');
    }
  };

  const handleGoToDashboard = () => {
    if (registrationData) {
      setUserData({
        role: 'hr-admin',
        name: registrationData.adminName,
        code: registrationData.adminCode
      });
    }
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentScreen('login');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen">
      <Toaster />
      {currentScreen === 'security-confirmation' && (
        <SecurityPrivacyConfirmation onAccept={handleAcceptSecurity} />
      )}

      {currentScreen === 'login' && (
        <LoginScreen 
          onRegisterCompany={handleRegisterCompany}
          onPrivacyClick={handlePrivacyClick}
          onLogin={handleLogin}
        />
      )}

      {currentScreen === 'registration' && (
        <CompanyRegistration 
          onComplete={handleRegistrationComplete}
          onBack={handleBackToLogin}
        />
      )}

      {currentScreen === 'registration-complete' && registrationData && (
        <RegistrationComplete 
          companyCode={registrationData.companyCode}
          adminName={registrationData.adminName}
          adminCode={registrationData.adminCode}
          onGoToDashboard={handleGoToDashboard}
        />
      )}

      {currentScreen === 'privacy-policy' && (
        <PrivacyPolicyScreen onBack={handleBackToLogin} />
      )}

      {currentScreen === 'division-selector' && userData && (
        <DivisionSelector 
          name={userData.name}
          onSelectDivision={handleSelectDivision}
          onBack={handleBackToLogin}
        />
      )}

      {currentScreen === 'dashboard' && userData && (
        userData.role === 'hr-admin' ? (
          <HRAdminDashboard 
            name={userData.name}
            onLogout={handleLogout}
          />
        ) : userData.role === 'hr-division' && userData.division ? (
          <HRDivisionDashboard 
            name={userData.name}
            division={userData.division}
            onLogout={handleLogout}
          />
        ) : (
          <Dashboard 
            role={userData.role}
            name={userData.name}
            onLogout={handleLogout}
          />
        )
      )}
    </div>
  );
}