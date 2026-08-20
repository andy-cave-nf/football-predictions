import type { OutcomeDistribution } from '../../../../src/shared';
import type { Stake } from '../../../../src/strategies/stakes/types';
import { KellyStake } from '../../../../src/strategies/stakes/stakes';

describe('Kelly Stake', () => {
  let stake: Stake;
  let kellyCoefficient: number;
  let prediction: OutcomeDistribution;
  let odds: OutcomeDistribution;
  let actual: OutcomeDistribution;
  beforeEach(() => {
    kellyCoefficient = 0.5;
    stake = new KellyStake(kellyCoefficient);
  });
  describe('Given a match where only the home win has an edge', () => {
    beforeEach(() => {
      prediction = { home: 0.5, away: 0.23, draw: 0.27 };
      odds = { home: 2.1, away: 4.2, draw: 3.6 };
    });
    describe('when the stake is calculated', () => {
      beforeEach(() => {
        actual = stake.stake(prediction, odds);
      });
      it('stakes only the kelly fraction on home', () => {
        expect(actual.home).toBeCloseTo(0.02272, 4);
        expect(actual.away).toEqual(0);
        expect(actual.draw).toEqual(0);
      });
    });
  });
  describe('Given a match where the away win has an edge', () => {
    beforeEach(() => {
      prediction = { home: 0.23, away: 0.5, draw: 0.27 };
      odds = { home: 4.2, away: 2.1, draw: 3.6 };
    });
    describe('when the stake is calculated', () => {
      beforeEach(() => {
        actual = stake.stake(prediction, odds);
      });
      it('stakes only the kelly fraction on away', () => {
        expect(actual.away).toBeCloseTo(0.02272, 4);
        expect(actual.home).toEqual(0);
        expect(actual.draw).toEqual(0);
      });
    });
  });
  describe('Given a match where the draw has an edge', () => {
    beforeEach(() => {
      prediction = { home: 0.23, away: 0.27, draw: 0.5 };
      odds = { home: 4.2, away: 3.6, draw: 2.1 };
    });
    describe('when the stake is calculated', () => {
      beforeEach(() => {
        actual = stake.stake(prediction, odds);
      });
      it('stakes only the kelly fraction on draw', () => {
        expect(actual.draw).toBeCloseTo(0.02272, 4);
        expect(actual.home).toEqual(0);
        expect(actual.away).toEqual(0);
      });
    });
  });
  describe('Given a match where the away edge is larger than the draw', () => {
    beforeEach(() => {
      prediction = { home: 0.4, away: 0.3, draw: 0.3 };
      odds = { home: 2.3, away: 3.6, draw: 3.7 };
    });
    describe('when the stake is calculated', () => {
      beforeEach(() => {
        actual = stake.stake(prediction, odds);
      });
      it('stakes the kelly fraction on away and draw', () => {
        expect(actual.away).toBeCloseTo(0.0154, 4);
        expect(actual.draw).toBeCloseTo(0.0204, 4);
        expect(actual.home).toEqual(0);
      });
    });
  });
  describe('Given a match where all results have an edge', () => {
    beforeEach(() => {
      prediction = { home: 0.45, away: 0.27, draw: 0.28 };
      odds = { home: 2.4, away: 3.9, draw: 4.0 };
    });
    describe('when the stake is calculated', () => {
      beforeEach(() => {
        actual = stake.stake(prediction, odds);
      });
      it('stakes the kelly fraction on home, away and draw', () => {
        expect(actual.home).toBeCloseTo(0.02857, 4);
        expect(actual.away).toBeCloseTo(0.00914, 4);
        expect(actual.draw).toBeCloseTo(0.02, 4);
      });
    });
  });
});
