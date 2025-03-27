// Don't change this file, it's not part of the test

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const FakeORM = {
  getPrimaryDefenceScores: async () => {
    await sleep(50);

    return {
      Letters: 50,
      Slingshot: 35,
      'Baseball Bat': 25,
      Chainsaw: 15,
      Crossbow: 10,
    };
  },
  getBackupEscapePlanScores: async () => {
    await sleep(50);

    return {
      'Befriend Zombies': 50,
      'Shopping Mall': 35,
      'Roving Band': 25,
      Countryside: 15,
    };
  },
  getZombieToleranceScores: async () => {
    await sleep(50);

    return {
      panic: 40,
      avoid: 30,
      handle: 15,
      fight: 5,
    };
  },
  getSurvivalStressScores: async () => {
    await sleep(50);

    return {
      poorly: 40,
      somewhat: 25,
      well: 10,
      thrive: 0,
    };
  },
  getRiskLocationsScores: async () => {
    await sleep(50);

    return {
      Florida: 20,
      'Abandoned Hospital': 15,
      'Government Lab': 25,
      Cemetery: 15,
      'Mega-mall': 10,
      'Zombie Apocalypse': 0,
    };
  },
  getRiskLevel: async () => {
    await sleep(50);

    return {
      Low: 80,
      Moderate: 120,
      High: 160,
      'Very High': 200,
      Extreme: 240,
    };
  },
};
