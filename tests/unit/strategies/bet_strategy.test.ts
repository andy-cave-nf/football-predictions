import type { Strategy } from '../../../src/strategies/types';
import type { SourceMatch } from '../../../src/sources/types';
import { StubProbability, StubStake } from '../utils';
import type { Probability } from '../../../src/strategies/probabilities/types';
import { BetStrategy } from '../../../src/strategies/strategies';
import type { MatchBetType } from '../../../src/bets/types';
import type { Stake } from '../../../src/strategies/stake/types';
import type { OutcomeDistribution } from '../../../src/shared';

describe('Given a strategy with a probability calculation', () => {
  let strategy: Strategy;
  let probability: Probability;
  let match: SourceMatch;
  let prediction: OutcomeDistribution;
  let wager: OutcomeDistribution;
  let stake: Stake;
  beforeEach(() => {
    wager = { home: 0.01, away: 0, draw: 0 };
    prediction = { home: 0.1, away: 0.2, draw: 0.7 };
    stake = new StubStake(wager);
    probability = new StubProbability(prediction);
    strategy = new BetStrategy(probability, stake);
    match = { home: 'Arsenal', away: 'Chelsea', odds: { home: 1.2, away: 1.2, draw: 1.3 } };
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
      expect(bet.teams).toStrictEqual({ home: match.home, away: match.away });
    });
    it('returns the calculated stake in the bet', () => {
      expect(bet.stake).toStrictEqual(wager);
    });
  });
});
