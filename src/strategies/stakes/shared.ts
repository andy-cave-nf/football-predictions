import type { Stake } from './types';
import type { StakeRule } from './rules';
import type { OutcomeDistribution } from '../../shared';

export class RuleValidatedStake implements Stake {
  constructor(
    private origin: Stake,
    private rules: StakeRule[]
  ) {}
  stake(prediction: OutcomeDistribution, odds: OutcomeDistribution): OutcomeDistribution {
    const wager = this.origin.stake(prediction, odds);
    try {
      this.rules.forEach((rule) => {
        rule(wager);
      });
      return wager;
    } catch (error) {
      throw new StakeError('Stake calculation failed', { cause: error });
    }
  }
}

export class MaxStakeOnly implements Stake {
  constructor(private origin: Stake) {}
  stake(prediction: OutcomeDistribution, odds: OutcomeDistribution): OutcomeDistribution {
    const wager = this.origin.stake(prediction, odds);
    const values = Object.values(wager);
    const max = Math.max(...values);
    const maxCount = values.filter((value) => {
      return Math.abs(value - max) <= 0.0005;
    }).length;
    if (maxCount > 1) {
      return { home: 0, draw: 0, away: 0 };
    }
    return {
      home: wager.home === max ? wager.home : 0,
      away: wager.away === max ? wager.away : 0,
      draw: wager.draw === max ? wager.draw : 0,
    };
  }
}

export class StakeError extends Error {
  constructor(
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'StakeError';
  }
}
