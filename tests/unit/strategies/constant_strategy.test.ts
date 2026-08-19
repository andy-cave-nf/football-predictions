import type { Strategy } from '../../../src/strategies/types';
import type { SourceMatch } from '../../../src/sources/types';
import type { MatchBetType } from '../../../src/bets/types';
import { StubStrategy } from '../utils';

describe('Given a match and a stub betting strategy', () => {
  let strategy: Strategy;
  let match: SourceMatch;
  beforeEach(() => {
    match = { home: 'Mockingham City', away: 'Stubbington Town' };
    strategy = new StubStrategy();
  });
  describe('when a bet is created', () => {
    let bet: MatchBetType;
    beforeEach(() => {
      bet = strategy.bet(match);
    });
    it('assigns the match teams to the bet', () => {
      expect(bet.teams).toStrictEqual(match);
    });
    it('returns constant probabilities', () => {
      expect(bet.probability).toStrictEqual({
        home: 0.3,
        away: 0.3,
        draw: 0.4,
      });
    });
    it('returns constant stakes', () => {
      expect(bet.stake).toStrictEqual({
        home: 0.1,
        away: 0.1,
        draw: 0.1,
      });
    });
  });
});
