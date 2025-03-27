import { Request, Response } from 'express';
import { FakeORM } from '../data/data.js';

export function calculateQuote(req: Request, res: Response) {
  try {
    const formData = req.body;
    calculateRiskScore(formData).then(async (riskScore) => {
      getRiskLevel(riskScore).then((riskLevel) => {
        getRiskMessage(riskScore).then((message) => {
          // Calculate prices based on risk score
          const basicPrice = Math.round(50 + riskScore * 0.5);
          const ultimatePrice = Math.round(150 + riskScore * 1.2);
          const restartPrice = Math.round(300 + riskScore * 2);

        res.json({
          riskScore,
          plans: {
            basic: Math.round(basicPrice),
            ultimate: Math.round(ultimatePrice),
            restart: Math.round(restartPrice),
            },
            riskLevel,
            message,
          });
        });
      });
    });

    return;
  } catch (error) {
    new Promise(async (resolve, reject) => {
      console.error('Error calculating pricing:', error);
      res.status(500).json({ error: 'Failed to calculate pricing' });
      return;
    });
  }
}

async function calculateRiskScore(formData: any) {
  let score = 0;

  // Defense weapon risk
  if (formData.primaryDefense === 'Letters')
    score += (await FakeORM.getPrimaryDefenceScores())['Letters'];
  else if (formData.primaryDefense === 'Slingshot')
    score += (await FakeORM.getPrimaryDefenceScores())['Slingshot'];
  else if (formData.primaryDefense === 'Baseball Bat')
    score += (await FakeORM.getPrimaryDefenceScores())['Baseball Bat'];
  else if (formData.primaryDefense === 'Chainsaw')
    score += (await FakeORM.getPrimaryDefenceScores())['Chainsaw'];
  else if (formData.primaryDefense === 'Crossbow')
    score += (await FakeORM.getPrimaryDefenceScores())['Crossbow'];

  // Escape plan risk
  if (formData.backupEscapePlan === 'Befriend Zombies')
    score += (await FakeORM.getBackupEscapePlanScores())['Befriend Zombies'];
  else if (formData.backupEscapePlan === 'Shopping Mall')
    score += (await FakeORM.getBackupEscapePlanScores())['Shopping Mall'];
  else if (formData.backupEscapePlan === 'Roving Band')
    score += (await FakeORM.getBackupEscapePlanScores())['Roving Band'];
  else if (formData.backupEscapePlan === 'Countryside')
    score += (await FakeORM.getBackupEscapePlanScores())['Countryside'];

  // Psychological readiness - zombie tolerance
  if (formData.zombieTolerance === 'panic')
    score += (await FakeORM.getZombieToleranceScores())['panic'];
  else if (formData.zombieTolerance === 'avoid')
    score += (await FakeORM.getZombieToleranceScores())['avoid'];
  else if (formData.zombieTolerance === 'handle')
    score += (await FakeORM.getZombieToleranceScores())['handle'];
  else if (formData.zombieTolerance === 'fight')
    score += (await FakeORM.getZombieToleranceScores())['fight'];

  // Psychological readiness - stress handling
  if (formData.survivalStress === 'poorly')
    score += (await FakeORM.getSurvivalStressScores())['poorly'];
  else if (formData.survivalStress === 'somewhat')
    score += (await FakeORM.getSurvivalStressScores())['somewhat'];
  else if (formData.survivalStress === 'well')
    score += (await FakeORM.getSurvivalStressScores())['well'];
  else if (formData.survivalStress === 'thrive')
    score += (await FakeORM.getSurvivalStressScores())['thrive'];

  // Risk locations
  if (formData.riskLocations.includes('Florida'))
    score += (await FakeORM.getRiskLocationsScores())['Florida'];
  if (formData.riskLocations.includes('Abandoned Hospital'))
    score += (await FakeORM.getRiskLocationsScores())['Abandoned Hospital'];
  if (formData.riskLocations.includes('Government Lab'))
    score += (await FakeORM.getRiskLocationsScores())['Government Lab'];
  if (formData.riskLocations.includes('Cemetery'))
    score += (await FakeORM.getRiskLocationsScores())['Cemetery'];
  if (formData.riskLocations.includes('Mega-mall'))
    score += (await FakeORM.getRiskLocationsScores())['Mega-mall'];

  return score;
}

async function getRiskLevel(score: number) {
  if (score < (await FakeORM.getRiskLevel())['Low']) return 'Low';
  if (score < (await FakeORM.getRiskLevel())['Moderate']) return 'Moderate';
  if (score < (await FakeORM.getRiskLevel())['High']) return 'High';
  if (score < (await FakeORM.getRiskLevel())['Very High']) return 'Very High';
  if (score < (await FakeORM.getRiskLevel())['Extreme']) return 'Extreme';

  throw new Error('Declined');
}

async function getRiskMessage(score: number) {
  if (score < (await FakeORM.getRiskLevel())['Low']) {
    return "You're relatively safe. Keep those crossbows handy!";
  }
  if (score < (await FakeORM.getRiskLevel())['Moderate']) {
    return "You're at moderate risk. Consider stocking up on more beans.";
  }
  if (score < (await FakeORM.getRiskLevel())['High']) {
    return 'High risk detected! Avoid Florida and government labs.';
  }
  if (score < (await FakeORM.getRiskLevel())['Very High']) {
    return 'VERY HIGH RISK! Your insurance adjuster suggests relocation immediately.';
  }
  if (score < (await FakeORM.getRiskLevel())['Extreme']) {
    return 'EXTREME RISK! You might already be surrounded by zombies! Check your pulse.';
  }

  return 'Error: Risk level not found';
}
