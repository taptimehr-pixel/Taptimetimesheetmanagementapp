import { Card } from './ui/card';
import { Button } from './ui/button';
import { Users, FileText, UserPlus, GraduationCap } from 'lucide-react';
import logoImage from 'figma:asset/d27e01e6b2b699725fe7627b282eb36f1bf01fb1.png';

interface DivisionSelectorProps {
  name: string;
  onSelectDivision: (division: 'Administrative' | 'Records' | 'Training & Management' | 'Recruitment & Placement') => void;
  onBack: () => void;
}

export function DivisionSelector({ name, onSelectDivision, onBack }: DivisionSelectorProps) {
  const divisions = [
    {
      id: 'Administrative',
      name: 'Administrative',
      icon: Users,
      description: 'Leave management, benefits, and compliance',
      color: 'blue',
    },
    {
      id: 'Records',
      name: 'Records',
      icon: FileText,
      description: 'DTR management, payroll, and reports',
      color: 'purple',
    },
    {
      id: 'Training & Management',
      name: 'Training & Management',
      icon: GraduationCap,
      description: 'Training schedules, tasks, and documentation',
      color: 'green',
    },
    {
      id: 'Recruitment & Placement',
      name: 'Recruitment & Placement',
      icon: UserPlus,
      description: 'Employee onboarding and recruitment',
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-8">
        <div className="text-center mb-8">
          <img src={logoImage} alt="TapTime Logo" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-blue-900 mb-2">Welcome, {name}!</h2>
          <p className="text-gray-600">Select your HR division to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {divisions.map((division) => {
            const Icon = division.icon;
            const colorClasses = {
              blue: 'border-blue-500 hover:bg-blue-50',
              purple: 'border-purple-500 hover:bg-purple-50',
              green: 'border-green-500 hover:bg-green-50',
              orange: 'border-orange-500 hover:bg-orange-50',
            };

            const iconColors = {
              blue: 'text-blue-600 bg-blue-100',
              purple: 'text-purple-600 bg-purple-100',
              green: 'text-green-600 bg-green-100',
              orange: 'text-orange-600 bg-orange-100',
            };

            return (
              <button
                key={division.id}
                onClick={() => onSelectDivision(division.id as any)}
                className={`p-6 border-2 rounded-xl transition-all text-left ${
                  colorClasses[division.color as keyof typeof colorClasses]
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-full ${iconColors[division.color as keyof typeof iconColors]}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">{division.name}</h3>
                    <p className="text-sm text-gray-600">{division.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Button 
          onClick={onBack}
          variant="outline"
          className="w-full border-gray-300"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
}
