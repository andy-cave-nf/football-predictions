import { PredictionRuleError, sumToOne } from '../../../../../src/strategies/probabilities/rules';
import type { OutcomeDistribution } from '../../../../../src/shared';

describe('Given the sumToOne rule', () => {
  let prediction: OutcomeDistribution;
  describe('when a match prediction sums to one exactly', () => {
    beforeEach(() => {
      prediction = { home: 0.3, away: 0.4, draw: 0.3 };
    });
    it('does not raise a PredictionError', () => {
      expect(() => sumToOne(prediction)).not.toThrow(PredictionRuleError);
    });
  });
  describe('when a match prediction sums to one within tolerance', () => {
    beforeEach(() => {
      prediction = { home: 0.3, away: 0.4, draw: 0.3 - 0.00049 };
    });
    it('does not raise a PredictionError', () => {
      expect(() => sumToOne(prediction)).not.toThrow(PredictionRuleError);
    });
  });
  describe('when a match probability does not sum to one', () => {
    beforeEach(() => {
      prediction = { home: 0.3, away: 0.4, draw: 0.3 + 0.00051 };
    });
    it('raises a ProbabilityError', () => {
      expect(() => sumToOne(prediction)).toThrow(PredictionRuleError);
    });
  });
});
