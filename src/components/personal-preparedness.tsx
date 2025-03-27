import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Sword, MapPin } from 'lucide-react';

interface PersonalPreparednessProps {
  formData: any;
  updateFormData: (data: any) => void;
  setStage: (stage: number) => void;
}

export default function PersonalPreparedness({
  formData,
  updateFormData,
  setStage,
}: PersonalPreparednessProps) {
  const [primaryDefense, setPrimaryDefense] = useState(formData.primaryDefense || '');
  const [backupEscapePlan, setBackupEscapePlan] = useState(formData.backupEscapePlan || '');

  const isFormValid = primaryDefense && backupEscapePlan;

  useEffect(() => {
    if (
      primaryDefense !== formData.primaryDefense ||
      backupEscapePlan !== formData.backupEscapePlan
    ) {
      updateFormData({
        primaryDefense,
        backupEscapePlan,
      });
    }
  }, [primaryDefense, backupEscapePlan]);

  const getDefenseIcon = (value: string) => {
    switch (value) {
      case 'Baseball Bat':
        return '🏏';
      case 'Crossbow':
        return '🏹';
      case 'Chainsaw':
        return '⚙️';
      case 'Slingshot':
        return '🪀';
      case 'Letters':
        return '✉️';
      default:
        return '⚔️';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-red-500 mb-2">
          🔥 Personal Preparedness Assessment
        </h2>
        <p className="text-gray-400">
          Answer these simple questions to start your survival evaluation
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gray-800/70 border-gray-700 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Sword className="w-5 h-5 text-red-400 mr-2" />
              <Label className="text-lg font-semibold text-white">Primary Defense Weapon</Label>
            </div>

            <RadioGroup
              value={primaryDefense}
              onValueChange={setPrimaryDefense}
              className="mt-3 space-y-3"
            >
              {[
                {
                  value: 'Baseball Bat',
                  label: 'Baseball Bat',
                  description: 'Classic and reliable',
                },
                { value: 'Crossbow', label: 'Crossbow', description: 'Silent but deadly' },
                { value: 'Chainsaw', label: 'Chainsaw', description: 'Effective but noisy' },
                {
                  value: 'Slingshot',
                  label: 'Slingshot with questionable ammo',
                  description: 'Creative but risky',
                },
                {
                  value: 'Letters',
                  label: '"Strongly worded letters"',
                  description: 'A bold strategy',
                },
              ].map(option => (
                <div key={option.value} className="relative">
                  <RadioGroupItem
                    value={option.value}
                    id={`defense-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`defense-${option.value}`}
                    className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer transition-all peer-checked:bg-red-900/20 peer-checked:border-red-500 hover:bg-gray-700/50"
                  >
                    <span className="text-xl mr-3">{getDefenseIcon(option.value)}</span>
                    <div>
                      <p className="font-medium text-gray-200">{option.label}</p>
                      <p className="text-sm text-gray-400">{option.description}</p>
                    </div>
                    <div className="ml-auto w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center peer-checked:bg-red-500 peer-checked:border-red-500">
                      {primaryDefense === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/70 border-gray-700 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-red-400 mr-2" />
              <Label className="text-lg font-semibold text-white">Backup Escape Plan</Label>
            </div>

            <RadioGroup
              value={backupEscapePlan}
              onValueChange={setBackupEscapePlan}
              className="mt-3 space-y-3"
            >
              {[
                {
                  value: 'Shopping Mall',
                  icon: '🏬',
                  label: 'Hide in a shopping mall',
                  description: 'Classic horror movie strategy',
                },
                {
                  value: 'Countryside',
                  icon: '🏕️',
                  label: 'Flee to the countryside',
                  description: 'Away from urban chaos',
                },
                {
                  value: 'Roving Band',
                  icon: '👥',
                  label: 'Join a roving band of survivors',
                  description: 'Strength in numbers',
                },
                {
                  value: 'Befriend Zombies',
                  icon: '🧟',
                  label: 'Befriend the zombies and hope for the best',
                  description: 'Unconventional approach',
                },
              ].map(option => (
                <div key={option.value} className="relative">
                  <RadioGroupItem
                    value={option.value}
                    id={`escape-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`escape-${option.value}`}
                    className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer transition-all peer-checked:bg-red-900/20 peer-checked:border-red-500 hover:bg-gray-700/50"
                  >
                    <span className="text-xl mr-3">{option.icon}</span>
                    <div>
                      <p className="font-medium text-gray-200">{option.label}</p>
                      <p className="text-sm text-gray-400">{option.description}</p>
                    </div>
                    <div className="ml-auto w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center">
                      {backupEscapePlan === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-6">
        <Button
          onClick={() => setStage(2)}
          disabled={!isFormValid}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
