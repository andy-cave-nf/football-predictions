import type { OutcomeDistribution } from '../../../../../src/shared';
import { notNegative, StakeRuleError } from '../../../../../src/strategies/stakes/rules';

describe('Given the not negative test', () => {
  let wager: OutcomeDistribution;
  describe('when a wager has positive only values', () => {
    beforeEach(() => {
      wager = { home: 0.1, away: 0.1, draw: 0.1 };
    });
    it('does not raise a StakeRuleError', () => {
      expect(() => notNegative(wager)).not.toThrow(StakeRuleError);
    });
  });
  describe('when a match wager has a zero value', () => {
    beforeEach(() => {
      wager = { home: 0.1, away: 0.1, draw: 0 };
    });
    it('does not raise a StakeRuleError', () => {
      expect(() => notNegative(wager)).not.toThrow(StakeRuleError);
    });
  });
  describe('when a match wager has negative values', () => {
    beforeEach(() => {
      wager = { home: 0.1, away: 0.1, draw: -0.1 };
    });
    it('raises a StakeRuleError', () => {
      expect(() => notNegative(wager)).toThrow(StakeRuleError);
    });
  });
});
