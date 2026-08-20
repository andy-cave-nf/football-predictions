import type { OutcomeDistribution } from '../../shared';

export class StakeRuleError extends Error {
  constructor(
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'StakeRuleError';
  }
}

export type StakeRule = (wager: OutcomeDistribution) => void;

export const sumLessThanOne: StakeRule = (wager: OutcomeDistribution) => {
  const values = Object.values(wager);
  const total = values.reduce((acc, currentValue) => acc + currentValue, 0);
  if (total > 1) {
    throw new StakeRuleError('Wager adds to more than 1');
  }
};

export const oneWagerOnly: StakeRule = (wager: OutcomeDistribution) => {
  const values = Object.values(wager);
  const nonZeros = values.filter((value) => value !== 0).length;
  if (nonZeros > 1) {
    throw new StakeRuleError('More than one wager is forbidden');
  }
};

export const notNegative: StakeRule = (wager: OutcomeDistribution) => {
  const values = Object.values(wager);
  values.forEach((value) => {
    if (value < 0) {
      throw new StakeRuleError('Wagers must be greater than 0');
    }
  });
};

export const DEFAULT_STAKE_RULES = [sumLessThanOne, oneWagerOnly, notNegative];
