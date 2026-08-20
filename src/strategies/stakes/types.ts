import type { OutcomeDistribution } from '../../shared';

export interface Stake {
  stake(prediction: OutcomeDistribution, odds: OutcomeDistribution): OutcomeDistribution;
}
