import type { Strategy } from '../../../src/strategies/types';
import type { SourceMatch } from '../../../src/sources/types';
import { StubProbability } from '../utils';
import type { Prediction, Probability } from '../../../src/strategies/probabilities/types';
import { BetStrategy } from '../../../src/strategies/strategies';
import type { MatchBetType } from '../../../src/bets/types';

describe('Given a strategy with a probability calculation', () => {
  let strategy: Strategy;
  let probability: Probability;
  let match: SourceMatch;
  let prediction: Prediction;
  beforeEach(() => {
    prediction = { home: 0.1, away: 0.2, draw: 0.7 };
    probability = new StubProbability(prediction);
    strategy = new BetStrategy(probability);
    match = { home: 'Arsenal', away: 'Chelsea' };
  });
  describe('when a bet is created for a match', () => {
    let bet: MatchBetType;
    beforeEach(() => {
      bet = strategy.bet(match);
    });
    it('returns the calculated probability in the bet', () => {
      expect(bet.probability).toStrictEqual(prediction);
    });
    it('assigns the match teams to the bet', () => {
      expect(bet.teams).toStrictEqual(match);
    });
  });
});
