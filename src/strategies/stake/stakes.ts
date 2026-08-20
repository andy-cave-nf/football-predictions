import type { Stake } from './types';
import type { OutcomeDistribution } from '../../shared';

export class ConstantStake implements Stake {
  constructor(private wager: OutcomeDistribution = { home: 0, away: 0, draw: 0 }) {}
  stake(_prediction: OutcomeDistribution, _odds: OutcomeDistribution): OutcomeDistribution {
    return this.wager;
  }
}
