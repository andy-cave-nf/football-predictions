import {
  notNegative,
  PredictionRuleError,
} from '../../../../../src/strategies/probabilities/rules';
import type { OutcomeDistribution } from '../../../../../src/shared';

describe('Given the not negative test', () => {
  let prediction: OutcomeDistribution;
  describe('when a match prediction have positive only values', () => {
    beforeEach(() => {
      prediction = { home: 0.1, away: 0.1, draw: 0.1 };
    });
    it('does not raise a PredictionRuleError', () => {
      expect(() => notNegative(prediction)).not.toThrow(PredictionRuleError);
    });
  });
  describe('when a match prediction has a zero value', () => {
    beforeEach(() => {
      prediction = { home: 0.1, away: 0.1, draw: 0 };
    });
    it('does not raise a PredictionRuleError', () => {
      expect(() => notNegative(prediction)).not.toThrow(PredictionRuleError);
    });
  });
  describe('when a match prediction has negative values', () => {
    beforeEach(() => {
      prediction = { home: 0.1, away: 0.1, draw: -0.1 };
    });
    it('raises a PredictionRuleError', () => {
      expect(() => notNegative(prediction)).toThrow(PredictionRuleError);
    });
  });
});
