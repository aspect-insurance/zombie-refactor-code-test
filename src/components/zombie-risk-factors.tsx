'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface ZombieRiskFactorsProps {
  formData: any;
  updateFormData: (data: any) => void;
  setStage: (stage: any) => void;
}

export default function ZombieRiskFactors({
  formData,
  updateFormData,
  setStage,
}: ZombieRiskFactorsProps) {
  const [riskLocations, setRiskLocations] = useState<string[]>(formData.riskLocations || []);

  useEffect(() => {
    if (riskLocations.length !== formData.riskLocations.length) {
      updateFormData({
        riskLocations,
      });
    }
  }, [riskLocations.length]);

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setRiskLocations([...riskLocations, location]);
    } else {
      setRiskLocations(riskLocations.filter((loc: string) => loc !== location));
    }
  };

  const locationIcons: Record<string, string> = {
    Cemetery: '⚰️',
    'Government Lab': '🧪',
    'Abandoned Hospital': '🏥',
    'Mega-mall': '🏬',
    Florida: '🌴',
  };

  const riskLocationsCount = riskLocations.length;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-red-500 mb-2">🔧 Risk Assessment</h2>
        <p className="text-gray-400">Identify potential danger zones in your area</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gray-800/70 border-gray-700 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <MapPin className="w-5 h-5 text-red-400 mr-2" />
              <Label className="text-lg font-semibold text-white">
                Do you live near any high-risk locations?
              </Label>

              {riskLocationsCount > 0 && (
                <span className="ml-auto bg-red-500/20 text-red-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {riskLocationsCount} selected
                </span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {[
                { id: 'cemetery', value: 'Cemetery', label: 'Cemetery or mortuary' },
                {
                  id: 'lab',
                  value: 'Government Lab',
                  label: 'Government lab doing "totally safe" experiments',
                },
                {
                  id: 'hospital',
                  value: 'Abandoned Hospital',
                  label: 'Abandoned hospital or asylum',
                },
                {
                  id: 'mall',
                  value: 'Mega-mall',
                  label: 'Mega-mall with a suspiciously large basement',
                },
                { id: 'florida', value: 'Florida', label: 'Florida' },
              ].map(location => (
                <div
                  key={location.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    riskLocations.includes(location.value)
                      ? 'border-red-500 bg-red-900/20'
                      : 'border-gray-700 hover:bg-gray-700/50'
                  } transition-colors duration-200`}
                >
                  <Checkbox
                    id={location.id}
                    checked={riskLocations.includes(location.value)}
                    onCheckedChange={checked =>
                      handleLocationChange(location.value, checked as boolean)
                    }
                    className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  />
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{locationIcons[location.value]}</span>
                    <Label htmlFor={location.id} className="text-gray-300 cursor-pointer">
                      {location.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            {riskLocationsCount >= 3 && (
              <div className="mt-5 bg-red-900/30 border border-red-500 rounded-lg p-4">
                <p className="text-sm text-red-400 font-semibold">
                  ⚠️ Warning: You've selected {riskLocationsCount} high-risk locations. Your premium
                  will be higher!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStage(2)}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-2 rounded-lg transition-all"
        >
          Previous
        </Button>
        <Button
          onClick={() => setStage(4)}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all"
        >
          See Coverage Options
        </Button>
      </div>
    </div>
  );
}
