'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  Skull,
  AlertTriangle,
  ShieldCheck,
  BoltIcon,
  LifeBuoy,
  Package,
} from 'lucide-react';

interface CoverageOptionsProps {
  formData: any;
  updateFormData: (data: any) => void;
  setStage: (stage: number) => void;
}

interface PricingData {
  riskScore: number;
  plans: {
    basic: number;
    ultimate: number;
    restart: number;
  };
  riskLevel: string;
  message: string;
}

export default function CoverageOptions({
  formData,
  updateFormData,
  setStage,
}: CoverageOptionsProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>(formData.selectedPlan || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPlan !== formData.selectedPlan) {
      updateFormData({
        selectedPlan,
      });
    }
  }, [selectedPlan]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/calculate-pricing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pricing data');
        }

        const data = await response.json();
        setPricingData(data);
      } catch (err) {
        console.error('Error fetching pricing:', err);
        setError('Failed to calculate your zombie risk. The servers might already be overrun!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricing();
  }, [formData]);

  const handleSubmit = async () => {
    if (!selectedPlan) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return <ShieldCheck className="h-8 w-8 text-green-500" />;
      case 'Moderate':
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
      case 'High':
      case 'Extreme':
        return <Skull className="h-8 w-8 text-red-500" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'basic':
        return <Package className="h-6 w-6 text-blue-400" />;
      case 'ultimate':
        return <BoltIcon className="h-6 w-6 text-yellow-400" />;
      case 'restart':
        return <LifeBuoy className="h-6 w-6 text-green-400" />;
      default:
        return null;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-500';
      case 'Moderate':
        return 'bg-yellow-500';
      case 'High':
      case 'Extreme':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-900/50 border-2 border-green-500 text-green-400 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-green-400">Application Submitted!</h2>
        <p className="text-gray-300 max-w-md mx-auto text-lg">
          Your zombie apocalypse insurance application has been received. We'll contact you when the
          world ends!
        </p>
        <div className="pt-6">
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all"
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-16 w-16 text-red-500 animate-spin mb-6" />
        <p className="text-gray-300 text-lg">Calculating your zombie risk score...</p>
        <p className="text-gray-400 text-sm mt-2">Our undead actuaries are hard at work.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/50 border-2 border-red-500 text-red-400 mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-red-500">Calculation Error</h2>
        <p className="text-gray-300 max-w-md mx-auto">{error}</p>
        <Button
          onClick={() => setStage(3)}
          variant="outline"
          className="mt-6 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-2 rounded-lg transition-all"
        >
          Go Back
        </Button>
      </div>
    );
  }

  if (!pricingData) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-red-500 mb-2">⚠️ Coverage Options</h2>
        <p className="text-gray-400">Choose your protection plan:</p>
      </div>

      <Card className="bg-gray-800/70 border-gray-700 shadow-md overflow-hidden">
        <CardHeader className={`${getRiskColor(pricingData.riskLevel)}/10 p-6`}>
          <CardTitle className="text-xl text-white flex items-center">
            <div className="bg-gray-800 p-2 rounded-full mr-3">
              {getRiskIcon(pricingData.riskLevel)}
            </div>
            Your Zombie Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Risk Score</span>
                <span className="text-sm font-semibold text-white">
                  {pricingData.riskScore}/200
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    pricingData.riskLevel === 'Low'
                      ? 'bg-green-500'
                      : pricingData.riskLevel === 'Moderate'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  } transition-all duration-500 ease-out`}
                  style={{ width: `${Math.min(100, (pricingData.riskScore / 200) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div
                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  pricingData.riskLevel === 'Low'
                    ? 'bg-green-500/20 text-green-400'
                    : pricingData.riskLevel === 'Moderate'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                }`}
              >
                {pricingData.riskLevel} Risk
              </div>
            </div>

            <p className="text-gray-300 mt-2 border-t border-gray-700 pt-4">
              {pricingData.message}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Available Plans:</h3>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
          {[
            {
              id: 'basic',
              title: 'Basic Survival Plan',
              price: pricingData.plans.basic,
              description: 'Covers minor bites, looting damage, and light PTSD therapy.',
              icon: <Package className="h-6 w-6" />,
            },
            {
              id: 'ultimate',
              title: 'Ultimate Doomsday Package',
              price: pricingData.plans.ultimate,
              description: 'Includes VIP helicopter extraction and premium barricading materials.',
              icon: <BoltIcon className="h-6 w-6" />,
            },
            {
              id: 'restart',
              title: 'Post-Apocalypse Restart Fund',
              price: pricingData.plans.restart,
              description:
                'Provides financial support to rebuild your life after civilization falls.',
              icon: <LifeBuoy className="h-6 w-6" />,
            },
          ].map(plan => (
            <div key={plan.id} className="relative">
              <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} className="peer sr-only" />
              <Label
                htmlFor={`plan-${plan.id}`}
                className="flex p-4 border-2 border-gray-600 rounded-lg cursor-pointer transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-900/20 hover:bg-gray-700/50"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    selectedPlan === plan.id
                      ? 'bg-red-900/40 text-red-400'
                      : 'bg-gray-700 text-gray-400'
                  } mr-4 transition-colors duration-200`}
                >
                  {plan.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">{plan.title}</h4>
                    <div className="ml-auto">
                      <span className="text-xl font-bold text-red-400">${plan.price}</span>
                      <span className="text-sm text-gray-400">/month</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-1">{plan.description}</p>
                </div>

                <div className="ml-4 self-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.id ? 'border-red-500 bg-red-900/30' : 'border-gray-600'
                    }`}
                  >
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </div>
                </div>
              </Label>

              {selectedPlan === plan.id && (
                <div className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  SELECTED
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStage(3)}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-2 rounded-lg transition-all"
        >
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedPlan || isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>
    </div>
  );
}
