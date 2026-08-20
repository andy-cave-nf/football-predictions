import type { Stake } from '../../../../src/strategies/stakes/types';
import type { OutcomeDistribution } from '../../../../src/shared';
import { HARDCODED_ODDS, HARDCODED_PREDICTION, StubStake } from '../../utils';
import { MaxStakeOnly } from '../../../../src/strategies/stakes/shared';

describe('MaxStakeOnly', () => {
  let stake: Stake;
  describe('Given a wager with the largest stake on the home win', () => {
    beforeEach(() => {
      const origin = new StubStake({ home: 0.1, draw: 0.05, away: 0.05 });
      stake = new MaxStakeOnly(origin);
    });
    describe('when the bet is created', () => {
      let wager: OutcomeDistribution;
      beforeEach(() => {
        wager = stake.stake(HARDCODED_PREDICTION, HARDCODED_ODDS);
      });
      it('stakes the home win only', () => {
        expect(wager).toStrictEqual({ home: 0.1, draw: 0, away: 0 });
      });
    });
  });
  describe('Given a wager with two equal stakes on home and away wins, greater than the stake on draw', () => {
    beforeEach(() => {
      const origin = new StubStake({ home: 0.1, draw: 0.05, away: 0.1 });
      stake = new MaxStakeOnly(origin);
    });
    describe('when the bet is created', () => {
      let wager: OutcomeDistribution;
      beforeEach(() => {
        wager = stake.stake(HARDCODED_PREDICTION, HARDCODED_ODDS);
      });
      it('stakes nothing', () => {
        expect(wager).toStrictEqual({ home: 0, away: 0, draw: 0 });
      });
    });
  });
  describe('Given a match with three equal stakes', () => {
    beforeEach(() => {
      const origin = new StubStake({ home: 0.1, draw: 0.1, away: 0.1 });
      stake = new MaxStakeOnly(origin);
    });
    describe('when the bet is created', () => {
      let wager: OutcomeDistribution;
      beforeEach(() => {
        wager = stake.stake(HARDCODED_PREDICTION, HARDCODED_ODDS);
      });
      it('stakes nothing', () => {
        expect(wager).toStrictEqual({ home: 0, draw: 0, away: 0 });
      });
    });
  });
});
