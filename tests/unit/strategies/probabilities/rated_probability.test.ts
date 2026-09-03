import type { SourceMatch } from '../../../../src/sources/types';
import type { Probability } from '../../../../src/strategies/probabilities/types';
import type { OutcomeDistribution } from '../../../../src/shared';
import type { Ratings } from '../../../../src/strategies/probabilities/ratings';
import { StubRatings } from '../../utils';
import type { ProbabilityCalculation } from '../../../../src/strategies/probabilities/calculations';
import { RatedProbability } from '../../../../src/strategies/probabilities/probability';

describe('Given a match and a rating based calculation', () => {
  let match: SourceMatch;
  let probability: Probability;
  let rating: Ratings<number>;
  let calculation: ProbabilityCalculation<number>;
  let result: OutcomeDistribution;
  describe('when the probability is calculated', () => {
    beforeEach(() => {
      match = { home: 'Arsenal', away: 'Chelsea', odds: { home: 1.2, away: 1.6, draw: 2.0 } };
      rating = new StubRatings<number>({ Arsenal: 10, Chelsea: 12 });
      calculation = (home: number, away: number) => {
        return {
          home: home > away ? 1 : 0,
          away: away > home ? 1 : 0,
          draw: home === away ? 1 : 0,
        };
      };
      probability = new RatedProbability(rating, calculation);
      result = probability.forMatch(match);
    });
    it('returns a probability derived from the ratings', () => {
      expect(result).toStrictEqual({ home: 0, away: 1, draw: 0 });
    });
  });
});
