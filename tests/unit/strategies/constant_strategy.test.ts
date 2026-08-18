import type { Strategy } from '../../../src/strategies/types';
import type { SourceMatch } from '../../../src/sources/types';
import { ConstantStrategy } from '../../../src/strategies/constant_strategy';
import type { MatchBetType } from '../../../src/bets/types';

describe('Given a match and the constant betting strategy', () => {
  let strategy: Strategy;
  let match: SourceMatch;
  beforeEach(() => {
    match = { home: 'Mockingham City', away: 'Stubbington Town' };
    strategy = new ConstantStrategy();
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
        home: 0,
        away: 0,
        draw: 0,
      });
    });
  });
});
