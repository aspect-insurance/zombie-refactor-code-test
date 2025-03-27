'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Footprints } from 'lucide-react';

interface PsychologicalReadinessProps {
  formData: any;
  updateFormData: (data: any) => void;
  setStage: (stage: number) => void;
}

export default function PsychologicalReadiness({
  formData,
  updateFormData,
  setStage,
}: PsychologicalReadinessProps) {
  const [zombieTolerance, setZombieTolerance] = useState(formData.zombieTolerance || '');
  const [survivalStress, setSurvivalStress] = useState(formData.survivalStress || '');

  const isFormValid = zombieTolerance && survivalStress;

  useEffect(() => {
    if (
      zombieTolerance !== formData.zombieTolerance ||
      survivalStress !== formData.survivalStress
    ) {
      updateFormData({
        zombieTolerance,
        survivalStress,
      });
    }
  }, [zombieTolerance, survivalStress]);

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-500 mb-2">🧠 Psychological Readiness</h2>
        <p className="text-gray-400">Assess your mental preparedness for the apocalypse</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gray-800/70 border-gray-700 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-5 h-5 text-red-400 mr-2" />
              <Label className="text-lg font-semibold text-white">
                How well can you handle seeing zombies?
              </Label>
            </div>

            <RadioGroup
              value={zombieTolerance}
              onValueChange={setZombieTolerance}
              className="mt-3 space-y-3"
            >
              {[
                {
                  value: 'panic',
                  icon: '😱',
                  label: "I'll panic and freeze",
                  description: 'Not great in a crisis',
                },
                {
                  value: 'avoid',
                  icon: '😨',
                  label: "I'll avoid them at all costs",
                  description: 'Flight response',
                },
                {
                  value: 'handle',
                  icon: '😐',
                  label: 'I can handle it',
                  description: 'Reasonable response',
                },
                {
                  value: 'fight',
                  icon: '🔪',
                  label: "I'm ready to fight",
                  description: 'Combat ready',
                },
              ].map(option => (
                <div key={option.value} className="relative">
                  <RadioGroupItem
                    value={option.value}
                    id={`tolerance-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`tolerance-${option.value}`}
                    className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer transition-all peer-checked:bg-red-900/20 peer-checked:border-red-500 hover:bg-gray-700/50"
                  >
                    <span className="text-xl mr-3">{option.icon}</span>
                    <div>
                      <p className="font-medium text-gray-200">{option.label}</p>
                      <p className="text-sm text-gray-400">{option.description}</p>
                    </div>
                    <div className="ml-auto w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center peer-checked:bg-red-500 peer-checked:border-red-500">
                      {zombieTolerance === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/70 border-gray-700 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Footprints className="w-5 h-5 text-red-400 mr-2" />
              <Label className="text-lg font-semibold text-white">
                How do you handle long-term stress?
              </Label>
            </div>

            <RadioGroup
              value={survivalStress}
              onValueChange={setSurvivalStress}
              className="mt-3 space-y-3"
            >
              {[
                {
                  value: 'poorly',
                  icon: '😫',
                  label: 'I crack under pressure',
                  description: 'Not apocalypse-friendly',
                },
                {
                  value: 'somewhat',
                  icon: '😕',
                  label: 'I manage for a while',
                  description: 'Limited endurance',
                },
                {
                  value: 'well',
                  icon: '😌',
                  label: 'I adapt to challenges',
                  description: 'Good stress management',
                },
                {
                  value: 'thrive',
                  icon: '💪',
                  label: 'I thrive in chaos',
                  description: 'Born for the apocalypse',
                },
              ].map(option => (
                <div key={option.value} className="relative">
                  <RadioGroupItem
                    value={option.value}
                    id={`stress-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`stress-${option.value}`}
                    className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer transition-all peer-checked:bg-red-900/20 peer-checked:border-red-500 hover:bg-gray-700/50"
                  >
                    <span className="text-xl mr-3">{option.icon}</span>
                    <div>
                      <p className="font-medium text-gray-200">{option.label}</p>
                      <p className="text-sm text-gray-400">{option.description}</p>
                    </div>
                    <div className="ml-auto w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center peer-checked:bg-red-500 peer-checked:border-red-500">
                      {survivalStress === option.value && (
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

      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStage(1)}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-2 rounded-lg transition-all"
        >
          Previous
        </Button>
        <Button
          onClick={() => setStage(3)}
          disabled={!isFormValid}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
