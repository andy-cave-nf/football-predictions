import type { Stake } from '../../../../src/strategies/stakes/types';
import { type StakeRule, StakeRuleError } from '../../../../src/strategies/stakes/rules';
import { StubStake } from '../../utils';
import type { OutcomeDistribution } from '../../../../src/shared';
import { RuleValidatedStake, StakeError } from '../../../../src/strategies/stakes/shared';

describe('Given a stake', () => {
  let stake: Stake;
  describe('when a wager is processed with a stake rule error', () => {
    beforeEach(() => {
      const rule: StakeRule = (_wager) => {
        throw new StakeRuleError('Boom');
      };
      stake = new RuleValidatedStake(new StubStake(), [rule]);
    });
    it('raises a StakeError', () => {
      expect(() =>
        stake.stake({ home: 0, away: 0, draw: 0 }, { home: 0, away: 0, draw: 0 })
      ).toThrow(StakeError);
    });
  });
  describe('when a wager is processed without an error', () => {
    let wager: OutcomeDistribution;
    beforeEach(() => {
      wager = { home: 0.4, away: 0, draw: 0.01 };
      const rule: StakeRule = (_wager) => {};
      stake = new RuleValidatedStake(new StubStake(wager), [rule]);
    });
    it('returns the wager unchanged', () => {
      expect(
        stake.stake({ home: 0, away: 0, draw: 0 }, { home: 0, away: 0, draw: 0 })
      ).toStrictEqual(wager);
    });
  });
});
