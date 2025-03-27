import { useEffect, useRef, useState } from 'react';
import PersonalPreparedness from '@/components/personal-preparedness';
import PsychologicalReadiness from '@/components/psychological-readiness';
import ZombieRiskFactors from '@/components/zombie-risk-factors';
import CoverageOptions from '@/components/coverage-options';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ZombieInsuranceForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [requestedStep, setRequestedStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Preparedness
    primaryDefense: '',
    backupEscapePlan: '',

    // Psychological Readiness
    zombieTolerance: '',
    survivalStress: '',

    // Zombie Risk Factors
    riskLocations: [] as string[],
  });

  const updateFormData = (newData: Partial<typeof formData>) => {
      setFormData({ ...formData, ...newData });
  };

  const lastFormData = useRef({ ...formData, requestedStep });

  // Make it so the user can change steps
  useEffect(() => {
    if (!!formData.riskLocations.length && requestedStep === 4) {
      setTimeout(() => {
        setCurrentStep(4);
      }, 10);
    } else if (!!formData.primaryDefense && !!formData.backupEscapePlan && requestedStep >= 3) {
      setTimeout(() => {
        setCurrentStep(3);
      }, 10);
    } else if (!!formData.primaryDefense && !!formData.primaryDefense && requestedStep >= 2) {
      setTimeout(() => {
        setCurrentStep(2);
      }, 10);
    } else {
      setTimeout(() => {
        setCurrentStep(1);
      }, 10);
    }
  }, [formData, requestedStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalPreparedness
            formData={formData}
            updateFormData={updateFormData}
            setStage={setRequestedStep}
          />
        );
      case 2:
        return (
          <PsychologicalReadiness
            formData={formData}
            updateFormData={updateFormData}
            setStage={setRequestedStep}
          />
        );
      case 3:
        return (
          <ZombieRiskFactors
            formData={formData}
            updateFormData={updateFormData}
            setStage={setRequestedStep}
          />
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    'Personal Preparedness',
    'Psychological Readiness',
    'Risk Factors',
    'Coverage Options',
  ];

  const MainCompoinent = function ({ children }: { children: any }) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 bg-[url('/placeholder.svg?height=800&width=1600')] bg-fixed bg-cover bg-center bg-blend-overlay">
        <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-5xl font-extrabold text-red-500 mb-4 drop-shadow-lg">
                <span className="relative inline-block">
                  🧟‍♂️{' '}
                  <span className="animate-pulse absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-400"></span>
                </span>{' '}
                Zombie Apocalypse Insurance
              </h1>
              <p className="text-xl text-gray-300 italic">
                "Because regular insurance won't cover the end of the world!"
              </p>
            </div>

            <Card className="border-2 border-red-600 bg-gray-800/95 backdrop-blur text-gray-100 shadow-[0_0_25px_rgba(220,38,38,0.6)] rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-800 to-red-600 text-white py-6">
                <CardTitle className="text-2xl font-bold text-center">Application Form</CardTitle>
                <CardDescription className="text-white/90 text-center font-medium">
                  Fill out this form to secure your future in the zombie apocalypse
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2 relative">
                    {[1, 2, 3, 4].map(step => (
                      <div key={step} className="flex flex-col items-center z-10">
                        <div
                          className={`flex items-center justify-center rounded-full h-12 w-12 
                          ${
                            currentStep === step
                              ? 'bg-red-600 text-white ring-4 ring-red-600/30'
                              : currentStep > step
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-700 text-gray-400'
                          } transition-all duration-200`}
                        >
                          {currentStep > step ? (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            step
                          )}
                        </div>
                        <span
                          className={`mt-2 text-sm font-medium ${currentStep === step ? 'text-red-400' : 'text-gray-400'}`}
                        >
                          {stepTitles[step - 1]}
                        </span>
                      </div>
                    ))}
                    <div className="absolute top-6 left-0 w-full h-1 bg-gray-700">
                      <div
                        className="absolute h-1 bg-red-600 transition-all duration-500 ease-in-out"
                        style={{ width: `${(currentStep - 1) * 33.33}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/80 rounded-lg p-6 shadow-inner">{children}</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  };

  if (currentStep === 4) {
    return (
      <MainCompoinent>
        <CoverageOptions
          formData={formData}
          updateFormData={updateFormData}
          setStage={stage => setRequestedStep(stage)}
        />
      </MainCompoinent>
    );
  }

  return <MainCompoinent>{renderStep()}</MainCompoinent>;
}
