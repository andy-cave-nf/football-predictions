import type { Stake } from './types';
import type { OutcomeDistribution } from '../../shared';

export class ConstantStake implements Stake {
  constructor(private wager: OutcomeDistribution = { home: 0, away: 0, draw: 0 }) {}
  stake(_prediction: OutcomeDistribution, _odds: OutcomeDistribution): OutcomeDistribution {
    return this.wager;
  }
}

export class KellyStake implements Stake {
  constructor(private kellyFraction: number = 0.5) {}
  stake(prediction: OutcomeDistribution, odds: OutcomeDistribution): OutcomeDistribution {
    return {
      home: this.kellyBet(prediction.home, odds.home),
      away: this.kellyBet(prediction.away, odds.away),
      draw: this.kellyBet(prediction.draw, odds.draw),
    };
  }
  private kellyBet(prediction: number, odd: number): number {
    const kellyBet = (this.kellyFraction * (prediction * odd - 1)) / (odd - 1);
    return kellyBet > 0 ? kellyBet : 0;
  }
}
