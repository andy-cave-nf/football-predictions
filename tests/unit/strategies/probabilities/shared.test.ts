import type { Probability } from '../../../../src/strategies/probabilities/types';
import {
  type PredictionRule,
  PredictionRuleError,
} from '../../../../src/strategies/probabilities/rules/rules';
import { HARDCODED_MATCH, StubProbability } from '../../utils';
import {
  ProbabilityError,
  RuleValidatedProbability,
} from '../../../../src/strategies/probabilities/shared';
import type { OutcomeDistribution } from '../../../../src/shared';

describe('Given a probability', () => {
  let probability: Probability;
  describe('when a prediction is processed with a PredictionRuleError', () => {
    beforeEach(() => {
      const rule: PredictionRule = (_prediction: OutcomeDistribution) => {
        throw new PredictionRuleError('Boom!');
      };
      probability = new RuleValidatedProbability(new StubProbability(), [rule]);
    });
    it('raises a ProbabilityError', () => {
      expect(() => probability.forMatch(HARDCODED_MATCH)).toThrow(ProbabilityError);
    });
  });
  describe('when a prediction is processed without an error', () => {
    let origin: Probability;
    let prediction: OutcomeDistribution;
    beforeEach(() => {
      prediction = { home: 0.7, away: 0.1, draw: 0.2 };
      origin = new StubProbability(prediction);
      const rule: PredictionRule = (_prediction: OutcomeDistribution) => {};
      probability = new RuleValidatedProbability(origin, [rule]);
    });
    it('returns the prediction unchanged', () => {
      expect(probability.forMatch(HARDCODED_MATCH)).toStrictEqual(prediction);
    });
  });
});
