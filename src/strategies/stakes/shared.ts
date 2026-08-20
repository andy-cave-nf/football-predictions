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

export class StakeError extends Error {
  constructor(
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'StakeError';
  }
}
