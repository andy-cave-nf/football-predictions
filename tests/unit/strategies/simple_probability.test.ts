import type { Strategy } from '../../../src/strategies/types';
import type { SourceMatch } from '../../../src/sources/types';
import { StubProbability } from '../utils';
import type { Prediction, Probability } from '../../../src/strategies/probabilities/types';
import { BetStrategy } from '../../../src/strategies/strategies';

describe('Given a strategy with a probability calculation', () => {
  let strategy: Strategy;
  let probability: Probability;
  let match: SourceMatch;
  beforeEach(() => {
    probability = new StubProbability();
    strategy = new BetStrategy(probability);
    match = { home: 'Arsenal', away: 'Chelsea' };
  });
  describe('when a bet is created for a match', () => {
    let prediction: Prediction;
    beforeEach(() => {
      prediction = strategy.bet(match).probability;
    });
    it('returns the calculated probability in the bet', () => {
      expect(prediction).toStrictEqual({ home: 0.3, away: 0.3, draw: 0.4 });
    });
  });
});
