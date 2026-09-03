import type { Probability } from './types';
import type { SourceMatch } from '../../sources/types';
import type { OutcomeDistribution } from '../../shared';
import type { Ratings } from './ratings';
import type { ProbabilityCalculation } from './calculations';

export class ConstantProbability implements Probability {
  forMatch(_match: SourceMatch): OutcomeDistribution {
    return {
      home: 0.2,
      away: 0.2,
      draw: 0.6,
    };
  }
}

export class RatedProbability<T> implements Probability {
  constructor(
    private ratings: Ratings<T>,
    private calculation: ProbabilityCalculation<T>
  ) {}
  forMatch(match: SourceMatch): OutcomeDistribution {
    return this.calculation(this.ratings.ratingFor(match.home), this.ratings.ratingFor(match.away));
  }
}
