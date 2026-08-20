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
  constructor(
    private origin: Stake,
    private tolerance: number = 0.0005
  ) {}
  stake(prediction: OutcomeDistribution, odds: OutcomeDistribution): OutcomeDistribution {
    const wager = this.origin.stake(prediction, odds);
    const max = this._maxValue(wager);
    const countAtMax = this._countCloseToValue(wager, max);
    if (countAtMax > 1) {
      return { home: 0, draw: 0, away: 0 };
    }
    return {
      home: this._isClose(wager.home, max) ? wager.home : 0,
      away: this._isClose(wager.away, max) ? wager.away : 0,
      draw: this._isClose(wager.draw, max) ? wager.draw : 0,
    };
  }
  private _isClose(valueA: number, valueB: number): boolean {
    return Math.abs(valueA - valueB) <= this.tolerance;
  }

  private _maxValue(wager: OutcomeDistribution): number {
    return Math.max(...Object.values(wager));
  }
  private _countCloseToValue(wager: OutcomeDistribution, value: number): number {
    const objectValues = Object.values(wager);
    return objectValues.filter((val) => this._isClose(value, val)).length;
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
